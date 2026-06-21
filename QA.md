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
  鍵盤測試尚待執行。（**Phase 4D 更新**：部分項目已用真實 Chrome 視窗
  補測，細節見下方 Phase 4D 章節。）

---

## Phase 4D Manual Verification

- **Date**: 2026-06-20
- **Browser**: Google Chrome（真實視窗，非自動化 headless preview）
- **OS**: Windows 11
- **測試方式**：用 Claude-in-Chrome 瀏覽器自動化工具開啟真實 Chrome
  分頁，搭配 `.focus()` 定位 + 真實鍵盤按鍵動作（非 `dispatchEvent`）。
  這個環境下 `document.hasFocus()` 回報 `true`（先前 Phase 4B 用的
  embedded preview 工具裡這個值永遠是 `false`，導致 `:focus` /
  `:focus-visible` 無法在那邊測試）。

### Keyboard Test

**Passed（已用真實瀏覽器確認）**：

- Skip link 可用 `.focus()` 定位，`:focus` 與 `:focus-visible` 都正確
  match，CSS `top: 1rem` 正確套用——截圖確認白底框 + 清楚 focus ring
  outline 完整顯示，没有被自訂游標、grain、scanline 蓋住
- Skip link 用 Enter 啟動 `<a href="#main-content">` 至少一次成功觸發
  hash 導覽（`window.location.hash` 變為 `#main-content`），證實機制
  本身可運作（雖然重複測試時這個工具的 Enter 模擬不是每次都能重現，
  見下方 Issues）
- TrendSystem 的展開按鈕（原生 `<button>`）：Enter 與 Space **都**能
  正確切換 `aria-expanded`（true ↔ false），用真實按鍵確認
- GarmentIndex row（自製 `role="button"` 的 `<div>`）：Enter 能正確
  切換 `aria-expanded`
- focus-visible ring 在 TrendSystem 按鈕上用 `.matches(':focus-visible')`
  確認為 `true`

**Issues 發現並修正**：

1. **GarmentIndex row / CaseFragment / CaseFragmentCompact 原本不支援
   Space 鍵**——`onKeyDown` 只檢查 `e.key === 'Enter'`，且沒有
   `preventDefault()`。實測發現按 Space 時，瀏覽器預設的「整頁向下
   捲動」行為被觸發（`scrollY` 從原位置跳到 5764px），但展開狀態
   完全沒變化——對鍵盤使用者來說是雙重困惑（畫面跳動 + 沒有任何
   回應）。**已修正**：三處 `onKeyDown` 改為同時接受 `Enter` 與
   `' '`（Space），並加 `e.preventDefault()` 避免捲動副作用。
2. **`<main id="main-content">` 原本沒有 `tabIndex`**——skip link
   啟動後 hash 雖然改變，但 DOM focus 沒有真正移入 main（停留在
   `<body>`）。這在這個專案裡視覺上影響不大（main 本身在頁面最頂端，
   scroll 位置不變），但對鍵盤使用者而言，再次按 Tab 時的下一個
   focus 目標仍是「被跳過」的 ChapterNav，而非 main 內部內容，
   skip link 形同無效。**已修正**：加上 `tabIndex={-1}`，讓 main
   成為合法的程式化 focus 目標。

**Limitations（誠實記錄，未完整驗證）**：

- **無法驗證真實 Tab 鍵的原生 focus 跳轉順序**——測試工具的 `Tab`
  按鍵動作不會觸發 Chrome 的原生「移動 focus 到下一個可聚焦元素」
  行為（用 `document.activeElement` 確認按 Tab 後仍停留在
  `<body>`），這是這次使用的自動化管道的限制，不是反覆能排除的
  程式碼問題。Tab 順序本身（DOM 結構：skip-link → ChapterNav 六個
  按鈕 → 其餘內容）已用 **DOM 結構審查** 確認合理，但沒有用真人或
  可信任的 Tab 模擬器逐一走過。
