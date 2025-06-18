<div align="center" class="aar-intro">

# Android Root 終極指南

[![GitHub Repo stars](https://img.shields.io/github/stars/awesome-android-root/awesome-android-root?logo=github&style=for-the-badge&color=green)](https://github.com/awesome-android-root/awesome-android-root?ref=awesome-root.org)
[![Total Entries](https://img.shields.io/badge/Total%20Entries-215+-blue?style=for-the-badge&logo=android)](#root-apps)
[![Support via Open Collective](https://img.shields.io/badge/Support%20via-Open%20Collective-blue?style=for-the-badge&logo=opencollective)](https://opencollective.com/awesome-android-root-official)

</div>

**🚀釋放你的 Android 設備潛力！** 
這是你的終極社群策劃指南，幫助你獲取 Root 權限、自定義系統、提升效能，以及掌握所有與 Android Root 相關的知識。

**你將在其中找到：**

*   🌟 **頂級 Android 應用** 最好的應用程式，利用 Root 權限實現廣告攔截、精簡系統、系统調整等更多功能。
*   🧩 **必備 Magisk 模組** 探索一系列用於系統修改的優秀 Magisk 模組。
*   🔧 **熱門 LSPosed 模組** 深入了解允許控制和修改應用程式與系統行爲的模組。
*   📖 **深度 Root 教學** 按照逐步指南和故障排除方案，完成 Root 流程。
*   🛡️ **安全與防護** 學習安全 Root 和管理 Root 權限的最佳實踐
  

## 支持此專案
<div align="center" class="aar-intro">

[![成爲贊助者](https://img.shields.io/badge/💖-Become%20a%20Sponsor-ff69b4?style=for-the-badge)](https://opencollective.com/awesome-android-root-official)
[![GitHub 星標](https://img.shields.io/badge/⭐-Star%20this%20Repo-yellow?style=for-the-badge)](https://github.com/awesome-android-root/awesome-android-root?ref=awesome-root.org)
[![分享項目](https://img.shields.io/badge/📢-Share%20Project-green?style=for-the-badge)](https://github.com/awesome-android-root/awesome-android-root)

</div>

> **你的支持將使我們能夠** 持續更新此列表，持續更新此列表，收錄最新應用與模組 • 維護全面的文檔 • 改進專案基礎設施和工具 • 壯大開源的 Android Root 社群。
## 目錄
<details>
<summary>👉 點擊展開</summary>

- [什麼是 Root 權限](#什麼是-Root-權限)
- [Root 指南與解决方案](#Root-指南與解决方案)
- [詞彙表](#詞彙表)
- [Root 應用程式](#root-應用程式)
  - [廣告攔截](#廣告攔截)
  - [應用程式管理](#廣告攔截)
    - [應用程式隔離與克隆](#應用程式隔離與克隆)
    - [應用程式管理器](#應用程式管理器)
    - [應用程式商店](#應用程式商店)
    - [應用程式權限管理](#應用程式權限管理)
  - [應用程式修改](#應用程式修改)
    - [社交媒體類](#社交媒體類)
      - [嗶哩嗶哩](#嗶哩嗶哩)
      - [Discord](#discord)
      - [Duolingo 多鄰國](#Duolingo-多鄰國)
      - [Grindr](#grindr)
      - [Instagram](#instagram)
      - [Line](#line)
      - [QQ](#qq)
      - [Telegram](#telegram)
      - [WeChat](#wechat)
      - [WhatsApp](#whatsapp)
      - [X/Twitter](#xtwitter)
      - [Youtube, Spotify, Google 相冊](#youtube-spotify-google-相冊)
    - [其他](#其他)
    - [修補](#修補)
  - [音訊增強](#音訊增強)
  - [自動化](#自動化)
  - [備份與還原](#備份與還原)
  - [電池管理](#電池管理)
  - [清理類應用程式](#清理類應用程式)
  - [通訊工具](#通訊工具)
    - [通話錄音](#通話錄音)
    - [通訊錄](#通訊錄)
    - [訊息](#訊息)
  - [定製](#定製)
    - [啓動動畫](#啓動動畫)
    - [字體管理器](#字體管理器)
    - [啓動器](#啓動器)
    - [導航](#導航)
    - [系统客製化](#系统客製化)
      - [AOSP (Android
開放原始碼專案)](#aosp-android-開放原始碼專案)
      - [ColorOS (OPPO) 和 realme UI （真我）](#coloros-oppo-和-realme-ui-真我)
      - [通用](#通用)
      - [HyperOS (小米)](#hyperos-小米)
      - [One UI (三星)](#one-ui-三星)
      - [Onyx （文石）](#onyx-文石)
      - [Oxygen OS (一加)](#oxygen-os-一加)
    - [主體化](#主體化)
  - [精簡](#精簡)
  - [開發與除錯](#開發與除錯)
  - [設備控制與硬體](#設備控制與除錯)
  - [檔案管理](#檔案管理)
  - [內核管理](#內核管理)
  - [位置與 GPS](#位置和-gps)
  - [網絡工具](#網絡工具)
  - [NFC 工具](#nfc-工具)
  - [效能改進](#效能改進)
  - [隱私與安全](#隱私與安全)
  - [Revanced](#revanced)
  - [Root 專用](#root-專用)
    - [救磚保護](#救磚保護)
    - [隱藏 Root](#隱藏-root)
    - [管理器](#管理器)
  - [螢幕與顯示](#螢幕與顯示)
  - [系統修改](#系統修改)
  - [Termux](#termux)
  - [工具](#工具)
- [重要提示](#重要提示)
- [常見問題](#常見問題)
- [社群與資源](#社群與資源)
- [貢獻](#貢獻)
- [統計](#統計)
- [鳴謝](#鳴謝)

</details>

## 什麼是 Root 權限
Android Root 是指獲取對 Android 系統各種子系統的特權控制（稱為 Root 權限）的過程。

Root 允許克服營運商和硬體製造商對某些設備施加的限制，從而能夠更改或替換系統應用程式和設定，運行需要管理員級別權限的特殊應用程式，或執行其他普通 Android 用戶無法進行的操作。

## Root 指南與解決方案
一份涵蓋不同 Root 方法、決策和不同框架的綜合指南。

[閱讀完整的 Root 指南 ⭢](./docs/rooting-guides/index.md)


## 詞彙表
-  **`FOSS`** = 自由且開源軟體（Free and Open Source Software）
> 指原始碼公開的軟體。任何人都可以檢查、修改和分發軟體，從而促進透明度和社群協作。
-  **`Proprietary`** = 缺失許可證或閉源軟體
> 指的是未公開源代碼的軟體，此類別還可能包含授權條款不清晰或缺失的軟體。
-  **`[M]`** = Magisk 模組
> 代表一個專門為 Magisk 設計的附加元件，需要安裝並啟用 Magisk 框架才能在設備上運作。
-  **`[LSP]`** = 需要 LSPosed 框架
> 表示該應用程式或修改需要在裝置上安裝並啟用 LSPosed 框架才能正常運作。 

- _**應用程式在各類別中按字母順序排列。**_

## Root 應用程式
### 廣告攔截
- **[AdAway](https://adaway.org/)** - 使用 hosts 檔案的開源廣告攔截器。 `FOSS`
- **[AdClose](https://github.com/Xposed-Modules-Repo/com.close.hook.ads/)** - 阻止在應用程式中初始加載廣告 SDK，並攔截應用程式廣告請求以阻止廣告。 `Proprietary` `[LSP]`
- **[AdGuard](https://adguard.com/en/adguard-android/overview.html)** - 全面的廣告攔截解決方案。 `Proprietary`
- **[bindhosts](https://github.com/bindhosts/bindhosts)** - 無系統修改、完全獨立且可自我更新的 Apatch、KernelSU 和 Magisk hosts 模組。 `FOSS` `[M]`
- **[Blokada](https://blokada.org/)** - 具有 VPN 功能的進階廣告阻擋器。 `Proprietary`
- **[Cubic-AdBlock](https://github.com/Vaz15k/Cubic-AdBlock)** - 一個基於 hosts 檔的簡易廣告攔截模組。 `FOSS` `[M]`
- **[Re-Malwack](https://github.com/Magisk-Modules-Alt-Repo/Re-Malwack)** - 功能齊全的廣告攔截模組，滿足您的所有需求 ✨ `FOSS` `[M]`
- **[StevenBlock](https://github.com/mikropsoft/StevenBlock)** - 支援 Magisk、KernelSU 和 APatch 的 Android 廣告攔截模組。 `FOSS` `[M]`
- **[systemless-adblocker](https://github.com/Magisk-Modules-Alt-Repo/systemless-adblocker)** - 源自 gloeyisk/systemless-hosts 的終極廣告攔截模組。 `FOSS` `[M]`
- **[Systemless hosts KernelSU module](https://github.com/symbuzzer/systemless-hosts-KernelSU-module)** - 在 KernelSU 和 APatch 上使用 AdAway 等應用程式所需的模組。 `FOSS`

[↑ 返回頂部](#目錄)

### 應用程式管理
#### 應用程式管理與克隆
- **[Insular](https://gitlab.com/secure-system/Insular)** - 隔離你的「老大哥」應用程式。基於優秀的 Island 的分支。 `FOSS`
- **[Island](https://github.com/oasisfeng/island)** - 應用程式隔離與克隆。 `FOSS`
- **[Shelter](https://gitea.angry.im/PeterCxy/Shelter)** - 隔離並克隆應用程式。 `FOSS`

#### 應用程式管理器
- **[App Manager](https://github.com/MuntashirAkon/AppManager)** - 適用於 Android 的全功能包管理器和檢視器。 `FOSS`
- **[AppOps](https://appops.rikka.app/)** - 輕鬆控制隱藏的 AppOps。 `Proprietary`
- **[Hail 雹](https://github.com/aistra0528/Hail)** - 停用/隱藏/暫停/卸載 Android 應用程式。 `FOSS`
- **[Inure](https://github.com/Hamza417/Inure)** - 一款優雅且美觀的高端 Android 應用程式管理器，適用於已 root 和未 root 的裝置。 `FOSS`
- **[Let Me Downgrade](https://github.com/DavidBerdik/Let-Me-Downgrade)** - 添加對 Android 12 至 15 QPR1 上應用降級的支持。 `FOSS` `[LSP]`
- **[Package Manager](https://github.com/SmartPack/PackageManager)** - 一個極其強大的應用程式，用於管理安裝在 Android 設備上的系統應用程式與使用者應用程式。 `FOSS`
- **[Zygisk Detach](https://github.com/j-hc/zygisk-detach)** - 用於從 Play 商店分離已安裝的應用程式並掛接 binder 的 Zygisk 模組。 `FOSS` `[M]`

#### 應用程式商店
- **[Aurora Store](https://github.com/whyorean/AuroraStore)** - 一個支援客戶搜尋、查看應用程式詳情，並能直接下載 APK 檔到您裝置的第三方 Google Play Store。 `FOSS`
- **[Droid-ify](https://github.com/Droid-ify/client)** - 帶有 Material UI 的 F-Droid 用戶端，並使用 root 自動更新應用。 `FOSS`
- **[Neo Store](https://github.com/NeoApplications/Neo-Store)** - 具有現代 UI 和大量額外功能的 F-Droid 用戶端。 `FOSS`

#### 應用程式權限管理
- **[Net Switch](https://github.com/Rem01Gaming/net-switch)** - 一個可以隔離任何應用程式，使其無法上網的 Magisk 模組。 `FOSS` `[M]`
- **[Permission Ruler](https://play.google.com/store/apps/details?id=com.stefanosiano.permissionruler&hl=en)** - 在螢幕關閉時自動管理應用程式權限，以提升隱私。 `Proprietary` `[M]`
- **[PermissionManagerX](https://github.com/mirfatif/PermissionManagerX)** - 適用於 Android 的擴充權限管理器，用於檢視和設定清單權限和 AppOps。 `FOSS` `[M]`
- **[Thanox](https://apt.izzysoft.de/fdroid/index/apk/github.tornaco.android.thanos)** - 一個提供應用程式啟動管理、背景管理、權限管理等功能的系統管理工具 `FOSS` `[LSP]`

[↑ 返回頂部](#目錄)

### 應用程式修改

#### 社交媒體類
##### 嗶哩嗶哩
- **[MBGA](https://github.com/cledwynl/mbga/)** - 一個 Xposed 模組，讓 Bilibili 再次變得出色。  `FOSS` `[LSP]`

##### Discord
- **[BunnyXposed](https://github.com/bunny-mod/BunnyXposed)** - 一個用於注入 Bunny 的 Xposed 模組，這是 Discord 行動應用程式的模組。 `FOSS` `[M]`
- **[Revenge](https://github.com/revenge-mod/revenge-bundle-next)** - Discord Android 的客戶端修改程式。 `FOSS`

##### Duolingo 多鄰國
- **[Duolingo Regret](https://github.com/TigerBeanst/Duolingo-Regret)** - 將 Duolingo 的時區更改為任意時區，可以更輕鬆地返回並完成被遺忘的連勝。 `FOSS` `[LSP]`

##### Grindr
- **[Grindr Plus](https://github.com/R0rt1z2/GrindrPlus)** - 解鎖 Grindr 應用程式並為其添加獨特功能，增強用戶體驗。 `FOSS` `[LSP]` 
  
##### Instagram
- **[InstaEclipse](https://github.com/ReSo7200/InstaEclipse/)** - 為 Instagram 新增開發者選項、幽靈模式、無廣告瀏覽和免打擾模式等功能。 `FOSS` `[LSP]`
- **[InstaGhost](https://github.com/ricalnet/InstaGhost)** - 利用開發者選項、幽靈模式、免打擾模式等高級功能增強您的 Instagram 體驗。 `FOSS` `[LSP]`

##### Line
- **[LineXtra](https://github.com/yagiyuu/LineXtra)** - 移除 LINE 中的廣告和分頁標籤。 `FOSS` `[LSP]`
- **[LIME](https://github.com/Chipppppppppp/LIME)** - 這是一個用於清潔 LINE 的 Xposed 模組。 `FOSS` `[LSP]`

##### QQ
- **[NewQStory](https://github.com/Xposed-Modules-Repo/lin.xposed/)** - Xposed QQ 模組 `Proprietary` `[LSP]`
- **[QAuxiliary](https://github.com/cinit/QAuxiliary)** - 基於 QNotified 的 Xposed 模組 `FOSS` `[LSP]`

##### Telegram
- **[Re-Telegram](https://github.com/Sakion-Team/Re-Telegram/)** - 為各種 Telegram 客戶端添加了 反反轉發、反撤回、隱藏贊助性訊息、禁止切換頻道 等功能。 `FOSS` `[LSP]`
- **[Telegram Tweaks](https://github.com/Xposed-Modules-Repo/ru.mike.sidestories)** - 移除 Telegram 操作欄中的動態按鈕（+ 阻止取消靜音按鈕）。 `Proprietary` `[LSP]`
- **[Telegram Speed Hook](https://github.com/araafroyall/Telegram-Speed-Hook)** - 一個提高 Telegram 速度的 Xposed 模組。 `FOSS` `[LSP]`
- **[TeleVip](https://github.com/Xposed-Modules-Repo/com.my.televip/)** - 一個用於修改 Telegram 的模組，具有隱藏已讀狀態、解除頻道限制等功能。 `Proprietary` `[LSP]`
- **[TMoe](https://github.com/cinit/TMoe)** - 為各種 Telegram 用戶端添加各種調整。 `FOSS` `[LSP]`

##### 微信
- **[X](https://github.com/Xposed-Modules-Repo/cn.android.x)** - Add extra features to Wechat. `Proprietary` `[LSP]`
- **[WAuxiliary](https://github.com/HdShare/WAuxiliary_Public)** - 微信輔助 `Proprietary` `[LSP]`

##### Whatsapp
- **[WA Enhancer](https://github.com/Dev4Mod/WaEnhancer)** - 一個強化 WhatsApp 體驗的 Xposed 模組。 `FOSS` `[LSP]`
- **[Wa Revamp](https://github.com/Xposed-Modules-Repo/its.madruga.warevamp)** - 將各種功能如下載狀態、僅讀一次、隱藏已讀通知、狀態和已歸檔對話加入官方 WhatsApp。 `Proprietary` `[LSP]`

##### X/Twitter
- **[Hachidori](https://github.com/Xposed-Modules-Repo/com.twifucker.hachidori/)** - 將下載媒體、隱藏廣告及其他隱私功能添加到 X（原 Twitter）。 `Proprietary` `[LSP]`

##### Youtube、Spotify、Google 相冊
- **[RevancedXposed](https://github.com/chsbuffer/RevancedXposed)** - YouTube、Spotify 及 YouTube Music 阻擋廣告和背景播放，谷歌相冊無限備份 Xposed 模組。 `FOSS` `[LSP]`
- **[XposedPhotosFix](https://github.com/RevealedSoulEven/XposedPhotosFIX)** - 防止 Google 相冊應用程式將相機資料夾中的所有資料夾合併，並為每個資料夾建立獨立的相簿，適用於備份。 `[LSP]`

[↑ 返回頂部](#目錄)

#### 其他
- **[F*ck for VIP](https://github.com/Xposed-Modules-Repo/com.bug.hookvip)** - 一個用於解鎖某些軟體會員資格和刪除廣告的模組。查看 releases 以獲取支援的應用程式清單。 `Proprietary` `[LSP]`
- **[Keyboard GPT](https://github.com/Mino260806/KeyboardGPT)** - 讓你能在鍵盤上整合如 ChatGPT 等生成式 AI。 `FOSS` `[LSP]`
- **[Maps tweaks](https://github.com/Xposed-Modules-Repo/ru.mike.mapstweaks)** - Google 地圖、Yandex 地圖及 Yandex Navi 的地圖介面調整集合 `Proprietary` `[LSP]`
- **[NewHookVip](https://github.com/Xposed-Modules-Repo/top.hookvip.pro)** - 一個用於解鎖某些軟體會員資格和刪除廣告的 Xposed 模組。查看 releases 以獲取支援的應用程式清單。 `Proprietary` `[LSP]`
- **[Rboard Theme Manager](https://github.com/DerTyp7214/RboardThemeManagerV3)** - 一個可定製的 Google Gboard 管理器，允許使用者下載、應用和管理各種主題和聲音設置。 `FOSS` `[LSP]`
- **[Smule Mod](https://github.com/michei69/SmuleXposed)** - 一個 Smule Xposed 模組，提供免費 VIP 和許多其他功能。 `FOSS` `[LSP]`
- **[Wallet Tweaks](https://github.com/Xposed-Modules-Repo/ru.mike.wallettweaks/releases)** - Google Wallet 的 UI 調整。 `Proprietary` `[LSP]`
- **[Yandex Maps Patcher](https://github.com/Xposed-Modules-Repo/ru.bluecat.yandexmapspatcher)** - 隱藏 Yandex 地圖應用程式中的廣告和侵入性服務。 `Proprietary` `[LSP]`

#### 修補
- **[Lucky Patcher](https://www.luckypatchers.com/)** - 應用程式修補程式及修改器（請小心使用）。 `Proprietary`

[↑ 返回頂部](#目錄)

### 音訊增強
- **[Audio Misc Settings](https://github.com/Magisk-Modules-Alt-Repo/audio-misc-settings)** - 為設定雜項音頻配置值（媒體音量步長（100 步）、提高重採樣品質、停用效果框架等） `FOSS` `[M]`
- **[Audio jitter silencer](https://github.com/Magisk-Modules-Alt-Repo/audio-jitter-silencer)** - 為避免所有數位音頻輸出的失真，它會禁用音訊擾動生成器（關於電池耗電與優化，以及無線連接性）。 `FOSS` `[M]`
- **[Audio SampleRate Changer](https://github.com/Magisk-Modules-Alt-Repo/audio-samplerate-changer)** - 一個 Magisk 模組，在系統範圍內的混音器中變更音頻採樣率，以達到最佳 Hi-Fi 體驗。 `FOSS` `[M]`
- **[DisableAudioFocus](https://github.com/auag0/DisableAudioFocus)** - 允許您關閉音頻焦點，讓您能夠同時播放多個影片和音頻。 `FOSS` `[LSP]`
- **[Hi-Res Audio Enabler](https://github.com/reiryuki/Hi-Res-Audio-Enabler-Magisk-Module)** - 啟用高解析度 24 或 32 位寬度音頻輸出（若裝置支援）。 `FOSS` `[M]`
- **[NLSound](https://github.com/Briclyaz/NLSound_module_QCom)** - Magisk 模組，用於提高高通驍龍 SoC 設備中的音訊和麥克風品質。 `FOSS` `[M]`
- **[XAudioCapture](https://github.com/Xposed-Modules-Repo/io.github.wzhy.xaudiocapture)** - 讓您能夠捕捉您想要的任何音頻串流，跳過這些限制。 `Proprietary` `[LSP]`
- **[ViPER4Android FX Redesign](https://github.com/WSTxda/ViperFX-RE-Releases)** - 一款為使用者提供廣泛的可自定義聲音選項的音訊增強軟體。它允許通過提供均衡器設置、環繞聲效果、低音增強等功能來提高音訊品質。 `Proprietary` `[M]`


### 自動化
- **[Automate](https://play.google.com/store/apps/details?id=com.llamalab.automate)** - 允許您使用流程圖創建自定義自動化工作流，從而實現對任務、文件和設備設置的無縫管理。 `Proprietary`
- **[MacroDroid](https://play.google.com/store/search?q=macrodroid&c=apps)** - 易用的自動化應用程式。 `Proprietary`
- **[Tasker](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm)** - 一個進階且強大的自動化應用程式。 `Proprietary`

[↑ 返回頂部](#目錄)

### 備份與還原
- **[數據備份](https://github.com/XayahSuSuSu/Android-DataBackup)** - 適用於 Android 7.0+ 的資料備份。 `FOSS`
- **[DiskDigger](https://play.google.com/store/apps/details?id=com.defianttech.diskdigger)** - 適用於 Android 裝置的強力資料復原工具。 `Proprietary`
- **[Neo Backup](https://github.com/NeoApplications/Neo-Backup)** - 強大的開源備份解決方案。 `FOSS`
- **[Swift Backup](https://play.google.com/store/apps/details?id=org.swiftapps.swiftbackup)** - 現代化的備份解決方案，支援雲端儲存。 `Proprietary`

[↑ 返回頂部](#目錄)

### 電池管理
- **[AccA](https://github.com/MatteCarra/AccA)** - 進階充電控制器應用程式 `FOSS`
- **[Battery Guru](https://play.google.com/store/apps/details?id=com.paget96.batteryguru)** - 電池優化與監控。 `Proprietary`
- **[Xtreme-Battery-Saver](https://github.com/Magisk-Modules-Alt-Repo/Xtreme-Battery-Saver)** - 一個極致省電的 Magisk 模組，為希望大幅延長電池壽命的使用者設計。 `FOSS` `[M]`

[↑ 返回頂部](#目錄)

### 清理類應用程式
- **[Cleaner Royall](https://github.com/araafroyall/Cleaner-Royall)** - 一款輕量級但超快速且強大的 Android 清理工具。 `FOSS` `[LSP]`
- **[清濁](https://www.dircleaner.com/)** - 一個簡單實用的清潔工具。 `Proprietary`
- **[SD 女僕 2/SE](https://github.com/d4rken-org/sdmaid-se)** - 一個專門用於維護的 Android 文件管理工具。其核心目的是釋放空間並刪除不需要的數據。 `FOSS`

[↑ 返回頂部](#目錄)

### 通訊工具
#### 通話錄音
- **[Basic Call Recorder](https://github.com/chenxiaolong/BCR)** - 適用於已 root 的 Android 裝置的基本通話記錄器。 `FOSS`
- **[Call Recorder - SKVALEX](https://github.com/Magisk-Modules-Repo/callrecorder-skvalex)** - 利用 root 和 magisk 的權限從線路上記錄雙方通話的通話錄音應用程式。 `FOSS` `[M]`
- **[Call Recording Google Dialer](https://modules.lsposed.org/module/io.github.vvb2060.callrecording)** - 允許所有地區使用 Google 電話的通話錄音功能，且不發出通知聲音。 `[LSP]`

#### 通訊錄
- **[Contacts Sync](https://play.google.com/store/apps/details?id=com.lb.contacts_sync)** - 使用 root 權限同步你的聯絡人簿，並與 WhatsApp 取得高品質的聯絡人照片。 `Proprietary`

#### 訊息
- **[NekoSMS](https://github.com/apsun/NekoSMS)** - 基於模式的 Android 簡訊攔截器。 `FOSS` `[LSP]`

[↑ 返回頂部](#目錄)

### 定製
#### 啓動動畫
- **[Bootanimation](https://github.com/Bitterneko/Bootanimation)** - Android 自訂開機動畫。 `FOSS`
- **[Live Boot](https://play.google.com/store/apps/details?id=eu.chainfire.liveboot)** - 在 Android 上獲得類似 Linux 的即時啟動畫面。 `Proprietary`
- **[video-to-bootanimation](https://github.com/Magisk-Modules-Alt-Repo/video-to-bootanimation)** - 一個可以將影片設定為 Android 裝置開機動畫的 Magisk 模組。 `FOSS` `[M]`

#### 字體管理器
- **[Font Manager](https://play.google.com/store/apps/details?id=com.androidacy.fontmanager)** - 一款出色的字體與表情符更換工具，由 Androidacy 提供。 `Proprietary`
- **[Magisk-iOS-Emoji](https://github.com/Keinta15/Magisk-iOS-Emoji)** - 無系統修改地以 iOS 表情符號取代了系統表情符號。 `FOSS` `[M]`

#### 啓動器
- **[Pixel Launcher Enhanced](https://github.com/Mahmud0808/PixelLauncherEnhanced)** - 一個設計用於解鎖多種令人興奮功能的 Xposed 模組，包括自定義外觀、增加更多功能等。 `FOSS` `[LSP]`
- **[Pixel Launcher Mods](https://github.com/KieronQuinn/PixelLauncherMods)** - 增強 Pixel Launcher 使用體驗的模組。 `FOSS`
- **[Lawnchair](https://github.com/Goooler/LawnchairRelease)** - 提供類 Pixel 體驗的可定製啓動器。 `FOSS`
- **[NovaInstaller](https://github.com/Minionguyjpro/NovaInstaller)** - 在 Android 上將 Nova Launcher 安裝到 /system/app/。 `FOSS`
  
#### 導航
- **[NavTweaks](https://github.com/Magisk-Modules-Alt-Repo/HideNavBar)** - 用於 Android 10-14 的全螢幕/沉浸式手勢調整。 `FOSS` `[M]`
- **[Volume Key Track Control Module](https://github.com/Hepolise/VolumeKeyTrackControlModule)** - 一個允許使用音量鍵跳過和播放/暫停曲目的 Xposed 模組。 `FOSS` `[LSP]`

#### 系統客製化
##### AOSP (Android 開放原始碼專案)
- **[PixelUpdater](https://github.com/PixelUpdater/PixelUpdater)** - Pixel Updater 是一款用於從 Google 的 OTA 伺服器安裝 Android A/B OTA 更新的應用程式。 `FOSS` `[M]`
- **[PixelXpert](https://github.com/siavash79/PixelXpert)** - 一個混合的 Xposed+Magisk 模組，用於允許進行 AOSP 原設計中未提供的客製化。 `FOSS` `[M]` `[LSP]`

##### ColorOS (OPPO) 和 realme UI （真我）
- **[ColorOS 通知圖標增強](https://github.com/fankes/ColorOSNotifyIcon)** - 針對 ColorOS 優化通知圖標，適配原生通知圖標規範。 `FOSS` `[LSP]`
- **[LuckyTool](https://github.com/Xposed-Modules-Repo/com.luckyzyx.luckytool/blob/main/README_EN.md)** - 為 ColorOS 擴展和優化的 Xposed 模組。 `Proprietary` `[LSP]`

##### 通用
- **[Disable Target API Block](https://github.com/buttercookie42/DisableTargetAPIBlock)** - 用於停用 Android 14 對舊應用程式安裝阻止的 Xposed 模組。 `FOSS` `[LSP]`
- **[SystemUI Tuner](https://github.com/zacharee/Tweaker)** - 檢視並修改 Android 設備的隱藏設定。 `FOSS` `[M]`

##### HyperOS (小米)
- **[ClipboardList](https://github.com/HChenX/ClipboardList)** - 取消剪貼簿和短語功能的 20 項限制和時間限制。僅適用於 MIUI 和 HyperOS。 `FOSS` `[LSP]`
- **[GreenDotHide](https://github.com/Dorian399/GreenDotHide)** - 隱藏表示敏感權限使用的綠點。僅在 MIUI/HyperOS 上有效。 `FOSS` `[LSP]`
- **[HyperCeiler](https://github.com/ReChronoRain/HyperCeiler/blob/main/README_en-US.md)** - 針對 HyperOS 的廣泛定製。 `FOSS` `[LSP]`
- **[Hyper Helper](https://github.com/HowieHChen/XiaomiHelper)** - HyperOS 專用的輕量級自訂模組。 `FOSS` `[LSP]`
- **[HyperStar](https://github.com/YunZiA)** - 一個 LSPosed 模組，主要用於自定義小米 HyperOS 控制中心以及一些功能。 `FOSS` `[LSP]` 
- **[MIUIqol](https://github.com/Xposed-Modules-Repo/io.github.chsbuffer.miuihelper)** - 提升我對 MIUI 12 至 14 及 HyperOS 的使用體驗。 `Proprietary` `[LSP]`
- **[Pengeek](https://github.com/monwf/customiuizer)** - 根據自己的喜好自定義 HyperOS。適用於基於 Android 14 的 HyperOS。 `FOSS` `[LSP]`
  
##### One UI (三星)
- **[KnoxPatch](https://github.com/salvogiangri/KnoxPatch)** - 讓 Samsung 的應用程式/功能在您的已 root 的 Galaxy 裝置上恢復運作。為了更好的體驗，請也閱讀 [此內容](https://github.com/salvogiangri/KnoxPatch) . `FOSS` `[LSP]`

##### Onyx （文石）
- **[OnyxTweaks](https://github.com/timschneeb/OnyxTweaks)** - 適用於搭載 Android 12 的文石 Boox 電子墨水屏設備的 Xposed 模組。它將其他修改添加到系統 UI，Android 框架和 Onyx 啓動器中。 `FOSS` `[LSP]`
  
##### Oxygen OS (一加)
- **[Enable local installation for OPlus OTA updates](https://github.com/Houvven/OLocalnstall)** - 啟用歐加設備 OTA 更新之本地安裝功能。 `Proprietary` `[LSP]`
- **[OnePlusPlusLauncher](https://github.com/wizpizz/OnePlusPlusLauncher)** - 用於一加 OxygenOS 15 上系統啟動器的 XPosed 模組，提供額外的有用功能。 `FOSS` `[LSP]`
- **[Oxygen-Customizer](https://github.com/DHD2280/Oxygen-Customizer/)** - 開源 Oxygen OS 自訂化應用程式。 `FOSS` `[LSP]`


#### 主體化
- **[ColorBlendr](https://github.com/Mahmud0808/ColorBlendr)** - 自訂裝置的 Material You 颜色。 `FOSS`
- **[Global Icon Pack](https://github.com/RichardLuo0/global-icon-pack-android)** - 適用於全域應用圖示包的 Xposed 模組。 `FOSS` `[LSP]`
- **[Iconify](https://github.com/Mahmud0808/Iconify)** - 輕鬆自訂您的 Android 12+ 裝置。 `FOSS` `[M]` `[LSP]`
- **[Project Themer](https://play.google.com/store/apps/details?id=com.drsants.eggproject)** - 提供針對已 root 設備的工具和功能。 `Proprietary` `[M]`

[↑ 返回頂部](#目錄)


### 精簡
- **[Canta](https://github.com/samolego/Canta)** -  在沒有 root 權限的情況下使用 Shizuku 卸載任何應用程式。 (需要安裝並運行 [Shizuku](https://shizuku.rikka.app/) ). `FOSS`
- **[De-Bloater](https://github.com/sunilpaulmathew/De-Bloater)** - 使用 Magisk 之力來清空不想要的系統應用程式之應用程式。 `FOSS`

[↑ 返回頂部](#目錄)

### 開發與除錯
- **[IAmNotADeveloper](https://github.com/xfqwdsj/IAmNotADeveloper)** - 一個隱藏 Android 開發者相關開關狀態的 Xposed 模組。 `FOSS` `[LSP]`
- **[LADB](https://github.com/tytydraco/LADB)** - 本地 ADB 終端機. `FOSS` - [Free Build](https://github.com/hyperio546/ladb-builds)
- **[Shizuku](https://github.com/RikkaApps/Shizuku)** - 讓你的應用程式直接使用系統 API。 `FOSS`
- **[Termux](https://termux.com/)** - 進階終端仿真器和 Linux 環境。 `FOSS` - **[更多關於 Termux](#termux)**
- **[Wireless ADB Switch](https://github.com/Smooth-E/wireless-adb-switch)** - 快速啟用或停用 Android 的無線調試功能。包含小工具和快速設定圖塊，方便使用。 `FOSS`

[↑ 返回頂部](#目錄)

### 設備控制與硬體
- **[OnePlus Flash Control](https://github.com/Bartixxx32/Opflashcontrol-app)** - 精確控制一加設備的雙色調和四色調 LED 閃光燈的亮度。 `FOSS`
- **[Root Activity Launcher](https://play.google.com/store/apps/details?id=tk.zwander.rootactivitylauncher)** - 直接從您的主屏幕以 root 權限啟動活動。 `Proprietary`
- **[SecondScreen](https://github.com/farmerbb/SecondScreen)** - 連接您的 Android 裝置到外部顯示器的進階解決方案。 `FOSS`
- **[SensorsOff](https://github.com/theLlamaNet/SensorsOff)** - 在 MIUI/HyperOS 上啟用或禁用隱私傳感器（攝像頭和麥克風）的簡易應用程式。 `Proprietary`
- **[USB HID Client](https://github.com/Arian04/android-hid-client)** - 使用手機作為鍵盤和滑鼠 **無需** 在另一端安裝任何軟體。 `FOSS`
- **[JoyCon Droid](https://joycondroid.gitbook.io/joycondroid)** - 讓您的 Android 裝置成為 Nintendo Switch 的控制器。 `FOSS`


### 檔案管理
- **[質感文件](https://github.com/zhanghai/MaterialFiles)** - 具有 root 功能的現代檔案管理器 `FOSS`
- **[MiXplorer](https://mixplorer.com/)** - 功能豐富的檔案管理器。 `Proprietary`
- **[MT 管理器](https://mt2.cn/)** - Android 檔案管理與逆向工程工具 `Proprietary`
- **[Root Explorer](https://play.google.com/store/apps/details?id=com.speedsoftware.rootexplorer)** - 具有 root 功能的檔案管理器 `Proprietary`
- **[Solid Explorer](https://play.google.com/store/apps/details?id=pl.solidexplorer2)** - 具有 root 功能的強大檔案管理器 `Proprietary`
- **[Total Commander](https://play.google.com/store/apps/details?id=com.ghisler.android.TotalCommander)** - 功能豐富的 Android 文件管理器，支持 root 和 shizuku。要獲得更好的體驗，請閱讀 [這裡](https://www.ghisler.ch/board/viewforum.php?f=22). `Proprietary`
- **[Xplore File Manager](https://play.google.com/store/apps/details?id=com.lonelycatgames.Xplore)** - 具有 root 支持的檔案管理器 `Proprietary` 

[↑ 返回頂部](#目錄)


### 內核管理
- **[EX Kernel Manager](https://play.google.com/store/apps/details?id=flar2.exkernelmanager)** - 用來備份和刷寫内核、調整色彩、音效、動作及其他內核設定的 root 工具。 `Proprietary`
- **[Franco Kernel Manager](https://play.google.com/store/apps/details?id=com.franco.kernel)** - 一個適用於所有裝置的完整工具箱，擁有豐富的介面，結合了您管理、調校和強化裝置所需的一切。 `Proprietary`
- **[Kernel Flasher](https://github.com/capntrips/KernelFlasher)** - 一個可用来刷写（AK3 檔案）、備份和恢復內核的 Android 應用程式。 `FOSS`
- **[SmartPack-Kernel-Manager](https://github.com/SmartPack/SmartPack-Kernel-Manager)** - 一個內核管理器 `FOSS`

[↑ 返回頂部](#目錄)

### 位置和 GPS
- **[GPS Setter](https://github.com/Xposed-Modules-Repo/com.android1500.gpssetter)** - 允許為任何特定應用程式或整個系統模擬位置。 `[LSP]`
- **[Location Indicator Whitelist](https://github.com/gilbsgilbs/LocationIndicatorWhitelist)** - 防止應用程式在 Android 12+上濫用令人煩擾的位置通知點。 `FOSS` `[LSP]`
- **[Hide Mock Location](https://github.com/auag0/HideMockLocation)** - 用於隱藏模擬位置設定的 Xposed 模組。 `FOSS` `[LSP]`
- **[XposedFakeLocation](https://github.com/noobexon1/XposedFakeLocation)** - 讓您可以在全域範圍或特定應用程式中偽造裝置的位置，而不必使用開發者選項中的「模擬位置」。 `FOSS` `[LSP]`

[↑ 返回頂部](#目錄)

### 網絡工具
- **[MACsposed](https://github.com/DavidBerdik/MACsposed)** - 為 Android 12 到 15 添加了對 MAC 位址欺騙的支援。 `FOSS` `[LSP]`
- **[Magisk-WiFiADB](https://github.com/mrh929/magisk-wifiadb)** - 一個用以自動啟用無線 ADB 功能的 Magisk 模組。 `FOSS` `[M]`
- **[personalDNSfilter](https://github.com/IngoZenz/personaldnsfilter)** - 一個 DNS 過濾器代理，提供廣告、惡意軟體和跟蹤伺服器的本地過濾，支持 DOH 和 DOT 等安全 DNS 協議，以增強隱私。 `FOSS`
- **[TTLChanger](https://github.com/aleksey-saenko/TTLChanger)** - 允許您修改預設的 TTL（存活性時間）值。 `FOSS`
- **[VPN Hotspot](https://github.com/Mygod/VPNHotspot)** -  通過熱點或中繼器共享您的 VPN 連接。 `FOSS`
- **[SimbaDroid](https://github.com/buttercookie42/SimbaDroid)** - Android 用的簡單 SMB 文件伺服器。 `FOSS`
- **[Unlimited Hotspot](https://github.com/felikcat/unlimited-hotspot)** - 取消對熱點網際網路的速度限制，並允許任何方案的熱點。 `FOSS` `[M]`
- **[WiFi Password Viewer for MMRL](https://github.com/Googlers-Repo/wpd)** - 用於 MMRL 的 WiFi 密碼檢視器。 `FOSS`

[↑ 返回頂部](#目錄)


### NFC 工具
- **[NFC Card Emulator Pro (Root)](https://play.google.com/store/apps/details?id=com.yuanwofei.cardemulator.pro)** - 一張可模擬各種類型卡片的 NFC 卡片模擬器，例如：門禁卡、電梯卡、工廠（餐卡）、學校（餐卡）、某些圖書館卡片以及其他 IC 卡片。 `Proprietary`
- **[NfcScreenOff](https://github.com/Jon8RFC/NfcScreenOff)** - 螢幕關閉時讀取 NFC 標籤，並禁用 NFC 標籤音效。 `FOSS` `[M]`

[↑ 返回頂部](#目錄)


### 效能改進
- **[3C All-in-One Toolbox](https://play.google.com/store/apps/details?id=ccc71.at.free)** - 一個全面的實用程式，提供了一個用戶友好的界面，用於監視，控制和優化設備性能的各種工具。 `Proprietary`
- **[Bye Blur](https://github.com/Magisk-Modules-Alt-Repo/Bye-Blur)** - 關閉模糊效果，這可通過捨棄此複雜的視覺效果來提高效能。 `FOSS` `[M]`
- **[Dynamic System Tweaks Magisk Module](https://github.com/PS2ClassicsVault/Dynamic-System-Tweaks-Magisk-Module)** - 提高 armeabi-v7a 設備的整體系統性能，且不會過熱和損失電池電量。 `FOSS` `[M]`
- **[Encore Tweaks](https://github.com/Rem01Gaming/encore)** - 提升遊戲時的裝置性能，同時優化正常使用時的電池續航能力。 `Proprietary` `[M]`
- **[GameResChange](https://github.com/Xposed-Modules-Repo/com.game.reschange)** - 在 Android 13+ 上變更任何應用程式/遊戲的解析度。 `Proprietary` `[LSP]`
- **[Hydrostellaire](https://github.com/AestasBritannia/Hydro-Br-leur)** - 適用於天璣旗艦平台及一加、真我裝置的 Magisk 模組。 `FOSS` `[M]`
- **[Uperf-Game-Turbo](https://github.com/yinwanxi/Uperf-Game-Turbo)** -  Android 用的用戶空間效能控制器 `FOSS` `[M]`

[↑ 返回頂部](#目錄)


### 隱私與安全
- **[AFWall+](https://github.com/ukanth/afwall)** - 基於 iptables 的防火牆。 `FOSS`
- **[AlternativeUnlockXposed](https://github.com/leohearts/AlternativeUnlockXposed)** - 使用替代 PIN 碼解鎖您的 Android 手機。 `FOSS` `[LSP]`
- **[Amarok](https://github.com/deltazefiro/Amarok-Hider)** - 一個讓您只需點擊一下就能隱藏私人檔案與應用程式的 Android 應用程式。 `FOSS`
- **[Fyrypt](https://github.com/mirfatif/Fyrypt)** - 一個具有 UID + PID 規則的 Android 防火牆，dnscrypt-proxy 管理，以及單獨應用程序的實時網絡監控。 `Proprietary`
- **[XPL-EX](https://github.com/0bbedCode/XPL-EX)** - 適用於 Android 6.0 Marshmallow 及更高版本的非常簡單易用的隱私管理器。 `FOSS` `[LSP]`

[↑ 返回頂部](#目錄)

### Revanced
- **[Awesome ReVanced](https://github.com/Jman-Github/Awesome-ReVanced)** - 一個精選的 ReVanced 补丁、資源和專案清單。 `FOSS`
- **[Privacy ReVanced Patches](https://github.com/jkennethcarino/privacy-revanced-patches)** - ReVanced 的隱私補丁，用以關閉廣告、追蹤器和分析資料，並始終在隱私模式下開啟 Gboard，以及其他更多功能。 `FOSS`
- **[Revanced Manager](https://github.com/ReVanced/revanced-manager)** - 修改 YouTube、YouTube Music、Spotify 等多個應用程式，並加入更多功能。 `FOSS`

[↑ 返回頂部](#目錄)

### Root 專用
#### 救磚保護
- **[Anti bootloop](https://github.com/Magisk-Modules-Alt-Repo/abootloop)** - 一個防止啟動迴圈的 Magisk 模組。 `FOSS` `[M]`
- **[YetAnotherBootloopProtector](https://github.com/Magisk-Modules-Alt-Repo/YetAnotherBootloopProtector)** - 一個用於監控和修復潛在的啓動迴圈和系統 UI 故障的 Magisk 模組。 `FOSS` `[M]`

#### 隱藏 Root
> [TheUnrealZaka 的隱藏 root 指南](https://gist.github.com/TheUnrealZaka/042040a1700ad869d54e781507a9ba4f)
- **[隱藏應用列表](https://github.com/Dr-TSNG/Hide-My-Applist)** - 一個用於攔截應用程式列表檢測的 Xposed 模組。[修改版分支](https://github.com/pumPCin/HMAL) `FOSS` `[LSP]`
- **[Integrity-Box](https://github.com/MeowDump/Integrity-Box)** - 開放源碼的 Keybox 更新工具，具有多項实用功能。 `FOSS` `[M]`
- **[MagiskDetection](https://github.com/apkunpacker/MagiskDetection)** - 收集一些公開可用的 POC 應用程式來檢測 Root/Magisk 的存在。 `FOSS` `Proprietary`
- **[NoHello](https://github.com/MhmRdd/NoHello)** -  一個隱藏 root 的 Zygisk 模組。 `FOSS` `[M]`
- **[PlaycurlNEXT](https://github.com/daboynb/playcurlNEXT)** - 修復 Play Integrity（和 SafetyNet）判定，允許自定義欄位和 prop。 `FOSS` `[M]`
- **[Play Integrity Fork](https://github.com/osm0sis/PlayIntegrityFork)** - PIF 的一個分支，使用 Play Integrity API 修復 Android <13「deviceValidationVerdict」的「MEETS_DEVICE_INTEGRITY」。 `FOSS` `[M]`
- **[ReZygisk](https://github.com/PerformanC/ReZygisk)** - 一個獨立和開源的 Zygisk 實現，為 KernelSU 提供 Zygisk API 支持，並取代 Magisk 的內置 Zygisk。 `FOSS` `[M]`
- **[Sensitive_Props Mod](https://github.com/Pixel-Props/sensitive-props)** - 通過修改系統屬性和應用特定於設備的修復程式，幫助您在已 root 的 Android 設備上繞過 SafetyNet 和 Play Integrity。 `FOSS` `[M]`
- **[Shamiko](https://github.com/LSPosed/LSPosed.github.io/releases)** - 隱藏 Magisk. `Proprietary` `[M]`
- **[TrickyStore](https://github.com/5ec1cff/TrickyStore)** - 修改為 Android 密鑰認證生成的證書鏈。 `Proprietary` `[M]`
- **[Tricky Addon](https://github.com/KOWX712/Tricky-Addon-Update-Target-List)** - 帶有 webUI 的 Tricky Store 的插件，允許為特定應用程式設定密鑰箱。 `Proprietary` `[M]`
- **[Tricky Addon - Update Target List](https://github.com/KOWX712/Tricky-Addon-Update-Target-List)** - KSU WebUI 用於配置 Tricky Store target.txt。 `FOSS` `[M]`
- **[Zygisk-Assistant](https://github.com/snake-4/Zygisk-Assistant)** - 一個用來隱藏 root 權限的 Zygisk 模組，適用於 KernelSU、Magisk 和 APatch。 `FOSS` `[M]`
- **[Zygisk Next](https://github.com/Dr-TSNG/ZygiskNext)**  - Zygisk 的獨立實現，為 KernelSU 提供 Zygisk API 支持，並取代 Magisk 的內置 Zygisk。 `Proprietary` `[M]`

**:提示:** 隱藏 root 是一個不斷的貓捉老鼠的遊戲。這些方法可能會隨著 Google Play 服務或特定應用的更新而中斷。

隱藏 root 後，您可以通過 root 檢測應用程式檢查隱藏是否有效，請參見 [rushiranpise/detection](https://github.com/rushiranpise/detection).

#### 管理器
- **[APatch](https://github.com/bmax121/APatch)** - Android 內核和 Android 系統的修補。 `FOSS`
- **[Magisk Manager](https://github.com/topjohnwu/Magisk)** - 管理 Magisk 模組與 root 權限。 `FOSS`
- **[MMRL](https://github.com/DerGoogler/MMRL)** - 一個幫助管理你自己的模組庫的 Android 應用程式。 `FOSS`
- **[KernelSU](https://github.com/tiann/KernelSU)** - 一個基於內核的 Android root 解決方案。 `FOSS`

[↑ 返回頂部](#目錄)

### 螢幕與顯示
- **[AlwaysOn](https://github.com/Domi04151309/AlwaysOn)** - 新增持續顯示功能，並提供多種自定義選項，包括錶面、行為和背景設定。 `FOSS` `[LSP]`
- **[CaptureSposed](https://github.com/99keshav99/CaptureSposed)** - 一個可有效禁用 Android 14 中新引入的屏幕截圖檢測 API 的 Xposed 模組。 `FOSS` `[LSP]`
- **[Disable Rotation Button](https://github.com/JavaCakeGames/disable-rotation-button)** - 一個可以關閉 Android 浮動旋轉按鈕的應用程式。 `FOSS`
- **[Enable Screenshot](https://github.com/LSPosed/DisableFlagSecure)** - 在通常不允許的應用程式中啟用屏幕截圖，並禁用屏幕截圖（Android 14+）和屏幕記錄（Android 15+）檢測。 `FOSS` `[LSP]`
- **[Flag Secure Patcher](https://github.com/j-hc/FlagSecurePatcher)** - 一個用於在設備上修補 service.jar 以禁用安全鎖和屏幕截圖監聽器的 Magisk 模組。 `FOSS` `[M]`
- **[Pointer Replacer](https://github.com/thesandipv/pointer_replacer)** - 替換用戶觸控螢幕時出現的點[要求在開發人員選項中啟用『顯示觸控回應』]。 `FOSS` `[LSP]`

[↑ 返回頂部](#目錄)

### 系统修改
- **[AnyWebView](https://github.com/neoblackxt/AnyWebView)** - 嘗試檢測所有系統 WebView 並將其添加到開發人員選項 -> WebView 實作列表中。 `FOSS` `[LSP]`
- **[AutoNight](https://github.com/Chilly-Blaze/autonight)** - 透過環境亮度控制 Android 的深色模式。 `FOSS`
- **[BetterKnownInstalled](https://github.com/Pixel-Props/BetterKnownInstalled)** - 一個用來修復 DroidGuard UNKNOWN_BASED 問題的補丁程式包。 `FOSS` `[LSP]`
- **[CorePatch](https://github.com/LSPosed/CorePatch)** - 爲 Android 禁用簽名驗證。 `FOSS` `[LSP]`
- **[Device Info HW](https://play.google.com/store/apps/details?id=ru.andr7e.deviceinfohw)** - 適用於 Android 裝置的硬體和軟體資訊應用程式。 `Proprietary`
- **[Infamick Script](https://github.com/Infamousmick/Infamick-script/)** - 一個可輕鬆訪問各種系統信息和設置的功能強大的系統實用程式腳本。 `FOSS` `[M]`
- **[Open WebView](https://github.com/Magisk-Modules-Alt-Repo/open_webview)** - 幫助您通過 Magisk 替換您的系統 Webview。 `FOSS` `[M]`
- **[System Tools Android](https://play.google.com/store/apps/details?id=com.redhome.sta)** - 一個真正的實用處理器，包含許多小型實用工具，以便更細緻地操作系統（包括 root 實用工具）。 `Proprietary`
- **[Universal GMS Doze](https://github.com/gloeyisk/universal-gms-doze)** - 修補 Google Play 服務應用程式和某些進程/服務，以便能夠使用電池優化。 `FOSS` `[M]`
- **[XSpoofSignatures](https://github.com/rushiiMachine/XSpoofSignatures)** - 一個用來欺騙軟體包簽名的 Xposed 模塊。 `FOSS` `[LSP]`

[↑ 返回頂部](#目錄)


### Termux
- **[Termux](https://github.com/termux/termux-app)** - Android 作業系統上的終端機模擬器應用程式，可透過多種套件擴展。 `FOSS`
- **[Termux:API](https://github.com/termux/termux-api)** - Termux 擴展應用程式，將設備功能以 API 形式暴露給命令行程序。 `FOSS`
- **[Termux:Boot](https://github.com/termux/termux-boot)** - 於裝置啟動時執行腳本。 `FOSS`
- **[Termux:Float](https://github.com/termux/termux-float)** - 在浮動視窗中運行 Termux。 `FOSS`
- **[Termux:Styling](https://github.com/termux/termux-styling)** - 一個 Termux 附加應用程式，用於自定義終端字體和顏色主題。 `FOSS`
- **[Termux:Tasker](https://github.com/termux/termux-tasker)** - 用於與 [Tasker](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm) 集成的 Termux 附加應用程式. `FOSS`
- **[Termux:Widget](https://github.com/termux/termux-widget)** - Termux 附加應用程式，可在主屏幕上添加命令的快捷方式。 `FOSS`

[↑ 返回頂部](#目錄)


### 工具
- **[Pi-hole-for-Android](https://github.com/DesktopECHO/Pi-hole-for-Android)** -  Pi-hole/Unbound Raspbian APK 安裝程式（適用於 Android 5.0 及以上版本裝置） `FOSS`
- **[UotanToolbox NT](https://github.com/Uotan-Dev/UotanToolboxNT)** - 極客的現代工具箱 `FOSS`
- **[XposedModulets](https://github.com/binarynoise/XposedModulets)** - 許多小而有用的 Xposed 模塊的集合。 `FOSS` `[LSP]`

[↑ 返回頂部](#目錄)

## 重要提示

:警告: **警告：謹慎行事**
Root 應用程式擁有從根本上改變您的 Android 系統的能力。不正確的使用可能會導致嚴重的問題，包括數據丟失，系統不穩定，並使您的設備無法使用（磚化）。

### 重要考量：

*   :提示: **系統修改風險：** 
這些應用程式可以修改核心系統檔案，可能會導致開機迴圈、崩潰或其他功能失常。
*   :警告: **資料損失風險：** 錯誤或不兼容的修改可能會導致您的個人數據丟失。* 在使用 root 應用程式之前，請務必備份設備。*
*   :鎖定: **安全影響：** 授予 root 權限可能會增加您的裝置對惡意軟體和其他安全威脅的易受攻擊性。
*   :信息來源: **社區來源的信息** 此列表是社區建議的集合。我們不保證每個應用程式的安全性、功能性或適用性。
*   :備忘: **用戶責任：** 您對使用這些應用程式所產生的任何後果承擔全部責任。使用它們需自行承擔風險。
*   :注意: **推薦：** 在安裝之前徹底研究任何 root 應用程式，並了解其目的和潛在的副作用。

[↑ 返回頂部](#目錄)

## 常見問題

常見 Root 問題的快速解答：

### Root 經典問題
- [什麼是 Android root？](./docs/faqs.md#what-is-root)
- [root 是安全嗎?](./docs/faqs.md#is-rooting-safe)
- [我會失去保修嗎？](./docs/faqs.md#will-rooting-void-my-warranty)

### 疑难排解
- [SafetyNet/Play Integrity issues](./docs/faqs.md#how-do-i-fix-safetynet-play-integrity-issues)
- [Bootloop recovery](./docs/faqs.md#my-device-is-stuck-in-a-boot-loop-after-rooting-what-can-i-do)

[View all FAQs →](./docs/faqs.md)

[↑ 返回頂部](#目錄)

## 社群與資源

### 可用鏈接
- **[XDA Developers](https://forum.xda-developers.com/)** - Android 開發者最大社群。
- **[Reddit - r/Android](https://www.reddit.com/r/Android/)** - Android 一般討論。
- **[Reddit - r/Magisk](https://www.reddit.com/r/Magisk/)** - Magisk 特定社區
-  **[Reddit - r/AwesomeAndroidRoot](https://www.reddit.com/r/awesomeandroidroot)** - Awesome Android Root 社區.

### 尋求幫助
- 先去搜尋存在的 [GitHub Issues](https://github.com/awesome-android-root/awesome-android-root/issues) .
- 加入我們的 [討論區](https://github.com/awesome-android-root/awesome-android-root/discussions) 參與問答交流
- 對於常見問題查看 [FAQ 小節](./docs/faqs.md) 
- 訪問 XDA 論壇或俄文論壇 [4PDA](https://4pda.to/devdb) 以獲取特定設備的幫助。

[↑ 返回頂部](#目錄)

## 貢獻

### 幫助我們成長
-  **給這個倉庫加星標** 如果它有幫助到你。
-  **分享** 與 Android 愛好者一同。
-  **報告問題** 壞連結或過時的應用程式。
-  **提建議** 新應用程式通過 [issues](https://github.com/awesome-android-root/awesome-android-root/issues).

[閱讀貢獻指南 →](./docs/contributing.md)

[↑ 返回頂部](#目錄)

## 統計

### 倉庫統計

| ![Total Entries](https://img.shields.io/badge/Total%20Entries-215-brightgreen?style=for-the-badge&logo=android)<br>**總條目數** | ![Root Apps](https://img.shields.io/badge/Root%20Apps-92-blue?style=for-the-badge&logo=android)<br>**Root 應用程式** |
|:---:|:---:|
| ![Magisk Modules](https://img.shields.io/badge/Magisk%20Modules-53-orange?style=for-the-badge&logo=magisk)<br>**Magisk 模組** | ![LSPosed Modules](https://img.shields.io/badge/LSPosed%20Modules-70-purple?style=for-the-badge&logo=xposed)<br>**LSPosed 模組** |

### 訪客計數器

![Visitor Count](https://profile-counter.glitch.me/awesome-android-root/count.svg)

[↑ 返回頂部](#目錄)

## 鳴謝

- **貢獻者們** - 所有提交應用程式、修正和改進的人。
- **社群** - XDA Developers, Reddit 社區, and GitHub 用戶們.
- **開發者** - 所有有才華的開發人員創造了這些驚人的 root 工具。
- **贊助者們** - 我們 Open Collective 的支持者們讓這個專案繼續保持活力。

---

<div align="center">

**由 Android root 社群 用 ❤️ 打造**

[⭐ 星標此倉庫](https://github.com/awesome-android-root/awesome-android-root) • [🐛 報告問題](https://github.com/awesome-android-root/awesome-android-root/issues)  • [💖 給予贊助](https://opencollective.com/awesome-android-root-official)

</div>