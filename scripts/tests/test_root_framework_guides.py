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
    blocks = re.findall(r'^[ \t]*```(?:bash|sh)[ \t]*\n(.*?)^[ \t]*```[ \t]*$', text, re.M | re.S)
    for block in blocks:
        for line in block.splitlines():
            args = shlex.split(line, comments=True)
            if args:
                yield args


def fastboot_action(args):
    """Return the fastboot verb and arguments, including when global options precede it."""
    if Path(args[0]).name.lower() not in {'fastboot', 'fastboot.exe'}:
        return []
    for index, arg in enumerate(args[1:], 1):
        if arg in {'flash', 'boot', 'oem', 'flashing'}:
            return args[index:]
    return []


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

    def test_fastboot_examples_match_their_conditional_image(self):
        for name, text, expected in (
            ('Magisk', self.magisk, {'boot', 'init_boot', 'vendor_boot', 'recovery'}),
            ('KernelSU', self.kernelsu, {'boot', 'init_boot'}),
        ):
            with self.subTest(guide=name):
                actions = [fastboot_action(args) for args in shell_commands(text)]
                flashes = [args for args in actions if args and args[0] == 'flash']
                conditional = re.findall(
                    r'^If [^\n]*`(boot|init_boot|vendor_boot|recovery)\.img`[^\n]*:\n\n'
                    r'```bash\nfastboot flash (boot|init_boot|vendor_boot|recovery) [^\n]+\n```',
                    text, re.M,
                )
                self.assertEqual({args[1] for args in flashes}, expected)
                self.assertEqual(Counter(args[1] for args in flashes), Counter(target for _, target in conditional))
                self.assertTrue(all(image == target for image, target in conditional))

    def test_magisk_samsung_first_install_and_recovery(self):
        flash = section(self.magisk, '#### Step 3: Flash Patched Image', '#### Step 4: Verify Installation')
        self.assertRegex(flash, r'(?i)first installation requires a full data wipe')
        self.assertRegex(flash, r'(?s)`CSC`.*not `HOME_CSC`')
        self.assertRegex(flash, r'(?is)never restore individual stock.*full.firmware recovery')

    def test_magisk_ota_order_and_uninstall(self):
        ota = section(self.magisk, '### OTA System Updates', '### Backup and Restore')
        steps = re.findall(r'(?m)^\d+\. (.+)$', ota)
        self.assertEqual(len(steps), 4)
        self.assertIn('Restore Images', steps[0])
        self.assertRegex(steps[0], r'(?i)if.*stock')
        self.assertRegex(steps[0], r'(?i)do not reboot')
        self.assertRegex(steps[1], r'(?i)(?:apply|start).*OTA.*(?:finish|complete).*do not restart')
        self.assertIn('Install to Inactive Slot', steps[2])
        self.assertRegex(steps[3], r'(?i)system update.*restart')
        self.assertIn('**Samsung:**', ota)
        restore = section(self.magisk, '### Backup and Restore', '## Troubleshooting')
        self.assertIn('Complete Uninstall', restore)
        self.assertRegex(restore, r'(?i)Restore Images.*not a full uninstall')

    def test_kernelsu_ota_order(self):
        install = section(
            self.kernelsu, '### Method 1: LKM via the Manager (recommended)', '### Method 2: ksud from a PC'
        )
        ota = install.split('**Updates and OTAs:**', 1)[1].split('**Stock-image backup:**', 1)[0]
        markers = ('restore the stock image first', 'Finish installing the OTA', 'Install to inactive slot', 'system restart')
        positions = [ota.index(marker) for marker in markers]
        self.assertEqual(positions, sorted(positions))
        self.assertRegex(ota, r'(?i)if.*requires it.*matching backup')
        self.assertRegex(ota, r'(?i)without rebooting')

    def test_kernelsu_pc_flags_and_module_command(self):
        pc = section(self.kernelsu, '### Method 2: ksud from a PC', '### Method 3: Community or custom kernel')
        for args in shell_commands(pc):
            self.assertFalse({'--flash', '--ota', '-f', '-u'} & set(args))
        self.assertIn('ksud module uninstall MODULE_ID', self.kernelsu)
        self.assertNotIn('ksud module remove', self.kernelsu)

    def test_adjacent_ota_and_samsung_unroot_caveats(self):
        faq = (GUIDES.parent / 'faqs.md').read_text(encoding='utf-8')
        ota = section(faq, '### OTA Updates and Root', '## Compatibility')
        steps = re.findall(r'(?m)^\d+\. (.+)$', ota)
        self.assertGreaterEqual(len(steps), 4)
        self.assertRegex(steps[0], r'(?i)if.*stock.*Restore Images')
        self.assertRegex(steps[0], r'(?i)do not reboot')
        self.assertRegex(steps[1], r'(?i)OTA.*do not reboot')
        self.assertIn('Install to Inactive Slot', steps[2])
        self.assertRegex(steps[3], r'(?i)system updater.*Restart now')
        self.assertIn('separate manual firmware upgrade', ota)
        self.assertIn('`boot.img`, not `init_boot.img`', ota)

        unroot = section(faq, '### How to Unroot?', '## Community and Support')
        self.assertRegex(unroot, r'(?is)Samsung.*full.firmware recovery.*instead of restoring individual')
        self.assertFalse(any(fastboot_action(args)[:1] == ['flash'] for args in shell_commands(unroot)))

    def test_magisk_emergency_command_warns_about_reboot(self):
        troubleshooting = (GUIDES.parent / 'troubleshooting.md').read_text(encoding='utf-8')
        rescue = section(troubleshooting, "### Device Won't Boot (Bootloop)", '### Root Not Working')
        self.assertIn(['adb', 'shell', 'magisk', '--remove-modules'], list(shell_commands(rescue)))
        self.assertRegex(rescue, r'(?i)removes.*all.*modules.*automatically reboots')

    def test_no_fixed_release_is_described_as_latest(self):
        # A version cited for compatibility is fine; presenting it as latest goes stale.
        patterns = (
            r'(?i)\b(?:latest|current)\b[^\n]{0,80}(?:\bv\d+\.\d+|\(\d+\.\d+)',
            r'(?i)\bv\d+\.\d+[^\n]{0,80}\b(?:latest|current)\b',
        )
        for path in GUIDES.glob('*.md'):
            with self.subTest(guide=path.name):
                for pattern in patterns:
                    self.assertNotRegex(path.read_text(encoding='utf-8'), pattern)


