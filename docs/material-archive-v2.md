# Material Archive v2 — Integration Notes

> **Phase 6I 狀態：v2 已正式部署到 production。**
>
> - Production URL：`https://fashion-archive-chi.vercel.app/`
> - Merge commit（`main`）：`c71da74`
> - v2 integration commit：`44483f0`
> - PR：[#1 Redesign Fashion Archive as Material Lab v2](https://github.com/zhuang060329-bit/fashion-archive/pull/1)（已 merge）
>
> Production verification（Phase 6H）已完成：desktop smoke test（用真實
> production server + 真實瀏覽器，確認 EntryLab / 1970s / 2010s /
> MaterialBoard 皆正確渲染）、console/network 檢查（無 error、無外部
> 圖片請求）、無 v1 cursor/ChapterNav 殘留。
>
> **Mobile fallback：production 已人工驗證（Phase 6J）。** 使用者親自
> 用真機手機 / WeChat browser 開啟 `https://fashion-archive-chi.vercel.app/`，
> 截圖確認 `<1024px` 正確顯示 desktop-required fallback（`FASHION
> ARCHIVE` / `MODE: MATERIAL LAB` / `VIEWPORT: INSUFFICIENT` / "This
> archive is designed for desktop inspection." / `REQUIRED: DESKTOP /
> LARGE TABLET` / `MIN WIDTH: 1024PX` / editorial disclaimer），畫面上
> 沒有出現完整 v2 互動內容、沒有 `ScannerCursor`，呈現是設計過的提示
> 頁而非錯誤頁，沒有明顯水平溢出。**這驗證的是 fallback 畫面本身，
> 不是完整 mobile 互動體驗**——v2 在 `<1024px` 刻意不提供完整 mobile
> archive 互動，這個 desktop-only 策略維持不變，是設計決定不是缺漏。
> `/v2-preview` 共用同一份 `V2Home`/`useDesktopViewport` 邏輯，未單獨
> 在真機上覆測，但程式碼路徑與已驗證的 `/` 完全相同。
>
> `/v2-preview` 路由刻意保留，現在的角色是「跟正式首頁共用同一份
> `V2Home` 元件、但獨立存在」的 staging / comparison 路由，方便日後
> 比對正式首頁是否走偏。
>
> v1 舊元件（`EntryScreen` / `EraSection` / `TrendSystem` /
> `GarmentIndex` / `CursorFollower` / `ChapterNav`）**全部保留**在
> `src/components/`，只是不再被任何路由引用；**cleanup 尚未執行**，
> 且只會在使用者明確核准後才進行。

---

## 1. v2 定位

Material Archive / Garment Lab——desktop-first、desktop-only 的高互動
fashion archive 介面。將 garment / era / trend 資料以「材料實驗室標本
檔案」的視覺語言呈現（specimen card、material tray、scanner cursor、
calibration marks），取代 v1 的條列式 accordion archive 呈現。

## 2. 為什麼不是 polish v1，而是 redesign

v1（`EntryScreen` / `EraSection` / `TrendSystem` / `GarmentIndex`）是穩定
的內容骨架，資料結構與事實準確性已驗證，但互動語言與視覺語言僅止於
「可用的 accordion archive」。v2 不是在 v1 上加裝飾，而是重新設計
**互動語言本身**（scanner-as-instrument cursor、specimen 揭露邏輯、
material tray 容器邏輯、年代專屬的視覺系統），因此以全新元件樹
（`src/components/v2/`）獨立開發，不修改 v1 任何元件。

## 3. v2 結構（Phase 6E 更新：共用 `V2Home`）

- **共用內容元件**：`src/components/v2/V2Home.tsx`——`/`（production）
  與 `/v2-preview`（staging）共用的同一份 v2 body，接收
  `mode: 'production' | 'preview'` prop，只用來決定：
  - `<main>` 的 `id`（`production` → `main-content`，對齊
    `layout.tsx` 的 skip-link `href="#main-content"`；`preview` →
    `v2-preview-content`，沿用原本的 id）
  - footer 文案（見第 4 節下方「footer wording」說明）
- **正式路由**：`src/app/page.tsx` → `<V2Home mode="production" />`
- **Staging 路由**：`src/app/v2-preview/page.tsx` →
  `<V2Home mode="preview" />`
- 兩個路由不再各自維護一份完整 v2 body，避免內容漂移。
- 主要元件（`src/components/v2/`，由 `V2Home` 組裝）：
  - `EntryLab` — opening ritual + lab control panel 左欄 + 標題顯影
  - `EraLabSection` — 1970s（`contrast-grid` variant）與 2010s
    （`signal-stack` variant）年代區塊
  - `MaterialBoard` — garment specimen tray（取代 v1 的
    `GarmentIndex` accordion list）
  - `MaterialSpecimenCard`、`SpecimenRuler`、`SpecimenStamp`、
    `GarmentSilhouette`、`LabDust`、`ScannerCursor`、
    `DesktopOnlyGate`、`RouteScopedChrome`
- **Route-scoped chrome（Phase 6E 更新）**：`RouteScopedChrome` 原本只
  判斷 `/v2-preview`，現在改成判斷「是否為 v2 route」（目前清單是
  `/` 與 `/v2-preview`），在這些路由隱藏 v1 的 `CursorFollower` 與
  `ChapterNav`。因為 `/` 現在也是 v2 頁面，這個調整是必要的，否則
  正式首頁會同時疊加 v1 dot cursor 與 v2 `ScannerCursor`。
- Desktop fallback：`useDesktopViewport` hook（`src/hooks/`）判定
  `<1024px` 時整個 v2 互動內容不 mount，改顯示 `DesktopOnlyGate`——
  `/` 與 `/v2-preview` 都套用同一個 fallback（本地已用
  375×812 驗證兩個路由皆正確顯示 gate，零水平溢出）。

## 4. 使用與未使用的素材/模式

**使用**：

- Motion Primitives `text-effect`（`src/components/motion-primitives/`，
  逐字 fade-in-blur，僅用於 `EntryLab` 副標）
- GSAP + `@gsap/react`（`useGSAP`）——opening ritual timeline、
  scroll-triggered reveal、`ScannerCursor` 的 lock-on tween 與 ticker lerp
- hand-authored「React Bits 啟發」的 spotlight / morph-frame 互動
  （`ScannerCursor` 的框體 morph 邏輯），**非安裝 React Bits 套件**，
  純手刻 GSAP + CSS
- `clsx` + `tailwind-merge`（`src/lib/utils.ts` 的 `cn()` helper）——
  本次新增的唯一兩個 production dependency
- Lenis（`SmoothScrollProvider`，v1 既有，v2 沿用全站 smooth scroll，
  非本次新增）

**未使用，如實記錄**：

- **未安裝或使用 React Bits 元件套件**（`DavidHDev/react-bits`
  沒有 npm 套件可裝，本專案也未透過任何方式引入其原始碼）
- **未使用 Animate UI**
- **未使用 Aceternity UI**
- **未引入外部圖片 / 品牌圖片**——所有視覺皆為 CSS/SVG 手刻
  （geometric silhouette、halftone、cutting-guide 等皆為程式產生）
- **未使用 React Three Fiber（R3F）**
- **未新增資料庫、auth、環境變數**

## 5. v2 主要視覺系統

- **Scanner cursor / lock-on**（`ScannerCursor.tsx`）：測量框 + 水平
  掃描線，hover 到 `[data-specimen]` 元素時框體 tween 至該元素邊界，
  顯示 label 與座標讀數，鎖定瞬間有 sweep highlight 與卡片 bloom。
  Desktop-only，`prefers-reduced-motion` 或觸控裝置時整個元件不渲染
  （回傳 `null`），不影響 `:focus-visible` outline。
- **Material tray / specimen board**（`MaterialBoard.tsx`）：
  `.material-tray-plane` 容器（邊框 + 台面漸層 + 軌道標記）取代散落
  卡片牆；`featured`（每 4 件取 1）標本附 `PRIORITY SPECIMEN` 標籤；
  同一容器內僅允許一張卡 `isActive`（`activeId` 狀態提升至容器層），
  展開時其他卡通過 `.has-active-specimen` 降低 opacity 隔離。
- **Lab plate / ruler / calibration marks**（`EntryLab.tsx` 左欄、
  `SpecimenRuler.tsx`）：頂部 live status、中段 specimen log、底部
  calibration bars + ruler 的三段式控制面板結構。
- **1970s material contrast / 拼貼語言**（`EraLabSection` 的
  `contrast-grid` variant）：縮小的 beige 色塊 + 側邊 pinned chip rail
  + 放大釘書針細節，卡片區與色塊以負 margin 疊接製造拼貼感。
- **2010s signal stack**（`EraLabSection` 的 `signal-stack` variant）：
  右側 `SignalRail` 顯示 queue depth、packet 位址、IDLE/LOCKED 狀態，
  與左側卡片互動同步反映（展開時對應行變為 `LOCKED` + `TRACE ACTIVE`）。
- **Garment specimen board**：見上方 Material tray 說明，
  `MaterialSpecimenCard` 的 membrane-lift 揭露動畫（`clip-path` +
  `translateY`，非 fade-in）。

## 6. Mobile 策略

- `<1024px` 顯示 `DesktopOnlyGate`（刻意設計的桌面限定提示畫面），
  不嘗試承載完整的 mobile archive 體驗。
- `<1024px` 時整個 v2 互動樹（`ScannerCursor`、GSAP timeline、
  scroll-trigger 動畫）皆不初始化，避免在小螢幕載入不必要的互動開銷。
- 這是**刻意的 desktop-only 作品策略**，不是「漏做 responsive」——
  v1 首頁本身仍是完整 responsive（見 `QA.md` Section E），v2 prototype
  作為獨立的桌面高互動展示頁存在。

## 7. Accessibility / QA 限制

- `prefers-reduced-motion` 在程式碼與 CSS 層級皆有處理（`useReducedMotion`
  hook、GSAP timeline 的 early-return 分支、CSS `@media` 區塊），但
  **僅完成程式碼審查層級驗證**，未在真實系統設定切換後人工看過畫面
  （沿用 v1 在 `QA.md` Phase 4D 記錄的同樣限制）。
- `ScannerCursor` 使用獨立 `pointer-events:none` fixed 圖層實作，
  完全不修改任何元素的 `outline`，理論上不應干擾 `:focus-visible`，
  但本次未針對 v2 頁面重新做鍵盤 Tab 走訪驗證。
- Mobile fallback（Phase 6E 更新）已用 `preview_resize`（375×812）
  在**兩個路由**重新驗證：`/` 與 `/v2-preview` 皆正確顯示
  `DesktopOnlyGate`，`#main-content` / `#v2-preview-content` 皆不存在，
  `scrollWidth` 與 viewport 寬度一致（無水平溢出）。
- **螢幕閱讀器未完整人工驗證**——與 v1 現況相同，目前沒有人類測試者
  或音訊感知能力可以確認 NVDA/VoiceOver 實際朗讀結果。Phase 6E 的
  homepage 切換**沒有改變這個限制**，正式首頁的螢幕閱讀器體驗依然
  未經人工驗證。
- **不得宣稱「accessibility fully verified」或「production verified」**
  ——以上限制是明確聲明，非待補充的小事項。

## 8. Production 部署狀態（Phase 6I 更新）

**已完成**：

- [x] Homepage replacement（`src/app/page.tsx` → `V2Home mode="production"`）
- [x] `RouteScopedChrome` 已更新為 v2-route 判斷邏輯，`/` 與
      `/v2-preview` 皆確認無 v1 舊版 cursor/nav 殘留
- [x] PR #1 已 merge 進 `main`（merge commit `c71da74`）
- [x] `main` 已 push 到 GitHub，Vercel production 已自動部署
- [x] Production smoke test 已完成（desktop，真實 production server +
      真實瀏覽器；console/network 乾淨；無外部圖片請求）
- [x] Production footer 文案已修正（Phase 6I，移除過時的
      「NOT YET DEPLOYED」措辭，改為「PRODUCTION BUILD」）
- [x] `npx tsc --noEmit` / `npm run lint` / `npm run build` 已在
      `main` 上重新跑過，三者皆通過
- [x] Mobile fallback **邏輯**已在 `/` 與 `/v2-preview` 兩個路由的本地
      dev viewport（375×812）重新驗證
- [x] **Mobile fallback 已在 production URL 上由使用者人工驗證
      （Phase 6J）**——真機手機 / WeChat browser 截圖確認 `<1024px`
      正確顯示 fallback 畫面，非完整 v2 互動頁，無明顯破版。驗證對象
      是 `/`；`/v2-preview` 共用相同程式碼路徑但未單獨在真機覆測。

**Post-production follow-up**：

- [x] v1 舊元件清理（已於 Phase 6K 執行，見下方第 9 節）
- [ ] 真實瀏覽器人工螢幕閱讀器測試（NVDA/VoiceOver，沿用 v1 既有限制）
- [ ] README/QA 後續微調（如果之後發現新問題）

> 註：上面第 8 節「已完成」清單中提到的 `RouteScopedChrome`（Phase 6I
> 當時的 v2-route 判斷邏輯）已於 Phase 6K 一併移除，原因見下節。

## 9. Phase 6K — v1 Dead Code Cleanup

- **執行 commit / 日期**：見本次 commit `chore: remove unused v1 archive
  components`（push 到 `main`，由 Vercel 自動部署）。
- **刪除前的 import audit**：以 grep 確認下列元件在 `src` runtime 中
  不再被任何 `import` / JSX 使用（僅剩註解與文件提及），才執行刪除。

**已刪除（v1-only，確認無 runtime import）**：

- `src/components/EntryScreen.tsx`
- `src/components/EraSection.tsx`
- `src/components/TrendSystem.tsx`
- `src/components/GarmentIndex.tsx`
- `src/components/CursorFollower.tsx`
- `src/components/ChapterNav.tsx`
- `src/components/v2/RouteScopedChrome.tsx`（連帶移除——它原本唯一用途
  是在 v2 路由隱藏 v1 的 `CursorFollower` / `ChapterNav`；兩者刪除且
  `layout.tsx` 不再 import 任何 v1 chrome 後，這層包裝已無作用）
- `src/app/globals.css` 內已無人引用的 z-index 變數 `--z-nav` /
  `--z-chapter-nav`（僅 ChapterNav 用、零 `var()` 參照）

**刻意保留（不是 v1-only，或屬內容資料）**：

- `src/components/SourceMarker.tsx`——**v2 的 `EraLabSection` 仍 import
  使用**，並非 v1 專屬，保留。
- `src/components/v2/MisregisteredText.tsx`——v2 元件，保留。
- `src/data/*`（`eras` / `cases` / `garments` / `trends` / `archive`、
  `types.ts` 與所有 `sourceNotes`）——內容資料層，v2 沿用，全數保留。
- `QA.md` / `CREDITS.md` / 本文件的歷史記錄——保留；文件中對已刪元件的
  提及一律改寫為「已於 Phase 6K 移除」，不造成「仍存在」的錯覺。

**`layout.tsx` 的變更**：移除 `CursorFollower` / `ChapterNav` /
`RouteScopedChrome` 三個 import 與其 JSX 包裝；skip-link、`grain-layer`
/`scanline-layer` 紋理層、`SmoothScrollProvider`（Lenis）、以及指向
`#main-content` 的無障礙跳轉皆保留未動。

**驗證**：`npx tsc --noEmit` / `npm run lint` /
`rm -rf .next && npm run build` 三者皆通過；本地 smoke check 確認
`/` 仍是 v2、`/v2-preview` 仍可用、footer 文案正確、mobile fallback
code path（`DesktopOnlyGate`）未受影響、無 v1 cursor/ChapterNav、
console 無 error。

**為什麼 `/v2-preview` 仍保留**：作為跟正式首頁共用同一份 `V2Home`、
但獨立存在的 staging / comparison 路由，方便日後比對 production 是否
走偏。Phase 6K 不移除它；未來若要移除需使用者明確核准。

**仍未完成（沿用既有限制）**：螢幕閱讀器人工測試尚未完整進行，
**不得宣稱 accessibility fully verified / screen reader verified /
mobile experience completed**。

## 10. Phase 7A — Color / Contrast / Cursor / Focus Pass

針對 v2 殘留的低對比、cursor:none a11y 風險、flip card 鍵盤焦點做最小修正。
不新增功能、不擴內容、不重做 layout。詳細驗證見 `QA.md` Phase 7A 章節。

- **Era color identity**：1970s `colorProfile.accent` 由暗紅 `#8B1A1A` 改為
  琥珀 `#D49A3C`（呼應既有 `--color-era-70`），與 2010s `#FF2400` signal red
  形成冷暖色相區分；2010s idle telemetry 改用冷灰 `--color-signal-idle`。
- **Contrast**：`.lab-meta-tertiary`、`SourceMarker` 來源文字、ruler 數字、
  footer / gate disclaimer 由 archive-600/700（約 1.2–1.6:1）提到可讀區間。
  **仍刻意保留暗色質感，不宣稱 WCAG fully verified**。
- **Typography**：新增 `.type-note`（sentence-case mono）給卡背 context /
  culturalFunction，降低 mono-uppercase 標籤壟斷；提示文字改儀器動詞
  （`VIEW REVERSE` / `LIFT SAMPLE`）。
- **Cursor**：隱藏系統游標改用 `<html data-scanner-cursor>` + CSS gate
  （`(prefers-reduced-motion: no-preference) and (pointer: fine)`）；
  coarse pointer / reduced-motion 一定保留系統游標。
- **Keyboard focus**：`EraLabSection` flip card 翻面後焦點移到背面
  「← BACK」、收回後還給卡片，僅鍵盤觸發時移動；`MaterialBoard` peel 無
  懸空焦點問題未動。未引入 focus trap。
- **Telemetry wording**：2010s 假儀表板文案（QUEUE DEPTH / PACKET / DROP
  QUEUED / IDLE / LOCKED / TRACE ACTIVE）改為 archive signal annotation。

**仍未完成（沿用既有限制）**：螢幕閱讀器人工測試尚未完整進行，
**不得宣稱 accessibility fully verified / screen reader verified /
mobile experience completed / WCAG fully verified**。

### Phase 7A-2 — visible color delta

Phase 7A 的 accent 只在小元件，截圖第一眼分不出兩個年代。7A-2 把 accent /
溫度抬到 section 背景 + 卡片底 + header：

- **Per-era surface**：1970s 暖琥珀底（#15110A）、2010s 冷鋼灰底（#0C0E13），
  卡片底同步暖/冷；取代兩段共用的 archive-black/900 鷹架。
- **Atmosphere wash**：每段頂緣單向 era wash（1970s 暖琥珀、2010s 冷鋼灰，
  非置中 blob、非霓虹）。
- **Header accent**：`.era-tab` 色標 + `.era-title-rule` 標題下 accent 規線。
- **Card accent at rest**：1970s amber top border、2010s red left border。
- **`--line-color`** scope 成 era 色調（cutting-guide / ruler / 邊框吃到溫度）。
- MaterialBoard / EntryLab 維持中性 archive-black。

純視覺 color/typography delta，不動 layout、不加動畫、不擴內容。工程驗證
（tsc / lint / build）通過；不改變既有 a11y / mobile / screen reader 限制。
