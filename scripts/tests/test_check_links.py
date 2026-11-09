from contextlib import redirect_stdout
from io import StringIO
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest
from unittest.mock import patch

from scripts import check_links
from scripts.check_links import heading_ids


class HeadingIdsTest(unittest.TestCase):
    def test_only_configured_levels_receive_automatic_ids(self):
        text = '''# Same
## Same
### Same
#### Same
##### Deep
###### Deeper
'''
        self.assertEqual(set(heading_ids(text)), {'same', 'same-1', 'same-2'})

    def test_explicit_ids_work_on_nonautomatic_levels(self):
        text = '''# Top {#top}
## Section {#section}
##### Detail {#detail}
###### More {#more}
'''
        self.assertEqual(set(heading_ids(text)), {'top', 'section', 'detail', 'more'})

    def test_generated_slug_collisions_match_vitepress(self):
        text = '''## A
## A
## A-1
## A
'''
        self.assertEqual(set(heading_ids(text)), {'a', 'a-1', 'a-1-1', 'a-2'})

    def test_explicit_nonautomatic_id_does_not_reserve_a_slug(self):
        text = '''# Top {#section}
## Section
### Section
'''
        self.assertEqual(set(heading_ids(text)), {'section', 'section-1'})

    def test_plain_h1_link_is_rejected_but_explicit_id_is_accepted(self):
        with TemporaryDirectory() as directory:
            page = Path(directory) / 'index.md'
            output = StringIO()
            with patch.object(check_links, 'DOCS', directory), redirect_stdout(output):
                page.write_text('# Top\n\n[Back](#top)\n', encoding='utf-8')
                with self.assertRaises(SystemExit) as error:
                    check_links.main()
                self.assertEqual(error.exception.code, 1)
                self.assertIn('missing local anchor #top', output.getvalue())
                page.write_text('# Top {#top}\n\n[Back](#top)\n', encoding='utf-8')
                check_links.main()


if __name__ == '__main__':
    unittest.main()
