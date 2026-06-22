// 共享 pointer 狀態——InteractiveSurface 在它的單一 rAF loop 內寫入，
// ReactiveArchiveBackground 的 canvas loop 讀取，避免 canvas 每幀
// getComputedStyle 解析 CSS 變數的成本。純 module-level 可變物件，
// 不觸發 React render。
export const pointer = {
  lx: 0, // 平滑儀器座標
  ly: 0,
  rx: 0, // 原始游標座標
  ry: 0,
  nx: 0.5, // 正規化（0–1）
  ny: 0.5,
  speed: 0, // 0–1
  scroll: 0, // 0–1 全頁進度
  scanning: false, // 是否正在掃描某個可檢視物件（hover lock）
}

// 背景 ripple 佇列——ArchiveLens 鎖定新物件時 push 一筆，背景 canvas
// 消費並畫出由該點擴散的環，舊的自動淘汰。座標為視窗 px。
export interface Ripple {
  x: number
  y: number
  start: number // performance.now()
}
export const ripples: Ripple[] = []

export function triggerRipple(x: number, y: number) {
  ripples.push({ x, y, start: performance.now() })
  if (ripples.length > 6) ripples.shift()
}
