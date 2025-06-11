---
layout: doc
title: Xiaomi Rooting Guide
description: "Best complete step-by-step guide to root Xiaomi devices running MIUI/HyperOS in 2025."
head:
  - - link
    - rel: canonical
      href: https://awesome-root.org/rooting-guides/xiaomi
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Complete Xiaomi Rooting Guide - MIUI & HyperOS 2025
  - - meta
    - property: og:description
      content: Root your Xiaomi device with this comprehensive guide covering bootloader unlock, TWRP/OrangeFox recovery, and Magisk installation for MIUI and HyperOS.
  - - meta
    - property: og:url
      content: https://awesome-root.org/rooting-guides/xiaomi
  - - meta
    - property: og:image
      content: https://awesome-root.org/images/og.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Xiaomi Rooting Guide - MIUI & HyperOS 2025
  - - meta
    - name: twitter:description
      content: Complete step-by-step guide to root Xiaomi devices. Covers bootloader unlock, custom recovery, and Magisk installation.
  - - meta
    - name: keywords
      content: xiaomi root guide, miui root, hyperos root, xiaomi bootloader unlock, xiaomi magisk, twrp xiaomi, orangefox xiaomi, redmi root guide, mi unlock tool, xiaomi rooting 2025
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
      content: Xiaomi
  - - meta
    - property: article:tag
      content: MIUI
  - - meta
    - property: article:tag
      content: HyperOS
  - - meta
    - property: article:tag
      content: Magisk
  - - meta
    - property: article:tag
      content: Bootloader Unlock
---
# Xiaomi Rooting Guide

