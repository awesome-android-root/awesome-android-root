---
layout: doc
title: Android Rooting Guides
description: "Learn how to root Android devices safely. Compare root methods like Magisk and KernelSU with device-specific guides and best practices."

---

# Android Rooting Guide

- [Introduction](#introduction)
- [Vendor-Specific Rooting Guides](#vendor-specific-rooting-guides)
- [What is Root Access](#what-is-root-access)
- [Should I Root](#should-i-root)
  - [Benefits of Rooting](#benefits-of-rooting)
  - [Risks and Limitations](#risks-and-limitations)
  - [Community Perspectives](#community-perspectives)
- [Root Solutions](#root-solutions)
  - [How to Root](#how-to-root)
  - [Common Methods](#common-methods)
    - [Magisk](#magisk)
    - [KernelSU](#kernelsu)
    - [APatch](#apatch)
  - [Which Solution Should I Use](#which-solution-should-i-use)
- [Framework Solutions](#framework-solutions)
  - [LSPosed](#lsposed)
  - [LSPosed Fork](#lsposed-fork)

## Introduction

Welcome to the Rooting Guides! This documentation will help you understand what root access is, the pros and cons of rooting your Android device, and provide guidance on how to proceed if you decide to root.

## Vendor-Specific Rooting Guides

For detailed rooting instructions tailored to your specific device, please refer to the following guides:

- [Xiaomi](./xiaomi.md)
- [Samsung](./samsung.md) (WIP)
- [Pixel](./pixel.md) (WIP)
- [OnePlus](./oneplus.md) (WIP)

## What is Root Access

Android rooting is the process of gaining privileged control (known as root access) over various Android subsystems. Rooting allows overcoming limitations that carriers and hardware manufacturers put on some devices, resulting in the ability to alter or replace system applications and settings, run specialized apps that require administrator-level permissions, or perform other operations that are otherwise inaccessible to a normal Android user.

## Should I Root

Now to the main question: Should you root your device? Let's explore the disadvantages and advantages to help you make an informed decision.

### Benefits of Rooting

- You can grant apps superuser (su) access, allowing them to perform advanced functions.
- You can tweak the kernel for improved performance, which is great for gaming.
- You can completely ban ads from your device.
- You can uninstall unnecessary system apps.
- You can perform many more advanced tasks for an enhanced user experience.

### Risks and Limitations

- As a root user, if you mess up, it's your responsibility to fix it.
- There's a risk of hard-bricking your device, although it's rare.
- Banking apps might not work, as some detect root even with Magisk (though there are workarounds).
- The rooting process can be tough for beginners if something goes wrong.

### Community Perspectives

- Here is the [Reddit thread](https://www.reddit.com/r/AndroidQuestions/comments/1c69h3q/is_rooting_still_something_you_would_do_in_2024/) debating if it's worth rooting in 2024 (but in my opinion, it's worth every penny).

## Root Solutions

### How to Root

Rooting procedures vary depending on your device. It's recommended to check the XDA forum or Telegram groups for your device, as they often have specific guides. Generally, the following steps are common:

- Unlock the bootloader.
- Install a custom recovery.
- Flash your preferred rooting solution from below.
- Enjoy the ultimate power of a rooted device.

### Common Methods

#### Magisk

**[Magisk](https://github.com/topjohnwu/Magisk)** is the most popular and powerful tool for Android power users, providing root access, boot scripts, and a module system for customizing Android devices systemlessly. It's actively maintained and regularly updated. `FOSS`

#### KernelSU

**[KernelSU](https://github.com/tiann/KernelSU)** is a kernel-based root solution for Android devices. It provides a root method that works by modifying the kernel, offering an alternative to Magisk for some devices and use cases. KernelSU is gaining popularity, especially on newer devices. `FOSS`

#### APatch

**[APatch](https://github.com/bmax121/APatch)** uses patching of the Android kernel and system to gain root access based on [Kernel Patch](https://github.com/bmax121/KernelPatch/). `FOSS`

### Which Solution Should I Use

If you are a newbie or don't know much about rooting, it's recommended to go with Magisk, as it has vast community support.

## Framework Solutions

Frameworks provide a foundation for extending root functionality through modules by allowing modification of various system configurations and functions.

### LSPosed

**[LSPosed](https://github.com/LSPosed/LSPosed)** is an open-source framework that allows users to install and use Xposed/LSPosed modules on their Android devices. `FOSS`

### LSPosed Fork

**[LSPosed Fork by JingMatrix](https://github.com/JingMatrix/LSPosed)** is a fork of LSPosed after its development was halted for some reasons. It has support for Android 15 as well as some other improvements. `FOSS`