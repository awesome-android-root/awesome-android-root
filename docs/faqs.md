---
title: FAQs
layout: doc
---
# Frequently Asked Questions

### General Questions

#### Will rooting void my warranty?
Generally yes, rooting voids your device warranty. However, it specifically depends upon your device manufacturer.
You can usually unroot your device before sending it for warranty service. Some manufacturers may still detect that the device was previously rooted.

#### Can I unroot my device?
Yes. You can unroot by:
- Using the "Unroot" option in [Magisk Manager](https://github.com/topjohnwu/Magisk)
- Flashing stock firmware 

### Safety & Security

#### Is rooting safe?
Rooting itself is generally safe when done correctly, but carries some risks:
- Potential for bricking if done incorrectly 
- Security vulnerabilities if not properly managed
- System instability if incompatible modifications are made

#### How can I protect my banking apps on a rooted device?
You can:
1. Use [Magisk Hide](https://github.com/topjohnwu/Magisk) to hide root from specific apps
2. Install [Play Integrity Fix](https://github.com/chiteroman/PlayIntegrityFix)
3. Use [Shamiko](https://github.com/LSPosed/LSPosed.github.io/releases) for additional root hiding
4. Consider using app isolation tools like [Shelter](https://gitea.angry.im/PeterCxy/Shelter)

### Troubleshooting

#### What should I do if my device won't boot after rooting?
1. Try booting into recovery mode
2. Flash the original firmware if possible
3. Use manufacturer's emergency download mode if available
4. Seek help on Telegram group of your device,your device manufacturer forum or XDA Forums for your specific device

#### How do I fix SafetyNet/Play Integrity issues?
Use a combination of:
- [Play Integrity Fix](https://github.com/chiteroman/PlayIntegrityFix)
- [Magisk](https://github.com/topjohnwu/Magisk)'s DenyList
- [Shamiko](https://github.com/LSPosed/LSPosed.github.io/releases) for additional root hiding

#### Why aren't root apps detecting root access?
Check if:
1. Root management app (like [Magisk](https://github.com/topjohnwu/Magisk)) is properly installed
2. Apps have been granted root permissions
3. Root hiding features aren't accidentally blocking legitimate root apps
4. Use [Root Checker](https://play.google.com/store/apps/details?id=com.joeykrim.rootcheck) to verify root access