## Requirements:
1. **[Get your device `code name`](https://xiaomiui.net/all-xiaomi-codenames-5137/)**

2. **Mi Account** (Active for more than 30 days)

3. **MIUI Unlock Tool**
   - Download link: [MIUI Unlock Tool](https://en.miui.com/unlock/download_en.html)

4. **Windows PC/Laptop**
   
5. **Custom Recovery**
   - Download Custom for your device from:
     - [TWRP Recovery](https://twrp.me/Devices/)
     - [OrangeFox Recovery](https://orangefox.download/)

6. **Magisk**
   - Download link: [Magisk Releases](https://github.com/topjohnwu/Magisk/releases)

7. **Fastboot ROM for Your Device (Optional)**
   - Downloads from (Xiaomi Firmware Updater):
     - [HyperOS](https://xmfirmwareupdater.com/hyperos/)
     - [MIUI](https://xmfirmwareupdater.com/miui/)

## Steps:

### 1. Unlock Your Bootloader

- Enable Developer Options:
  - Go to **Settings > About Phone > HyperOS/MIUI version**
  - Tap **HyperOS/MIUI version** 7 times to enable Developer Options
- Enable OEM Unlocking and USB Debugging:
  - Go to **Settings > Additional Settings > Developer Options**
  - Enable **OEM unlocking** and **USB debugging**
  - **Bind your Xiaomi account** to your phone:
    -  Tap **Mi Unlock status » Agree » Add account and device**.
    -   Make sure your device can connect to the internet using mobile data.
    - Once the account is successfully bound, you should get a message **Added successfully.**
    - Mi account is associated with this device now.
- Apply for Bootloader Unlock
  - MIUI
    - You can proceed to straight to next step of unlocking with MIUI Unlock Tool.
  - HyperOS
    - Download [Xiaomi Community App](https://play.google.com/store/apps/details?id=com.mi.global.bbs&hl=en).
    - **Login** using your MI account.
    - Change your **Mi Community region to Global.**
    - Then click on**Unlock Bootloader> Apply for unlocking**.
    - **Wait** for the time app showed after which you will be given access to unlock bootloader.
    - Check [Tips and Tricks](#tips-and-trciks)
- **Unlock with MIUI Unlock Tool**:
  - Install the **MIUI Unlock Tool**
  - Log in with your Mi Account
  - Boot your device into Fastboot mode (Power + Volume Down)
  - Connect your device to the PC and follow the tool's instructions

> **Note:** Unlocking the bootloader will erase all data on your device.

### 2. Download Custom Recovery for Your Device

- Choose a custom recovery compatible with your device model
  - **TWRP Recovery**: [Devices](https://twrp.me/Devices/)
  - **OrangeFox Recovery**: [Devices](https://orangefox.download/)
- Download the `.img` file for your device
- Rename the downloaded file to `recovery.img`.

### 3. Flash Custom Recovery

#### Using Windows:

1. Install **ADB and Fastboot** tools
   - Download from [Google Platform Tools](https://developer.android.com/studio/releases/platform-tools)
2. Open Command Prompt in the folder containing the recovery image
3. Boot your device into Fastboot mode (Power + Volume Down)
4. Connect your device to the PC
5. Execute the following commands:
   ```sh
   fastboot flash recovery recovery.img
   ```
   
#### Using Linux:   
1. Install Android Debug Bridge (adb):
   - For Arch Linux:
        ```bash
        sudo pacman -S android-tools 
        ```
   - For Debian/Ubuntu/Mint:
        ```bash
        sudo apt install adb 
        ```
    - For RHEL/CentOS/Fedora:
        ```bash
        sudo yum install adb
        ```
    - For OpenSUSE:
        ```bash
        sudo zypper install adb
        ```

2. Open your terminal in same folder where custom recovery (`recovery.img`) is downloaded.
3. Boot your device into Fastboot mode (Power + Volume Down)
4. Connect your device to the PC
5. Execute the following commands:
```bash
fastboot devices
```
```bash
fastboot flash recovery recovery.img
```
6. Wait for success message on terminal.
7. Disconnect phoen from pc and reboot by pressing these buttons at the same time `Power + Vol Up + Vol Down` for **15** seconds.
8. 
> Never ever reboot into recovery using fastboot command.


### 4. Flash Magisk Using Custom Recovery

1. Boot into Custom Recovery:
- Press **Power + Vol Up** button untill you see boot screen release the power button and after 3 seconds release Vol Up button.
2. Transfer **Magisk ZIP** to your device storage if not already
3. In recovery, select **Install**
4. Navigate to the Magisk ZIP file and select it
5. Swipe to confirm the flash
6. Reboot your device

### 5. Complete Magisk Setup

1. Open the **Magisk** app on your device
2. Follow any prompts to complete installation
3. Verify root access with a root checker app

---


## Tips and Trciks:

### Alternative unlock bootloader
> Unlocking the Bootloader on Redmi Note 13 4G NFC and Xiaomi 11 Lite 5G NE (HyperOS)

After struggling with delays and account errors on the MI Community app, I found an effective method online to unlock the bootloader on HyperOS devices.

Steps to Bypass MI Community Account Error and Unlock the Bootloader on HyperOS:

#### Requirements:
- **HyperOS-BootLoader-Bypass-V2**: 
  - [Download here](https://github.com/mrzzoxo/HyperOS-BootLoader-Bypass/releases/tag/V2)
- Download the **Settings.apk file**:
  - [Download here](https://t.me/RedmiNote134G/72) - Telegram Link
- **Download and install the MI Unlock Tool**:  
  - [Download here](https://en.miui.com/unlock/download_en.html)

#### Instructions:
1. **Log in to your MI account.**
2. Uninstall the MI Community app—you won't need it anymore.
3. **Install the Settings.apk** from this message. Your device settings will now be in English, resembling MIUI 14.
4. **Go to Developer Settings and toggle USB Debugging (turn it off, then on again).**
5. **Enable OEM Unlock.**
6. **Connect your phone** to your computer.
7. **Open the HyperOS-BootLoader-Bypass-V2** folder and **run the bypass.cmd script.**
(If everything is successful, you'll see a green "SUCCESS" message and a prompt to link your phone to your MI account in the phone settings.)
8. **In Developer Settings, disable Wi-Fi and ensure Mobile Internet is enabled.**
9. **Open "MI Unlock Status" and link your account to your phone.**
(Make sure mobile data is on, and Wi-Fi is off. You’ll receive a notification confirming that your account is linked.)
10.  **Open MI Unlock and log in to your account.**
11.  Enter **FASTBOOT mode** on your phone by holding down the volume down and power buttons until FASTBOOT appears on the display.
12.  Connect your phone to your computer.
13.  In MI Unlock, **click UNLOCK and accept all the prompts.**
14.  You should now see a **timer.** In my case, it was 72 hours, but it may vary depending on your situation.
15.  Reboot your phone by long-pressing the power button and use it normally. After the timer expires, repeat steps 11 to 13 to complete the process.
16.  Congratulations! Your bootloader is now unlocked.

#### IMPORTANT NOTES:
- Do not log out of your MI account on your phone.
- Do not reset the settings.
- Do not reinstall the Settings application (even though the language might be inconvenient for now).
- Do not update your firmware until the process is fully complete.

Thanks to @Kaktusbv for sharing this method.
> Source : [Telegram](https://t.me/RedmiNote134GCommunity/105105)

---
### Hyper OS Feature Unlocker
> FOR **Redmi Note 13 4G(Sapphire)** & **Redmi Note 13 4G NFC(Sapphiren)** ONLY

#### Features:
- Hyper Blur
- New Hyper Boot Animation
- Dynamic Refresh Rate
- 90FPS Refresh Rate
- And many more

#### Requirements:

- For **Sapphire**:
  - **[Magisk](https://github.com/topjohnwu/Magisk)** 
  - [Hyper OS Sapphire Unlocker](https://archive.org/download/hyper-os-sapphire-unlocker/Hyper%20OS%20Sapphire%20Unlocker.zip)

- For **Sapphiren**: 
   - **[Magisk](https://github.com/topjohnwu/Magisk)** 
   - [Hyper OS Sapphiren Unlocker](https://archive.org/download/hyper-os-sapphire-unlocker/Hyper%20OS%20Sapphiren%20Unlocker.zip)

#### Steps:
- [Install Magisk](../rooting-guides/xiaomi.md#4-flash-magisk-using-custom-recovery)
- Open Magisk and flash the module according to your device.
- Reboot your device.


---
**Disclaimer:** Rooting voids your warranty and may brick your device if not done properly. Proceed at your own risk and ensure you have backups of important data.