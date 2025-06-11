# How to root Motorola phones.

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

Go to your terminal and type:

    adb reboot bootloader
    
  Phone should restart to bootloader
  Next you will need a Device unlock token.
  Type to terminal:


    fastboot oem get_unlock_data

You will get a token copy only the token.
Make sure there is no space between lines.
Go to this [Motorola page](https://en-us.support.motorola.com/app/standalone/bootloader/unlock-your-device-a) and login (or sign in) and enter  your token.
In a minute you will get an email with your bootloader unlock key.
Go back to your terminal and copy this:

    fastboot oem unlock [your unlock key]
  Now you have bootloader unlocked.
  Next you have to reboot your device with this command
  

    fastboot reboot

# Chapter 3: Flashing Magisk
Next you will need rooting manager in this tutorial we will be using: [Magisk (source code link)](https://github.com/topjohnwu/Magisk) 
Install apk from here: [Magisk download](https://github.com/topjohnwu/Magisk/releases/tag/v29.0)
Now we will install [Motorola Software fix](https://en-us.support.motorola.com/app/softwarefix). on your pc.
Connect your phone and go to the Backup & Restore tab.
It should start downloading firmware for your phone.
After it is downloaded navigate to download folder with your file explorer   
For me its: C:\ProgramData\RSA\RomFiles\[Your extracted rom fie] 
Get your boot.img file and transfer it to your mobile phone.
Go to magisk app and click Install then click [select and then patch the file]
Select your boot.img file.
Transfer new magisk patched boot.img to your pc.
Open your terminal.

    adb reboot bootloader
Your phone will restart to botloader.
Now rename your new magisk batched boot img to -> **magisk_patched.img**
And transfer it to your platform tools folder.
Now type to your terminal:

    fastboot flash boot magisk_patched.img
  When is booting done go to 
  

    fastboot reboot
  And that's all your phone should be rooted. 



