---
layout: doc
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
    - Visit [MIUI Unlock](https://en.miui.com/unlock/) and apply for unlocking permissions
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

### 3. Flash Custom Recovery

#### Using Windows:

1. Install **ADB and Fastboot** tools
   - Download from [Google Platform Tools](https://developer.android.com/studio/releases/platform-tools)
2. Open Command Prompt in the folder containing the recovery image
3. Boot your device into Fastboot mode (Power + Volume Down)
4. Connect your device to the PC
5. Execute the following commands:
   
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
[WIP]
- Add HyperOS Unlock Bypass
- Add hyper unlock

**Disclaimer:** Rooting voids your warranty and may brick your device if not done properly. Proceed at your own risk and ensure you have backups of important data.