- **ChapterNav（需要 ≥1024px 才顯示）無法在這個真實瀏覽器視窗測
  試**——`resize_window` 工具回報成功，但 `window.innerWidth` 始終
  停留在 851px，無法跨越 1024px 門檻。ChapterNav 的鍵盤可操作性僅
  在 Phase 4A/4B 的 embedded preview 工具（無法測 `:focus` 但能測
  `aria-current` 切換）與本次的 DOM 結構審查中確認，未在真實視窗
  里實際按過。
- **Space 鍵修正後的行為，只有 GarmentIndex 在「事件確實被
  preventDefault 擋下」這一點上得到確認**（重測時 `scrollY` 不再
  跳動），但 `aria-expanded` 是否因為 Space 而切換，這次工具測試
  結果不穩定（懷疑此工具的 `Return`/`space` 鍵動作對「啟動」語意
  的處理方式不一致，可能部分情況下走的是模拟點擊而非真正
  keydown）。**修正本身依據 WAI-ARIA Authoring Practices 的標準
  button 鍵盤語意撰寫，且通過 lint/typecheck**，但 Space 鍵展開
  這個具體行為仍建議由真人在自己的鍵盤上覆核一次。

### Reduced-Motion Test

**無法實機測試。**

嘗試透過 Windows 系統設定（已取得授權）切換「動畫效果」開關來觸發
真實的 `prefers-reduced-motion: reduce`，但 Settings 應用程式視窗在
螢幕截圖中幾乎全黑、無法清楚辨識可點擊區域，且這會變更使用者真實
系統的全域協助工具設定。考量風險與不確定性，決定不在使用者真實
桌面上盲目操作系統設定，停止此測試路徑，且未對使用者系統做任何
變更。

本項目的 reduced-motion 正確性，目前**僅有 Phase 4B 留下的程式碼
審查結論**：`useReducedMotion()` hook、CSS `@media
(prefers-reduced-motion: reduce)` 區塊、各元件 `AnimatePresence` 的
`prefersReduced ? false : {...}` 分支、`CursorFollower` 的 early
return guard，邏輯讀起來都正確，但沒有實際開啟過這個系統設定看過
畫面。

### Screen Reader Test

**無法實機測試。**

- **Tool**：Windows Narrator（讲述人）已取得操作授權，但這個工具的
  核心輸出是語音（audio），而我作為執行這次測試的 agent 沒有音訊
  輸出感知能力，即使成功啟動 Narrator 也無法得知它實際朗讀了什麼。
  因此即使技術上能開啟這個應用程式，也無法構成有意義的「螢幕閱讀器
  體驗驗證」。
- **Passed**：無
- **Limitations**：完全沒有驗證。所有「aria 正確性」的信心僅來自
  DOM 屬性層級的程式碼/結構檢查（見 Phase 4B 內容），不是聽覺體驗。
  若要真正驗證，需要一位視覺障礙使用者或對 NVDA/VoiceOver
  操作熟悉的人類測試者實際聽過一次。

### Responsive Regression

- **Widths tested**: 320px, 375px, 768px, 1024px, 1440px（透過
  embedded preview 工具，非真實 Chrome 視窗——該視窗在這次 session
  中無法縮放到 1024px 以上，因此 1024px 與 1440px 改用 preview
  工具驗證）
- **Overflow result**: 五個寬度下 `document.documentElement.scrollWidth
  === clientWidth` **全部成立**，無任何寬度出現橫向溢出
