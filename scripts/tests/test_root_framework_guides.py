from collections import Counter
from pathlib import Path
import re
import shlex
import unittest

from scripts.check_links import heading_ids


GUIDES = Path(__file__).resolve().parents[2] / 'docs/rooting-guides'

# These headings are public links, including anchors which are not linked inside
# the repository. Keep them if the prose or visible heading text changes.
MAGISK_ANCHORS = set('''
quick-navigation understanding-magisk core-features magisk-vs-alternatives
prerequisites critical-requirements hardware-requirements software-requirements
compatibility installation-methods method-1-boot-image-patching-recommended
step-1-download-required-files step-2-patch-boot-image step-3-flash-patched-image
step-4-verify-installation method-2-custom-recovery-installation-legacy
method-3-direct-installation-advanced post-installation-setup initial-configuration
managing-modules installing-modules managing-installed-modules
root-hiding-and-play-integrity understanding-play-integrity configuring-root-hiding
advanced-root-hiding testing-play-integrity updates-and-maintenance updating-magisk
ota-system-updates backup-and-restore troubleshooting installation-issues
root-access-issues module-problems banking-app-issues play-integrity-failures
best-practices security-recommendations module-management next-steps
community-resources getting-help
'''.split())
KERNELSU_ANCHORS = set('''
quick-navigation understanding-kernelsu core-features kernelsu-vs-alternatives
kernelsu-variants installation-modes lkm-mode-loadable-kernel-module
gki-mode-generic-kernel-image which-mode-to-choose prerequisites requirements
compatibility-check installation-methods method-1-lkm-via-the-manager-recommended
method-2-ksud-from-a-pc method-3-community-or-custom-kernel
metamodules-and-modules what-is-a-metamodule available-metamodules
installing-modules module-compatibility module-webui app-profile-system
typical-profiles root-hiding-and-play-integrity the-three-layers what-is-realistic
troubleshooting common-issues-and-fixes recovery next-steps community-resources
'''.split())


def section(text, start, end):
    """Read one named Markdown section without relying on line numbers."""
    return text.split(start + '\n', 1)[1].split('\n' + end, 1)[0]


def shell_commands(text):
    blocks = re.findall(r'^```(?:bash|sh)\s*\n(.*?)^```\s*$', text, re.M | re.S)
    for block in blocks:
        for line in block.splitlines():
            args = shlex.split(line, comments=True)
            if args:
                yield args


class RootFrameworkGuideSafetyTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.magisk = (GUIDES / 'magisk-guide.md').read_text(encoding='utf-8')
        cls.kernelsu = (GUIDES / 'kernelsu-guide.md').read_text(encoding='utf-8')

    def test_existing_guide_anchors_remain_available(self):
        for name, text, expected in (
            ('Magisk', self.magisk, MAGISK_ANCHORS),
            ('KernelSU', self.kernelsu, KERNELSU_ANCHORS),
        ):
            with self.subTest(guide=name):
                self.assertFalse(expected - set(heading_ids(text)))

    def test_partitions_are_not_chosen_from_android_version_alone(self):
        for name, text in (('Magisk', self.magisk), ('KernelSU', self.kernelsu)):
            with self.subTest(guide=name):
                self.assertIn('never choose the partition from the Android version alone', text)
                self.assertIn('`boot.img`', text)
                self.assertIn('`init_boot.img`', text)
                self.assertIn('firmware', text)
                self.assertIn('slot', text)
                self.assertRegex(text, r'upgraded to Android 13 or later (?:still|may still) use `boot`')

    def test_each_fastboot_example_is_conditional_and_matches_its_image(self):
        for name, text, expected in (
            ('Magisk', self.magisk, {'boot', 'init_boot', 'vendor_boot', 'recovery'}),
            ('KernelSU', self.kernelsu, {'boot', 'init_boot'}),
        ):
            with self.subTest(guide=name):
                commands = [args for args in shell_commands(text) if args[:2] == ['fastboot', 'flash']]
                conditional = re.findall(
                    r'^If [^\n]*`(boot|init_boot|vendor_boot|recovery)\.img`[^\n]*:\n\n'
                    r'```bash\nfastboot flash (boot|init_boot|vendor_boot|recovery) [^\n]+\n```',
                    text, re.M,
                )
                self.assertEqual({args[2] for args in commands}, expected)
                self.assertEqual(Counter(args[2] for args in commands), Counter(target for _, target in conditional))
                self.assertTrue(all(image == target for image, target in conditional))
                self.assertTrue(all('stock' not in args[3].lower() for args in commands))
                self.assertRegex(text, r'run \*\*only the command\*\*|Use \*\*only the one command\*\*')

    def test_magisk_samsung_and_wrong_partition_recovery(self):
        flash = section(self.magisk, '#### Step 3: Flash Patched Image', '#### Step 4: Verify Installation')
        self.assertIn('first installation requires a full data wipe', flash)
        self.assertIn('AP tar', flash)
        self.assertIn('`CSC`', flash)
        self.assertIn('not `HOME_CSC`', flash)
        self.assertIn('Never restore individual stock', flash)
        self.assertIn('full-firmware recovery', flash)
        for text in (self.magisk, self.kernelsu):
            with self.subTest(guide=text[:50]):
                self.assertIn('restoring `boot` alone will not repair', text.lower())
                self.assertIn('partition and slot', text)

    def test_magisk_ota_order_and_restore_vs_uninstall(self):
        ota = section(self.magisk, '### OTA System Updates', '### Backup and Restore')
        steps = (
            'Uninstall > Restore Images',
            'Start the system OTA',
            'Install > Install to Inactive Slot (After OTA)',
            'Return to the system update screen',
        )
        offsets = [ota.index(step) for step in steps]
        self.assertEqual(offsets, sorted(offsets))
        self.assertIn('Do not reboot', ota)
        self.assertIn('Do not restart yet', ota)
        self.assertIn('**Samsung:**', ota)
        restore = section(self.magisk, '### Backup and Restore', '## Troubleshooting')
        self.assertIn('Complete Uninstall', restore)
        self.assertIn('it is not a full uninstall', restore)

    def test_magisk_current_grants_hiding_and_module_rescue(self):
        self.assertIn('explicitly grant access to the trusted app before it calls `su`', self.magisk)
        self.assertIn('Interactive superuser request prompts are no longer provided', self.magisk)
        self.assertIn('no longer offers the old **Hide the Magisk app**', self.magisk)
        self.assertIn('DenyList is not an invisibility guarantee', self.magisk)
        self.assertIn('same device', self.magisk)
        self.assertIn('adb shell magisk --remove-modules', self.magisk)
        self.assertIn('removes all modules and automatically reboots', self.magisk)

    def test_kernelsu_backup_ota_and_cli_constraints(self):
        installation = section(
            self.kernelsu, '### Method 1: LKM via the Manager (recommended)', '### Method 2: ksud from a PC'
        )
        self.assertIn('only when the current slot was not already patched', installation)
        self.assertIn('requires a matching backup', installation)
        self.assertIn('keep an independent backup', installation)
        order = ['restore the stock image first', 'Finish installing the OTA', 'Install to inactive slot', 'system restart']
        offsets = [installation.index(step) for step in order]
        self.assertEqual(offsets, sorted(offsets))
        self.assertIn('root does not automatically survive', installation)
        pc = section(self.kernelsu, '### Method 2: ksud from a PC', '### Method 3: Community or custom kernel')
        self.assertIn('on-device Android options, not PC-side flashing flags', pc)
        for args in shell_commands(pc):
            self.assertNotIn('--flash', args)
            self.assertNotIn('--ota', args)
            self.assertNotIn('-f', args)
            self.assertNotIn('-u', args)

    def test_kernelsu_module_and_recovery_limitations(self):
        self.assertIn('ksud module uninstall MODULE_ID', self.kernelsu)
        self.assertNotIn('ksud module remove', self.kernelsu)
        self.assertIn('more than three times', self.kernelsu)
        self.assertIn('`initrc` injection can still run in safe mode', self.kernelsu)
        self.assertIn('`/data` is decrypted', self.kernelsu)
        self.assertIn('Recovery access and module loading are not guaranteed', self.kernelsu)
        self.assertIn('can work without a metamodule', self.kernelsu)
        self.assertIn('Only **one** metamodule', self.kernelsu)

    def test_release_numbers_are_not_presented_as_latest(self):
        for text in (self.magisk, self.kernelsu):
            self.assertNotRegex(
                text, r'(?i)\b(?:latest|current)\s+(?:(?:stable|release|version)\s+)*(?:is\s+)?v?\d+\.\d+(?:\.\d+)?\b'
            )
            self.assertNotRegex(text, r'(?i)\b(?:latest|current|stable)\b[^\n]{0,60}\bv\d+\.\d+')
            self.assertNotRegex(text, r'(?i)\bv\d+\.\d+[^\n]{0,60}\b(?:latest|current)\b')

    def test_variant_and_metamodule_claims_follow_current_upstream(self):
        variants = section(self.kernelsu, '## KernelSU Variants', '## Installation Modes')
        self.assertIn('Metamodule-based mounting', variants)
        self.assertNotIn('Built-in Magic Mount (not only metamodules)', variants)
        self.assertIn('`x86_64` kernels may panic', variants)
        self.assertIn('`CONFIG_KPM=y`', self.kernelsu)
        self.assertIn('OverlayFS and Magic Mount fallbacks', self.kernelsu)
        comparison = (GUIDES / 'root-framework-comparison.md').read_text(encoding='utf-8')
        self.assertNotIn('Magic Mount in the core', comparison)

    def test_adjacent_ota_guidance_preserves_the_order_and_exceptions(self):
        faq = (GUIDES.parent / 'faqs.md').read_text(encoding='utf-8')
        ota = section(faq, '### OTA Updates and Root', '## Compatibility')
        steps = ('Restore Images', 'Apply the OTA', 'Install to Inactive Slot', 'Restart now')
        offsets = [ota.index(step) for step in steps]
        self.assertEqual(offsets, sorted(offsets))
        self.assertIn('If the update needs stock images', ota)
        self.assertIn('Pixel and Googlebook', ota)
        self.assertIn('separate manual firmware upgrade procedure', ota)
        self.assertIn('`boot.img`, not `init_boot.img`', ota)

    def test_adjacent_unroot_and_rescue_guidance_keeps_samsung_exception(self):
        faq = (GUIDES.parent / 'faqs.md').read_text(encoding='utf-8')
        unroot = section(faq, '### How to Unroot?', '## Community and Support')
        self.assertIn('**Restore Images** is not a complete uninstall', unroot)
        self.assertIn('full-firmware recovery instructions', unroot)
        self.assertIn('instead of restoring individual stock partitions', unroot)
        self.assertIn('every affected partition and slot', unroot)
        self.assertFalse(any(args[:2] == ['fastboot', 'flash'] for args in shell_commands(unroot)))

        troubleshooting = (GUIDES.parent / 'troubleshooting.md').read_text(encoding='utf-8')
        rescue = section(troubleshooting, '### Device Won\'t Boot (Bootloop)', '### Root Not Working')
        self.assertIn('needs early key timing', rescue)
        self.assertIn('automatically reboots', rescue)
        self.assertIn('adb shell magisk --remove-modules', rescue)
        self.assertIn('KernelSU module `initrc` injections may still run', rescue)
        self.assertIn('full-firmware recovery procedure', rescue)

    def test_unreviewed_device_pages_warn_before_their_instructions(self):
        # Retire each warning and this check only when that device guide's steps
        # have been audited; the warning itself is not a device-guide review.
        for device in ('pixel', 'xiaomi', 'oneplus', 'nothing', 'motorola', 'samsung'):
            text = (GUIDES / f'how-to-root-{device}-phone.md').read_text(encoding='utf-8')
            intro = text.split('\n# ', 1)[1].split('\n## ', 1)[0]
            with self.subTest(device=device):
                self.assertIn('::: danger VERIFY', intro)
                self.assertIn('steps on this page are outdated', intro)
                self.assertIn('./magisk-guide.md', intro)
                if device == 'samsung':
                    self.assertIn('full-firmware recovery', intro)
                    self.assertIn('Restore Images', intro)
                else:
                    self.assertIn('target partition, slot and recovery', intro)
                    self.assertIn('does not determine the target', intro)


if __name__ == '__main__':
    unittest.main()
