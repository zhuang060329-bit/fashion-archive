// GSAP 初始化 — 只在 "use client" 模組 import
// registerPlugin 在 module-level 執行：GSAP 的 register 本身不需要 DOM，SSR 安全
// ScrollTrigger 的 DOM 操作是懶執行（scroll event 觸發時），非 register 時

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// 立即 register：確保子元件的 useGSAP 呼叫時 plugin 已就位
gsap.registerPlugin(ScrollTrigger, useGSAP)

export { gsap, ScrollTrigger, useGSAP }
