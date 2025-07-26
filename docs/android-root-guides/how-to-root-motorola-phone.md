---
layout: doc
title: Motorola Rooting Guide
description: "Complete step-by-step guide to root Motorola phones in 2025. Learn how to unlock bootloader and install Magisk on Motorola devices."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/android-root-guides/how-to-root-motorola-phone
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Complete Motorola Rooting Guide - Bootloader Unlock & Magisk 2025
  - - meta
    - property: og:description
      content: Root your Motorola device with this comprehensive guide covering bootloader unlock, Magisk installation, and step-by-step instructions for Motorola Edge 30 Neo.
  - - meta
    - property: og:url
      content: https://awesome-android-root.org/android-root-guides/how-to-root-motorola-phone
  - - meta
    - property: og:image
      content: https://awesome-android-root.org/images/og/motorola.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Motorola Rooting Guide - Edge 30 Neo & More 2025
  - - meta
    - name: twitter:description
      content: Complete step-by-step guide to root Motorola phones. Covers bootloader unlock, Magisk installation, and troubleshooting.
  - - meta
    - name: keywords
      content: motorola root guide, motorola edge 30 neo root, motorola bootloader unlock, motorola magisk, motorola rooting 2025, motorola adb drivers, motorola software fix, fastboot motorola, motorola unlock token, motorola rooting tutorial
  - - meta
    - name: author
      content: Awesome Android Root Project
  - - meta
    - property: article:author
      content: https://github.com/fynks/awesome-android-root
  - - meta
    - property: article:section
      content: Rooting Guides
  - - meta
    - property: article:tag
      content: Motorola
  - - meta
    - property: article:tag
      content: Bootloader Unlock
  - - meta
    - property: article:tag
      content: Magisk
  - - meta
    - property: article:published_time
      content: 2025-06-11
  - - meta
    - property: article:modified_time
      content: 2025-06-11
  - - meta
    - name: robots
      content: index, follow, max-image-preview:large
---

# How to root Motorola phones.

Complete step-by-step guide to root Motorola phones in 2025, including bootloader unlock and Magisk installation.

## 🔗 Related Guides
Master the complete rooting process with our comprehensive guides:
- **[📖 Complete Rooting Guide](./index.md)** - Master guide covering all rooting aspects
- **[🔓 Bootloader Unlocking](./how-to-unlock-bootloader.md)** - Universal bootloader guide with Motorola specifics
- **[🛠️ Custom Recovery](./how-to-install-custom-recovery.md)** - Install TWRP, OrangeFox, or SKYHAWK
- **[🌟 Custom ROM Installation](./custom-rom-installation.md)** - Install LineageOS and other custom ROMs
- **[❓ FAQ & Troubleshooting](../faqs.md)** - Complete support guide with troubleshooting solutions

Hi, 
Welcome to my first tutorial I will show you how to root any Motorola phone.
For this guide ill be using Motorola Edge 30 Neo.


# Chapter 1: Setting up

Download Platform tools: [Platform Tools](https://dl.google.com/android/repository/platform-tools-latest-windows.zip)
Install Motorola ADB drivers: [ADB drivers](https://en-us.support.motorola.com/app/usb-drivers)
First install Motorola drivers.
Then extract platform tools and open terminal inside platform tools folder.

# Chapter 2: Unlocking bootloader
**THIS PROCESS WILL WIPE ALL YOUR DATA!**

1. Go to your terminal and type:
 ```
  adb reboot bootloader
 ```
2. Phone should restart to bootloader
3. Next you will need a Device unlock token.
Type to terminal:
  ```
    fastboot oem get_unlock_data
  ```
5. You will get a token copy only the token.
Make sure there is no space between lines.
Go to this [Motorola page](https://en-us.support.motorola.com/app/standalone/bootloader/unlock-your-device-a) and login (or sign in) and enter  your token.
6. In a minute you will get an email with your bootloader unlock key.
Go back to your terminal and copy this:
  ```
    fastboot oem unlock [your unlock key]
  ```
7. Now you have bootloader unlocked.
8. Next you have to reboot your device with this command
  
  ```
    fastboot reboot
  ```

# Chapter 3: Flashing Magisk
1. Next you will need rooting manager in this tutorial we will be using: [Magisk (source code link)](https://github.com/topjohnwu/Magisk) 
2. Install apk from here: [Magisk download](https://github.com/topjohnwu/Magisk/releases/tag/v29.0)
3. Now we will install [Motorola Software fix](https://en-us.support.motorola.com/app/softwarefix). on your pc.
4. Connect your phone and go to the Backup & Restore tab.
5. It should start downloading firmware for your phone.
6. After it is downloaded navigate to download folder with your file explorer   
7. For me its: C:\ProgramData\RSA\RomFiles\[Your extracted rom fie] 
8. Get your boot.img file and transfer it to your mobile phone.
9. Go to magisk app and click Install then click [select and then patch the file]
10. Select your boot.img file.
11. Transfer new magisk patched boot.img to your pc.
12. Open your terminal.
  ```
    adb reboot bootloader
  ```
13. Your phone will restart to botloader.
14. Now rename your new magisk batched boot img to -> **magisk_patched.img**
15. And transfer it to your platform tools folder.
16. Now type to your terminal:
  ```
    fastboot flash boot magisk_patched.img
  ```
17. When is booting done go to 
  ```
    fastboot reboot
  ```
18. And that's all your phone should be rooted. 



