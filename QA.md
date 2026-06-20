# QA.md — Manual QA Package

本文件是人工驗證清單，不是自動化測試報告。除非明確標示「已自動驗證」，
以下所有項目都需要人工在真實瀏覽器（非自動化 preview 工具）跑過一次，
才能視為通過。

---

## A. Local Preview

```bash
npm install
npm run dev
```

預期 URL：`http://localhost:3000`

驗證指令：

```bash
npx eslint .
npx tsc --noEmit
npm run build
```

三者都應該回傳 0 errors / 0 problems，`npm run build` 應顯示
`✓ Compiled successfully` 且兩個路由（`/`、`/_not-found`）皆為
`○ (Static)`。

**已知環境注意事項**：Windows 上若用 Turbopack dev server 經歷大量
快速連續編輯後出現頁面完全無互動（點擊/狀態都沒反應），先檢查瀏覽器
console 是否有 `Uncaught SyntaxError: Invalid or unexpected token`。
若有，刪除 `.next/` 目錄後重新 `npm run dev` 即可（這是 Turbopack 在
高頻寫入下偶發的 chunk 快取毀損，不是程式碼問題）。

---

## B. Keyboard Test Checklist（人工測試，未自動驗證鍵盤輸入）

請在真實瀏覽器分頁中，滑鼠完全不碰，只用鍵盤逐項測試：

- [ ] 開啟頁面後第一個 `Tab` 是否聚焦到 skip link（畫面左上角應浮現
      「Skip to main content」）
- [ ] 在 skip link 上按 `Enter`，畫面是否跳到 `<main>` 內容（不一定要
      有視覺滾動，但 focus 應移到 main 內部第一個可聚焦元素）
- [ ] 持續 `Tab`，是否能依序聚焦到右側 ChapterNav 的六個年代按鈕
      （桌面寬度 ≥1024px 才會顯示；窄螢幕應跳過，不應卡住）
- [ ] 在 ChapterNav 按鈕上按 `Enter` 或 `Space`，頁面是否平滑滾動到對應
      年代，且該按鈕的 tick mark 是否變長、period label 是否顯示
- [ ] 在 Trend Intelligence 區塊的每一行按 `Enter` 或 `Space`，是否能
      展開／收起該 trend 的詳細內容
- [ ] 在 Garment Index 的每一行按 `Enter`，是否能展開／收起該 garment
      的詳細內容
- [ ] 在 EraSection 的 Case Fragment（含 `left-index`／`overlay` 版型的
      長列、`full-title` 版型的格狀 compact 卡片）按 `Enter`，是否能
      展開／收起
- [ ] 每個可聚焦元素 focus 時，是否能看到清楚的 focus ring（白色
      outline，2px，offset 3px）
- [ ] focus ring 是否完全沒有被自訂游標、grain 紋理、scanline 紋理
      擋住或變得難以辨識

---

## C. Reduced-Motion Test Checklist（人工測試，未自動驗證）

**Chrome / Edge**：開啟 DevTools → `⋮` 選單 → More tools →
Rendering → 找到 **Emulate CSS media feature
`prefers-reduced-motion`** → 設為 `reduce`。

**macOS**：System Settings → Accessibility → Display → 開啟
「Reduce motion」。
**Windows**：Settings → Accessibility → Visual effects → 關閉
「Animation effects」。

設定後重新整理頁面，檢查：

- [ ] 自訂游標（跟隨滑鼠的小白點 + 文字標籤）是否完全關閉，滑鼠游標
      恢復系統預設箭頭
- [ ] Trend / Garment / Case Fragment 的展開／收起是否「直接顯示／
      隱藏」，沒有 height 從 0 長到 auto 的動畫過程
- [ ] EntryScreen、EraSection 的標題與內容是否一進入畫面就完整可讀，
      不需要等待 fade-in 或位移動畫播完
- [ ] 往下滾動經過 EntryScreen 與各 EraSection 時，原本的 scroll-pin /
      parallax 效果是否不影響文字可讀性（文字不應該因為動畫卡在
      半透明或位移中的狀態）
