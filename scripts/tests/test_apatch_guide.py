from pathlib import Path
import re
import shlex
import unittest


GUIDE = Path(__file__).resolve().parents[2] / 'docs/rooting-guides/apatch-guide.md'


class APatchGuideSafetyTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.text = GUIDE.read_text(encoding='utf-8')
        cls.shell_blocks = re.findall(
            r'^```(?:bash|sh)\s*\n(.*?)^```\s*$', cls.text, flags=re.M | re.S
        )

    def test_shell_examples_do_not_target_init_boot(self):
        self.assertTrue(self.shell_blocks, 'Expected shell examples in the APatch guide')
        boot_flash_found = False
        for block in self.shell_blocks:
            for line in block.splitlines():
                args = shlex.split(line, comments=True)
                if not args:
                    continue
                with self.subTest(command=line):
                    if args[0] == 'fastboot' and 'flash' in args:
                        targets = args[args.index('flash') + 1:]
                        self.assertFalse(
                            any(re.fullmatch(r'init_boot(?:_[ab])?', arg) for arg in targets),
                            'APatch examples must not flash an init_boot partition',
                        )
                        boot_flash_found |= 'boot' in targets
                    if args[:2] == ['adb', 'push'] and len(args) > 2:
                        self.assertNotEqual(Path(args[2]).name, 'init_boot.img')
        self.assertTrue(boot_flash_found, 'Expected a boot-partition example')

    def test_warns_about_init_boot_and_accidental_misflashes(self):
        self.assertIn('Do not patch or flash `init_boot`', self.text)
        self.assertIn('restoring `boot` alone will not repair that partition', self.text)
        self.assertIn('correct **stock** image to every affected partition and slot', self.text)

    def test_slot_checks_precede_installation_and_stock_restore(self):
        install = self.text.split('## Step 4: Flash Permanently\n', 1)[1].split('## Step 5:', 1)[0]
        before_flash = install.split('\nfastboot flash boot ', 1)[0]
        self.assertIn('\nfastboot getvar current-slot\n', before_flash)
        self.assertRegex(before_flash, r'(?is)current active slot.*only if.*intended slot.*image matches')

        uninstall = self.text.split('## Uninstallation\n', 1)[1].split('## Device-Specific Notes', 1)[0]
        before_restore = uninstall.split('\nfastboot flash boot ', 1)[0]
        self.assertRegex(before_restore, r'(?is)current active slot.*only if.*affected slot.*image matches')


if __name__ == '__main__':
    unittest.main()