class DeviceGuideSafetyTest(unittest.TestCase):
    DEVICES = ('pixel', 'xiaomi', 'oneplus', 'nothing', 'motorola', 'samsung')

    @classmethod
    def setUpClass(cls):
        cls.guides = {
            device: (GUIDES / f'how-to-root-{device}-phone.md').read_text(encoding='utf-8')
            for device in cls.DEVICES
        }

    def test_original_renamed_anchors_remain_available(self):
        aliases = {
            'pixel': {'method-0-pixel-flasher-gui-tool-easiest'},
            'samsung': {'unroot-for-ota'},
            'xiaomi': {'step-3-safer-first-boot-then-permanent-install', 'step-1-boot-a-recovery-image-don-t-flash-yet'},
            'oneplus': {'for-a-b-devices-all-modern-oneplus'},
            'nothing': {'for-a-b-devices-all-nothing-phones'},
            'motorola': {'for-a-b-devices-all-modern-motorola', 'method-2-fastboot-boot-direct-install-edge-50-fusion-and-similar'},
        }
        for device, required in aliases.items():
            with self.subTest(device=device):
                self.assertFalse(required - set(heading_ids(self.guides[device])))

    def test_device_flash_examples_are_conditional_and_avoid_generic_unsafe_commands(self):
        for device, text in self.guides.items():
            with self.subTest(device=device):
                commands = list(shell_commands(text))
                actions = [fastboot_action(args) for args in commands]
                flashes = [args for args in actions if args and args[0] == 'flash']
                for args, action in zip(commands, actions):
                    self.assertFalse({'--disable-verity', '--disable-verification', '--slot=all'} & set(args))
                    self.assertFalse(any(args[i:i + 2] == ['--slot', 'all'] for i in range(len(args))))
                    if action[:1] in (['oem'], ['flashing']):
                        self.assertNotIn(action[1:2], (['lock'], ['lock_critical']))
                    if action[:1] == ['boot']:
                        self.assertNotIn('init_boot', ' '.join(action))

                if device == 'samsung':
                    self.assertFalse(flashes, 'Samsung uses a full firmware/AP-tar workflow')
                    continue

                conditional = re.findall(
                    r'^If [^\n]*`(boot|init_boot)\.img`[^\n]*:\n\n'
                    r'```bash\nfastboot flash (boot|init_boot) [^\n]+\n```',
                    text, re.M,
                )
                self.assertEqual(Counter(args[1] for args in flashes), Counter({'boot': 1, 'init_boot': 1}))
                self.assertEqual(Counter(args[1] for args in flashes), Counter(target for _, target in conditional))
                self.assertTrue(all(image == target for image, target in conditional))

    def test_unsuffixed_slot_target_is_explained_before_flashing(self):
        pages = {device: text for device, text in self.guides.items() if device != 'samsung'}
        pages.update({name: (GUIDES / f'{name}-guide.md').read_text(encoding='utf-8')
                      for name in ('magisk', 'kernelsu', 'apatch')})
        for name, text in pages.items():
            with self.subTest(guide=name):
                before_flash = text.split('\nfastboot flash boot ', 1)[0]
                paragraph = re.search(r'(?m)^On standard A/B devices, unsuffixed[^\n]+$', before_flash)
                self.assertIsNotNone(paragraph, 'Explain the default slot before the flash example')
                self.assertRegex(paragraph.group(), r'(?i)current active slot.*only if.*intended slot.*image matches.*firmware')
                self.assertIn('fastboot getvar current-slot', paragraph.group())

    def test_recovery_covers_every_affected_partition_and_slot(self):
        for device, text in self.guides.items():
            if device == 'samsung':
                continue
            with self.subTest(device=device):
                self.assertIn('every affected partition and slot', text)
                self.assertRegex(text, r'(?i)restoring `boot` (?:alone )?(?:does not|will not)')

    def test_pixel_and_nothing_examples_do_not_use_android_version_as_the_target(self):
        pixel = section(self.guides['pixel'], '### Image Type Quick Reference', '## Unlock Bootloader')
        pixel6 = next(line for line in pixel.splitlines() if line.startswith('| Pixel 6,'))
        self.assertIn('`boot.img`', pixel6)
        self.assertNotIn('init_boot', pixel6)
        self.assertIn('Android 13', pixel6)

        nothing = section(self.guides['nothing'], '### Determine Correct Image', '### Method 1: Boot Image Patching')
        for model in ('1', '2'):
            line = next(line for line in nothing.splitlines() if line.startswith(f'- **Phone ({model})'))
            with self.subTest(model=model):
                self.assertIn('`boot.img`', line)

    def test_device_ota_order_is_conditional(self):
        boundaries = {
            'pixel': ('### Manual Method (Magisk)', '## Troubleshooting'),
            'xiaomi': ('### OTA Update Management (HyperOS/MIUI on unlocked and rooted)', '### Custom ROM Alternatives'),
            'oneplus': ('## OTA Handling', '## Troubleshooting'),
            'nothing': ('## OTA Handling', '## Troubleshooting'),
            'motorola': ('## OTA Handling', '## Troubleshooting'),
        }
        for device, (start, end) in boundaries.items():
            with self.subTest(device=device):
                ota = section(self.guides[device], start, end)
                steps = re.findall(r'(?m)^\d+\. (.+)$', ota)
                self.assertEqual(len(steps), 4)
                self.assertRegex(steps[0], r'(?i)if.*stock.*Restore Images')
                self.assertRegex(steps[0], r'(?i)do not reboot')
                self.assertRegex(steps[1], r'(?i)(?:apply|start).*OTA.*(?:finish|complete).*do not restart')
                self.assertIn('Install to Inactive Slot', steps[2])
                self.assertRegex(steps[3], r'(?i)system update.*restart')
                if device == 'pixel':
                    self.assertRegex(steps[0], r'(?i)unnecessary.*Pixel.*full OTA')

    def test_samsung_firmware_upgrade_and_recovery_are_distinct(self):
        samsung = self.guides['samsung']
        first = section(samsung, '### Method 1: AP File Patching (Primary Method)', '### Step 6: Verify Knox Trip')
        self.assertRegex(first, r'(?s)`CSC`.*not `HOME_CSC`.*first installation')
        self.assertRegex(first, r'(?i)first Magisk installation requires a full data wipe')
        ota = section(samsung, '## OTA Handling', '## Troubleshooting')
        self.assertRegex(ota, r'(?is)patched `AP`.*upgrade[^\n]*`HOME_CSC` instead of `CSC`')
        unroot = section(samsung, '## Unroot and Restore', '## Community Resources')
        self.assertRegex(unroot, r'(?is)do not.*restore individual stock.*full.firmware')


if __name__ == '__main__':
    unittest.main()