- **檢查項目**：
  - EntryScreen 在 320px 下標題、header/footer metadata 條皆有正常
    padding，不貼邊（已截圖確認）
  - Thesis 區塊維持 editorial 樣式（border-left blockquote + 斜體
    statement），不是普通文字塊（已截圖確認）
  - EraSection 三種版型（left-index / overlay / full-title）在所有
    寬度下標題、年代數字、case fragment 皆正常顯示
  - TrendSystem、GarmentIndex 在 375px 下展開內容皆正確單欄堆疊，
    無爆版（已用實際點擊展開 + scrollWidth 檢查確認）
  - Footer / disclaimer 文字在 375px 下完整可讀，正確換行（已截圖
    確認）
  - ChapterNav 在 375px 確認 `display: none`；在 1024px 確認
    `display: flex`（正確顯示）
- **Issues**：無新發現的 regression

### Remaining Limitations

- Tab 鍵原生 focus 順序、Space 鍵展開（GarmentIndex/CaseFragment）、
  ChapterNav 鍵盤操作（真實視窗）、reduced-motion 視覺效果、螢幕
  閱讀器朗讀體驗——以上五項建議由人類測試者在自己的電腦上實際操作
  一次後再對外宣稱「無障礙已驗證」。
- 本次 Phase 4D 已修正兩個真實發現的問題（Space 鍵支援缺失、skip
  link 目標缺少 `tabIndex`），這兩個修正本身的程式碼邏輯正確，但
  Space 鍵這個具體互動建議真人覆核一次。

---

## Phase 6D — `/v2-preview` Prototype QA Section

> 以下記錄 `redesign/material-archive-v2` branch 上 `/v2-preview`
> prototype（Material Archive v2）的驗證範圍。**正式首頁
> （`src/app/page.tsx`）尚未替換，以上 A–F 節記錄的所有 v1 驗證結果
> 依然完全適用於 production（`/`）。**本節只描述 `/v2-preview` 這個
> 獨立 dev-only 路由。

- [x] `/v2-preview` desktop visual pass completed（Phase 6C-2 視覺
      審核已通過，含 EntryLab 控制面板、1970s/2010s 年代區塊、
      MaterialBoard tray、單卡展開隔離狀態）
- [x] Viewport fallback checked at mobile width（375×812 透過
      `preview_resize` 驗證，`DesktopOnlyGate` 正確顯示）
- [x] `<1024px` does not mount v2 interactive content（已用
      `document.querySelector('#v2-preview-content')` 確認在窄寬度下
      該節點不存在，`ScannerCursor`、GSAP timeline 皆未初始化）
- [x] Scanner / cursor behavior desktop-only（`ScannerCursor.tsx`
      在 `prefersReduced || isCoarsePointer` 時回傳 `null`，已用
      `useIsCoarsePointer` 邏輯與程式碼審查確認，未在真實觸控裝置
      上實機測試）
- [x] Reduced-motion logic checked at code/CSS level（`EntryLab` /
      `EraLabSection` / `MaterialBoard` 的 GSAP timeline 皆有
      `if (prefersReduced) return` 分支，改用 `gsap.set` 直接顯示最終
      狀態；**未實機切換系統設定驗證視覺結果**，與 v1 現況相同限制）
- [x] Lint / typecheck / build passed（`npx tsc --noEmit`、
      `npm run lint`、`npm run build` 三者皆於 Phase 6D 重新執行並
      確認 0 errors / 0 warnings / build 成功）
- [x] Production homepage not replaced yet（`src/app/page.tsx` 未
      修改，`git diff --stat src/app/page.tsx` 為空）
- [x] Screen reader not fully manually tested（與 v1 相同限制，
      見上方 Section D，本節不重複宣稱已驗證）

**明確不宣稱**：accessibility fully verified、screen reader verified、
production verified、mobile experience completed。以上四項皆未達成，
不應對外或對使用者宣稱已完成。

---

## Phase 6E — Homepage Integration QA Section

> 以下記錄 `redesign/material-archive-v2` branch 上把 v2 接入正式首頁
> （`src/app/page.tsx`）後的本地驗證範圍。**這是 feature branch 上的
> 本地 build 驗證，不是 production 驗證**——尚未 push、尚未 deploy，
> 線上環境的行為尚未確認過。