- [ ] 背景的 grain（噪點）紋理動畫是否停止閃動（紋理本身可以還在，
      但不應該持續位移）

---

## D. Screen Reader Test Checklist（尚未實機測試，僅列出待測項目）

> **明確聲明：以下項目目前只做過 DOM semantics / aria attributes 檢查，
> 沒有真正用螢幕閱讀器聽過一次。** 請勿在未實測前對外宣稱「螢幕閱讀器
> 友善」。

建議組合：

- NVDA + Firefox（Windows，免費）
- NVDA + Chrome（Windows，免費）
- VoiceOver + Safari（macOS，系統內建，`Cmd+F5` 開啟）

待測項目：

- [ ] 頁面載入後，skip link 是否會被讀出（通常需要先 Tab 一次才會
      觸發朗讀）
- [ ] ChapterNav 的六個按鈕，朗讀內容是否清楚（目前 `aria-label` 為
      「Jump to 1970–1979」等格式，需確認讀起來語意完整）
- [ ] Trend / Garment / Case Fragment 展開或收起時，螢幕閱讀器是否會
      宣告狀態變化（目前靠 `aria-expanded`，需確認 NVDA/VoiceOver 是否
      真的唸出「expanded」/「collapsed」）
- [ ] 各 EraSection 的標題（`<h2>`）在標題導覽模式下（NVDA `H` 鍵、
      VoiceOver Rotor）順序是否合理，是否能準確反映 1970s → 2020s 的
      章節順序
- [ ] Footer 的 disclaimer 段落（「This is an independent educational
      and editorial portfolio project...」）是否能被完整朗讀，不被
      跳過或截斷

---

## E. Responsive Checklist

於以下五個寬度人工檢查（可用瀏覽器 DevTools 的裝置工具列，或直接縮放
視窗）：

- [ ] **320px**
- [ ] **375px**
- [ ] **768px**
- [ ] **1024px**
- [ ] **1440px**

每個寬度檢查：

- [ ] 無水平 overflow（畫面不應出現橫向滾動條，文字不應貼齊或溢出
      螢幕邊緣）
- [ ] EntryScreen 的標題、header/footer metadata 條不貼邊，左右有
      正常 padding
- [ ] EraSection 三種版型（`left-index` 如 1970s/2000s、`overlay` 如
      1980s/2010s、`full-title` 如 1990s/2020s）標題、年代數字、case
      fragment 都正常顯示，不互相重疊
- [ ] TrendSystem / GarmentIndex 展開內容在窄螢幕（<768px）是否正確
      改為單欄堆疊，metadata 移到正文下方，不爆版
- [ ] Footer 與 disclaimer 文字可正常閱讀，不被截斷
- [ ] ChapterNav 在 <1024px 時是否確實隱藏（`display:none`），且沒有
      佔據版面或擋住任何內容

---

## F. Known Limitations

- **尚未完成 NVDA / VoiceOver 實機測試**——目前所有「accessibility 已
  驗證」的說法都僅限於 DOM 結構與 aria 屬性層級，不是真實朗讀體驗。
- **目前沒有 og:image**——刻意決定，避免使用任何未授權的品牌/設計師
  圖片。社群分享連結目前只會顯示純文字 title/description。
- **未引入任何外部品牌圖片**——`src/data/` 內所有圖片參照
  （`ImageRef`）皆為 `external-url`（公開可用連結）、`placeholder`
  或 `abstract-only`（純文字/排版表達），repo 內不包含任何品牌或
  設計師的圖片檔案。
- **這是一個獨立教育性編輯型作品集專案（independent educational
  editorial portfolio project）**，不是與任何品牌、設計師或機構的
  商業合作站，所有事實陳述皆附 `sourceNotes`（`verified` /
  `widely-reported` / `contested` 三級信心標示）。
- **鍵盤互動的自動化驗證有工具侷限**——開發過程中使用的瀏覽器自動化
  preview 工具無法送出受信任（trusted）的鍵盤事件，因此 Enter/Space
  展開邏輯目前僅做過程式碼審查與滑鼠點擊驗證，本文件 B 節列出的人工
  鍵盤測試尚待執行。
