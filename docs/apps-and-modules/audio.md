---
layout: doc
title: Audio Mods for Rooted Android
description: "Browse audio modules and apps for rooted Android: system-wide audio enhancement, Dolby and Viper-style processing, audio control tools and effects."
head:
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - name: author
      content: Awesome Android Root
---

# Audio Mods for Rooted Android

**Audio** apps and modules for rooted Android devices - system-wide **audio enhancement** (Viper-style
processing, Dolby and more), audio control tools and audio effects. All entries below are listed together
regardless of whether they are apps, Magisk modules, KernelSU modules or LSPosed modules.


## Audio Control

- **[Audio jitter silencer](https://github.com/Magisk-Modules-Alt-Repo/audio-jitter-silencer)** - For avoiding distortion on all digital audio outputs, it disables audio jitter generators (w.r.t. battery draining and optimizations, and wireless connectivity). `FOSS` `[M]`
- **[DisableAudioFocus](https://github.com/auag0/DisableAudioFocus)** - Allows you to disable audio focus, enabling you to play multiple videos and audios simultaneously. `FOSS` `[LSP]`
- **[HuaweiPods](https://github.com/Nshpiter/HuaweiPods)** - Huawei audio device integration for Xiaomi HyperOS. `FOSS` `[LSP]`
- **[HyperEars](https://github.com/silverpoetry/HyperEars)** - Adds battery level and noise-control modes for third-party Bluetooth headphones to the HyperOS MiLink device center, so they show up next to Xiaomi earbuds. `FOSS` `[LSP]`
- **[LibrePods](https://github.com/librepods-org/librepods)** - Unlocks Apple's exclusive premium AirPods features on non-Apple devices. `FOSS` `[LSP]` `[M]` `[K]`
- **[No Volume Warnings](https://github.com/zahahah/No-Volume-Warnings)** - Disables the safe-media-volume warning on Pixel phones through a system product overlay. KernelSU may need a mounting metamodule. `FOSS` `[M]` `[K]`
- **[SonyPods](https://github.com/Mercury000/SonyPods)** - System-level Sony headphone control for HyperOS devices. `FOSS` `[LSP]`
- **[VirtuMic](https://gitlab.com/IndiDevs/VirtuMic)** - Virtual microphone manager that injects audio (files or other apps) into the system's recording flow. `FOSS` `[M]` `[K]` | (https://github.com/IndiTheo/VirtuMic) `FOSS`

## Audio Effects

- **[Audio Misc Settings](https://github.com/Magisk-Modules-Alt-Repo/audio-misc-settings)** - For setting miscellaneous audio configuration values (media audio volume steps (100 steps), raising the resampling quality, disabling the effects framework, etc.) `FOSS` `[M]`
- **[Audio SampleRate Changer](https://github.com/Magisk-Modules-Alt-Repo/audio-samplerate-changer)** - Changes audio sample rates in the system-wide mixer. `FOSS` `[M]`
- **[Auto Samplerate Changer for Android](https://github.com/ArupEn1/Auto-Samplerate-Changer-Android)** - Follows each track's sample rate on a USB DAC, with a WebUI and optional bit-perfect mode. Needs root and a USB DAC. `FOSS` `[M]` `[K]` `[A]`
- **[DSP AudioFix](https://github.com/ahmed-alnassif/DSP-AudioFix)** - A simple fix for distorted audio on Xiaomi/MediaTek devices with Awinic smart amps. `FOSS` `[M]` `[K]`
- **[Hi-Res Audio Enabler](https://github.com/reiryuki/Hi-Res-Audio-Enabler-Magisk-Module)** - Enables high resolution 24 or 32-bit width audio output if device is supported. `FOSS` `[M]` `[A]`
- **[Hifi-maximizer-mod](https://github.com/yzyhk904/hifi-maximizer-mod)** - Maximize the digital audio fidelity by reducing jitters on audio outputs (USB DACs, Bluetooth a2dp, DLNA, etc.) `FOSS` `[M]`
- **[High Performance DAC](https://github.com/ahkehra/high_perf_dac)** - Tunes kernel-level audio settings on Qualcomm devices. `FOSS` `[K]`
- **[LHDC A2DP Enabler](https://github.com/Makuro-Arisaka/android17-lhdc-a2dp-universal)** - Makes Android 17's built-in LHDC codec produce sound on Qualcomm phones that negotiate LHDCv5 but stay silent, by declaring the A2DP ports on an AOSP bluetooth audio HAL module instead of the vendor offload path. `FOSS` `[M]` `[K]` `[A]`

## Audio Enhancement

- **[⭐ ViPERFX_RE](https://github.com/likelikeslike/ViPERFX_RE)** - A fork of ViPER4Android FX with a redesigned UI and additional features. `FOSS` `[M]` `[K]` `[A]`
- **[Audio Modification Library Ryuki Mod](https://github.com/reiryuki/Audio-Modification-Library-Ryuki-Mod-Magisk-Module)** - Enables supported audio mods to share the same needed files, such as audio_effects. `FOSS` `[M]` `[A]`
- **[Equalizer314](https://github.com/bearinmindcat/Equalizer314)** - System-wide EQ with multiband compression, limiter, and audio-visual feedback. `FOSS` `[M]`
- **[LightningDSP](https://github.com/zahahah/LightningDSP)** - Applies system-wide audio effects with EQ, convolution and per-app volume control through a root module and app. KernelSU needs a mounting metamodule. `FOSS` `[M]` `[K]`
- **[NLSound](https://github.com/Briclyaz/NLSound)** - Adjusts audio and microphone settings on Snapdragon devices. `FOSS` `[M]` `[A]`
- **[ViPER4Android FX Redesign](https://github.com/WSTxda/ViperFX-RE-Releases)** - Provides audio effects including equalizer and bass settings. `Proprietary` `[M]` `[A]`