- [x] Homepage integration completed on feature branch（`src/app/page.tsx`
      改為 `<V2Home mode="production" />`，與 `/v2-preview` 共用同一份
      `V2Home` 元件，避免兩處內容各自維護一份）
- [x] `/` local build now renders v2 homepage（本地 dev server 上用
      `document.querySelector('#main-content')`、`h1` 文字確認 `/`
      渲染的是 v2 EntryLab/EraLabSection/MaterialBoard，不是 v1
      EntryScreen/EraSection）
- [x] `/v2-preview` retained as staging route（改為
      `<V2Home mode="preview" />`，行為與內容跟 `/` 一致，僅 `<main>`
      id 與 footer 文案不同）
- [x] Old chrome hidden on both `/` and `/v2-preview`（`RouteScopedChrome`
      改為 v2-route 判斷邏輯；已用 DOM 查詢確認兩個路由皆無 v1
      `CursorFollower` 的 dot/label 元素、無 v1 `ChapterNav` 的年代
      錨點連結；`ScannerCursor` 在兩個路由皆正常運作，未與舊 cursor
      疊加，`document.documentElement.style.cursor` 為 `none`）
- [x] Mobile fallback verified on `/`, not only `/v2-preview`（375×812
      下重新驗證兩個路由皆顯示 `DesktopOnlyGate`，`#main-content` 與
      `#v2-preview-content` 在窄寬度下皆不存在，`scrollWidth` 與
      viewport 寬度一致）
- [x] No external image requests（本地 dev server 的 network log
      檢查，所有請求皆為 `localhost` 靜態資源或 `data:image/svg+xml`
      inline grain 紋理，無任何外部網域請求）
- [x] No new env var requirement（diff audit 確認未新增 `.env` 相關
      變更，`V2Home`/`RouteScopedChrome` 邏輯皆不依賴環境變數）
- [x] Lint / typecheck / build passed（`npx tsc --noEmit`、
      `npm run lint`、`rm -rf .next && npm run build` 三者於 Phase 6E
      重新執行並確認 0 errors / 0 warnings / build 成功）
- [x] Screen reader still not fully manually tested（與 v1、Phase 6D
      相同限制；homepage 切換到 v2 並未改變這個驗證缺口，正式首頁的
      螢幕閱讀器體驗依然只有 DOM/aria 層級的程式碼審查，沒有真人聽過）
- [x] Production deployment not yet verified（未 push、未 deploy，
      `git remote -v` 顯示 origin 存在但本次未連線推送）

**明確不宣稱**：production verified、accessibility fully verified、
screen reader verified。以上三項在 Phase 6E 仍未達成。

---

## Phase 6H / 6I — Production Verification Section

> 以下記錄 PR #1 merge 進 `main`（merge commit `c71da74`，v2 integration
> commit `44483f0`）並部署到 `https://fashion-archive-chi.vercel.app/`
> 之後，對**真實 production 環境**做的驗證。Phase 6I 額外修正了
> production footer 過時文案（見下方）。

- [x] Production URL 已顯示 v2（`curl` cache-busted 重新抓取確認：
      無 `THESIS`、無 `POST-1970 FASHION` 等 v1 標記；`main-content`
      id、`FASHION ARCHIVE` 標題、v2 footer 文字皆存在）
- [x] Production `/v2-preview` 可用（HTTP 200，`v2-preview-content`
      id 存在，footer 顯示 staging 文案）
- [x] Production desktop smoke test passed（用真實 production server
      + 真實瀏覽器截圖確認：EntryLab、1970s contrast-grid、2010s
      signal-stack、MaterialBoard tray 皆正確渲染）
- [x] No v1 dot cursor / ChapterNav observed（DOM 查詢確認 production
      `/` 上沒有符合 v1 cursor 特徵的元素，沒有 v1 年代錨點連結；
      `document.documentElement` 的 `cursor` 為 `none`，`ScannerCursor`
      正常運作）
