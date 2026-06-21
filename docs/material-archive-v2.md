# Material Archive v2 — Integration Notes

> Phase 6D checkpoint snapshot。本文件記錄 `/v2-preview` prototype 的定位、
> 結構、使用素材與已知限制，供未來 production 接入（Phase 6E）參考。
> **`/v2-preview` 目前未接入正式首頁，`src/app/page.tsx` 完全未修改。**

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

## 3. v2 preview 結構

- 路由：`src/app/v2-preview/page.tsx`（`'use client'`，dev-only review
  路由，未連結自正式導覽）
- 主要元件（`src/components/v2/`）：
  - `EntryLab` — opening ritual + lab control panel 左欄 + 標題顯影
  - `EraLabSection` — 1970s（`contrast-grid` variant）與 2010s
    （`signal-stack` variant）年代區塊
  - `MaterialBoard` — garment specimen tray（取代 v1 的
    `GarmentIndex` accordion list）
  - `MaterialSpecimenCard`、`SpecimenRuler`、`SpecimenStamp`、
    `GarmentSilhouette`、`LabDust`、`ScannerCursor`、
    `DesktopOnlyGate`、`RouteScopedChrome`
- Route-scoped chrome：`src/app/layout.tsx` 透過 `RouteScopedChrome`
  在 `/v2-preview` 隱藏 v1 的 `CursorFollower` 與 `ChapterNav`，
  production 首頁（`/`）行為不變。
- Desktop fallback：`useDesktopViewport` hook（`src/hooks/`）判定
  `<1024px` 時整個 v2 互動內容不 mount，改顯示 `DesktopOnlyGate`。

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
- Mobile fallback 已用 `preview_resize`（375×812）驗證：`DesktopOnlyGate`
  正確顯示、`#v2-preview-content` 不存在、`scrollWidth` 與 viewport
  寬度一致（無水平溢出）。
- **螢幕閱讀器未完整人工驗證**——與 v1 現況相同，目前沒有人類測試者
  或音訊感知能力可以確認 NVDA/VoiceOver 實際朗讀結果。
- **不得宣稱「accessibility fully verified」**——以上限制是明確聲明，
  非待補充的小事項。

## 8. Production 接入前待辦

- [ ] Final user screenshot review（每次視覺調整後須經人工審核通過，
      本文件撰寫時 Phase 6C-2 視覺審核已通過）
- [ ] Homepage replacement diff review（Phase 6E 執行時需要的完整
      diff 審查，本次 Phase 6D 僅做 checkpoint，未執行替換）
- [ ] Final `npx tsc --noEmit` / `npm run lint` / `npm run build`
      （Phase 6E 接入前需重新跑一次，不可沿用本次結果）
- [ ] Final mobile fallback check（Phase 6E 接入後需在正式路由
      `/` 上重新驗證，而非僅在 `/v2-preview`）
- [ ] `QA.md` final update（Phase 6E 完成後需新增「production homepage
      replaced」章節，目前仍標示為未接入）
- [ ] Production smoke test after deployment（**僅在使用者明確核准
      deploy 後才執行，本階段不適用**）