- [x] Console / network clean（瀏覽器 console 無任何訊息，包含無
      error、無 warning、無 hydration mismatch；54 筆 network 請求
      全部是同網域靜態資源或 `data:image/svg+xml` inline 紋理）
- [x] No external image requests（同上，network 清單逐筆檢查確認）
- [x] Typecheck / lint / build passed（在 `main` 上重新跑
      `npx tsc --noEmit`、`npm run lint`、`rm -rf .next && npm run build`，
      三者皆通過）
- [x] Footer wording fixed in Phase 6I（production footer 從
      「MATERIAL ARCHIVE V2 — LOCAL INTEGRATION BUILD, NOT YET DEPLOYED」
      改為「MATERIAL ARCHIVE V2 — PRODUCTION BUILD」，移除已經不準確的
      「not yet deployed」措辭；`/v2-preview` 的 staging 文案不變）
- [x] Screen reader not fully manually tested（與 v1、Phase 6D/6E 相同
      限制；部署到 production 並未改變這個驗證缺口）
- [x] **Production mobile fallback manually verified by user（Phase 6J）**
      ——使用者親自用真機手機 / WeChat browser 打開
      `https://fashion-archive-chi.vercel.app/`，截圖確認 `<1024px`
      顯示 desktop-required fallback（`FASHION ARCHIVE` /
      `MODE: MATERIAL LAB` / `VIEWPORT: INSUFFICIENT` /
      "This archive is designed for desktop inspection." /
      `REQUIRED: DESKTOP / LARGE TABLET` / `MIN WIDTH: 1024PX` /
      editorial disclaimer），畫面上沒有出現完整 EntryLab /
      EraLabSection / MaterialBoard，沒有出現 `ScannerCursor`，畫面
      呈現像是刻意設計過的提示頁，不像錯誤頁或破版，沒有明顯水平溢出

**Mobile fallback verification 現況（補上人工驗證後，仍維持克制措辭）**：

`useDesktopViewport`/`DesktopOnlyGate` 的邏輯先前已在本地 dev viewport
（375×812）對 `/` 與 `/v2-preview` 驗證通過；Phase 6J 由使用者在真實
production URL 上用真機/WeChat browser 完成了人工驗證，確認 fallback
畫面本身在 `<1024px` 正確顯示、且不是完整 v2 互動頁。**這驗證的是
fallback 畫面本身正確顯示，不是完整的 mobile 互動體驗**——v2 在
`<1024px` 刻意不提供完整的 mobile archive 互動內容，這是設計決定，
不是這次驗證要去測試的對象。`/v2-preview` 的 mobile fallback 邏輯與
`/` 完全共用同一份 `V2Home`/`useDesktopViewport` 程式碼，未單獨用真機
在 `/v2-preview` 上覆測，但程式碼邏輯與已驗證的 `/` 完全相同。

**明確不宣稱**：accessibility fully verified、screen reader verified、
mobile experience completed、production mobile fully verified（這次
驗證的是 fallback 畫面正確顯示，不是「完整 mobile 體驗已驗證」）。
以上四項仍未達成。

---

## Phase 6K — v1 Dead Code Cleanup Verification

> 移除已確認無 runtime import 的 v1 專屬元件後，重新驗證 v2 production
> route 與 staging route 未受影響。詳細刪除清單見
> [docs/material-archive-v2.md](./docs/material-archive-v2.md) 第 9 節。

- [x] v1 components removed only after import audit（先用 grep 確認
      `EntryScreen` / `EraSection` / `TrendSystem` / `GarmentIndex` /
      `CursorFollower` / `ChapterNav` 在 `src` runtime 已無任何
      `import` / JSX 使用，僅剩註解，才刪除；`RouteScopedChrome` 因
      唯一用途消失而連帶移除）
- [x] `SourceMarker` 保留（v2 `EraLabSection` 仍 import 使用，非 v1-only）
- [x] v2 production route 仍正常（本地 smoke：`/` 顯示 v2 homepage，
      `h1` = `FASHION ARCHIVE`，`main#main-content` 存在，footer 為
      `MATERIAL ARCHIVE V2 — PRODUCTION BUILD`，`ScannerCursor` 正常，
      skip-link 仍指向 `#main-content`）
- [x] `/v2-preview` 仍可用（`main#v2-preview-content` 存在，footer 為
      staging 文案）
- [x] Mobile fallback unaffected（375×812 下 `/` 顯示 `DesktopOnlyGate`，
      `main-content` 不存在、無 `ScannerCursor`、`scrollWidth` 無溢出）
- [x] No v1 dot cursor / ChapterNav（DOM 查詢確認 `/` 上無 v1 cursor
      特徵元素、無 v1 年代錨點連結；console 無 error）
- [x] Typecheck / lint / build passed（`npx tsc --noEmit`、
      `npm run lint`、`rm -rf .next && npm run build` 三者皆通過）

**明確不宣稱**：accessibility fully verified、screen reader verified、
mobile experience completed。這次清理只移除 dead code，不改變上述任何
既有驗證限制。

---

## Phase 7A — Color / Contrast / Cursor / Focus Pass

> 針對 v2 殘留的低對比文字、cursor:none 的 a11y 風險、flip card 翻面後的
> 鍵盤焦點，做最小但有效的修正。**這是 contrast / cursor / keyboard focus
> 的改善，不是完整 accessibility 驗證**——螢幕閱讀器仍未完整人工測試，
> 沿用上方所有既有限制與不宣稱項目。

**驗證方式**：`npx tsc --noEmit` / `npm run lint` /
`rm -rf .next && npm run build` 三者皆通過；本地以乾淨重啟的 dev server
（非 HMR 熱替換）+ 瀏覽器自動化（`preview_eval` 讀取 computed style /
activeElement / matchMedia）做 smoke check。

### Contrast / readability pass performed（非 WCAG 完整稽核）

- [x] `.lab-meta-tertiary` 由 `archive-600`（#3A3835，約 1.6:1）提到
      `#726E64`（約 3.6:1）——CLICK TO INSPECT 類提示、SPECIMEN LOG、
      CALIBRATION 等不再接近隱形。computed color 實測為 rgb(114,110,100)。
- [x] `SourceMarker` 的來源出處文字由 `archive-700`（約 1.2:1）提到
      `archive-400`。
- [x] `SpecimenRuler` 刻度數字、`EraLabSection` BOARD TYPE、footer build
      label、`DesktopOnlyGate` disclaimer 由 archive-600/700 提到可讀區間。
- [x] 仍刻意保留暗色質感，未把整站提亮成普通網站；archive-500（約 2.7:1）
      等「低調但可見」的層級維持不動。
- **不宣稱 WCAG fully verified**——只做了重點對比改善與 computed-style
      抽查，非全頁逐元素的完整對比稽核。措辭限定為「contrast pass improved
      readability」。

### Era color identity（1970s amber vs 2010s signal red）

- [x] 1970s `colorProfile.accent` 由暗紅 `#8B1A1A` 改為琥珀 `#D49A3C`
      （與既有 `--color-era-70` 的 1970s 身分一致），與 2010s 的
      `#FF2400` signal red 形成一眼可辨的冷暖色相區分。computed
      `--era-accent` 與 specimen-pin 背景實測確認。
- [x] 2010s `signal-rail-row` idle 由暖灰改為冷灰 `--color-signal-idle`
      (#5E636B)，與 active 的 signal red 形成 platform-era 冷暖層級。
- 1970s 紅藍套印錯位（`lab-misregister`）保留不變。

### Cursor behavior reviewed / adjusted

- [x] `ScannerCursor` 隱藏系統游標改用 `<html data-scanner-cursor>` +
      CSS gate（`@media (prefers-reduced-motion: no-preference) and
      (pointer: fine)`），取代直接寫 inline `cursor:none`。
- [x] desktop fine-pointer + 允許動態：`bodyCursor` computed 為 `none`，
      ScannerCursor 啟用（實測）。
- [x] mobile / coarse pointer：`DesktopOnlyGate` 下 `bodyCursor` 為
      `auto`，`data-scanner-cursor` 不存在，系統游標保留（實測 375×812）。
- [x] reduced-motion：ScannerCursor effect early-return 不 mount，且 CSS
      gate 整段不 match——雙重保險保留系統游標。**reduced-motion 視覺結果
      未實機切換系統設定驗證**，沿用既有限制。
- focus-visible outline 不受影響（ScannerCursor 僅用 fixed
      pointer-events:none 圖層，不碰 outline / 不參與 keyboard focus）。

### Keyboard focus behavior improved（flip card）

- [x] `EraLabSection` 的 case flip card：鍵盤（Enter/Space）觸發翻面後，
      焦點移到背面的「← BACK」按鈕（翻面後外層卡片退出 tab 順序，原本
      焦點會掉到 `<body>`）。實測：dispatch Enter 後 `activeElement` 為
      `← BACK` 按鈕。
- [x] 鍵盤觸發「← BACK」收回後，焦點還給原 specimen card。實測：
      `activeElement === card`（DIV role=button）。
- [x] 滑鼠/觸控互動不移動焦點（以是否有先發生 pointerdown 判斷）。實測：
      pointerdown+click 翻面後焦點未被強制移到背面。
- [x] `MaterialBoard` 是 membrane peel（卡片本身 toggle、背面無獨立可聚焦
      元素），無懸空焦點問題，未更動。
- 焦點移動放在 `isActive` 的 effect（React commit 後）執行，避免在
      click handler 用 rAF 搶在 commit 前觸發而失效。
- **未引入 focus trap**（這不是 modal）。

### Telemetry wording（去 SaaS status board 感）

- [x] 2010s `QUEUE DEPTH / PACKET…RECEIVED / DROP…QUEUED / IDLE / LOCKED /
      TRACE ACTIVE` 改為 archive signal annotation：`SIGNAL INDEX` /
      `SIGNAL nn LOGGED: <case title>` / `UNREAD` / `READING` /
      `ANNOTATING`。保留 signal / platform 概念，但不再是重複的假封包
      filler。卡片正面 `CLICK TO INSPECT` → `VIEW REVERSE`、
      `CLICK TO PEEL` → `LIFT SAMPLE`。
- 卡背 context / culturalFunction 改用新的 `.type-note`（sentence-case
      mono）聲音，與寬距大寫標籤、serif 斜體引言形成不同閱讀節奏，
      降低 mono-caps 壟斷。

### Smoke check（本地，乾淨重啟 dev server）

- [x] `/` desktop（1280×900）渲染 v2（h1=FASHION ARCHIVE、#main-content）
- [x] `/v2-preview` desktop 可用（#v2-preview-content、staging footer）
- [x] mobile fallback（375×812）仍顯示 `DesktopOnlyGate`，無水平溢出
- [x] flip card mouse interaction 正常、keyboard interaction 正常（上方）
- [x] console 無 error（乾淨重啟後讀取，無任何 error）
- [x] 無外部圖片請求（performance resource entries 全為 localhost /
      data:，無 `<img>` 元素）
- [x] 無 v1 cursor / ChapterNav 殘留

**明確不宣稱**：accessibility fully verified、screen reader verified、
mobile experience completed、WCAG fully verified。Phase 7A 只是
contrast/readability pass、cursor behavior review/adjust、keyboard focus
improvement，**螢幕閱讀器仍未完整人工測試**。
