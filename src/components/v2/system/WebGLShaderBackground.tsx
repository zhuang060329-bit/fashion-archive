'use client'

// WebGLShaderBackground — 原生 WebGL fragment shader 背景（無第三方套件、
// 無 R3F）。domain-warped fbm 流體紗幕 + 游標 refraction 折射 lens +
// scroll 流動位移 + 年代換色 + 游標速度驅動湍流。是 procedural 背景的
// 「更花哨一級」：真 shader 的液態折射，疊在年代色底之上、2D 纖維場之下。
//
// 取用 InteractiveSurface 寫的共享 pointer store。無 WebGL（context 取不到）
// 時整個 effect no-op，2D 反應式背景仍正常運作。reduced-motion 下只畫
// 一張靜止幀、不開 rAF。

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { pointer } from './pointerStore'

const ERA_RGB: Record<string, [number, number, number]> = {
  default: [122, 122, 106],
  '1970s': [201, 169, 110],
  '1980s': [212, 175, 55],
  '1990s': [142, 142, 126],
  '2000s': [184, 134, 11],
  '2010s': [230, 50, 35],
  '2020s': [155, 139, 122],
}

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;     // 像素（已轉到 framebuffer 空間、含 y 翻轉）
uniform float uScroll;   // 0..1
uniform float uSpeed;    // 0..1
uniform vec3 uColor;     // 0..255

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0,0.0)), u.x),
             mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0; float a = 0.5;
  for (int i = 0; i < 5; i++){ v += a * noise(p); p *= 2.0; a *= 0.5; }
  return v;
}

void main(){
  vec2 asp = vec2(uRes.x / uRes.y, 1.0);
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = uv * asp;
  vec2 m = (uMouse / uRes) * asp;

  // 游標 refraction lens：把附近座標往游標方向擠壓，形成液態折射凸鏡
  // （調大擠壓量 + 放寬作用半徑 → 折射更明顯）
  vec2 toM = p - m;
  float d = length(toM);
  float lens = exp(-d * 3.6);
  p -= normalize(toM + 1e-5) * lens * 0.11;

  // domain warping flow（兩層 warp 製造流體感；加快流速）
  float t = uTime * 0.082;
  vec2 q = vec2(fbm(p * 1.8 + t), fbm(p * 1.8 + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p * 1.8 + 2.0 * q + vec2(1.7, 9.2) + t * 1.3),
                fbm(p * 1.8 + 2.0 * q + vec2(8.3, 2.8) - t));
  float f = fbm(p * 1.8 + 2.6 * r + uScroll * 0.6);
  f = smoothstep(0.05, 0.95, f);

  // 整體調亮一些（base 0.28→0.4、lens 0.55→0.78）
  float inten = pow(f, 1.6) * (0.4 + uSpeed * 0.5) + lens * 0.78;
  vec3 col = (uColor / 255.0) * inten;
  gl_FragColor = vec4(col, clamp(inten, 0.0, 1.0));
}
`

export function WebGLShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = (canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: false }) ||
      canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null
    if (!gl) return // 無 WebGL：no-op，2D 背景仍運作

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!
      gl.shaderSource(sh, src)
      gl.compileShader(sh)
      return sh
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(prog, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'uRes')
    const uTime = gl.getUniformLocation(prog, 'uTime')
    const uMouse = gl.getUniformLocation(prog, 'uMouse')
    const uScroll = gl.getUniformLocation(prog, 'uScroll')
    const uSpeed = gl.getUniformLocation(prog, 'uSpeed')
    const uColor = gl.getUniformLocation(prog, 'uColor')

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE) // additive：暗底上疊流體光紗

    let dpr = 1
    let cssW = 0
    let cssH = 0
    const resize = () => {
      dpr = Math.min(1.5, window.devicePixelRatio || 1)
      cssW = window.innerWidth
      cssH = window.innerHeight
      canvas.width = Math.floor(cssW * dpr)
      canvas.height = Math.floor(cssH * dpr)
      canvas.style.width = `${cssW}px`
      canvas.style.height = `${cssH}px`
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    let cr = ERA_RGB.default[0]
    let cg = ERA_RGB.default[1]
    let cb = ERA_RGB.default[2]

    const render = (timeMs: number) => {
      const era = document.documentElement.dataset.era ?? 'default'
      const tgt = ERA_RGB[era] ?? ERA_RGB.default
      cr += (tgt[0] - cr) * 0.04
      cg += (tgt[1] - cg) * 0.04
      cb += (tgt[2] - cb) * 0.04

      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, timeMs * 0.001)
      // pointer.lx/ly 是 CSS px、top-down；轉到 framebuffer 像素 + y 翻轉
      gl.uniform2f(uMouse, (pointer.lx || cssW / 2) * dpr, canvas.height - (pointer.ly || cssH / 2) * dpr)
      gl.uniform1f(uScroll, pointer.scroll)
      gl.uniform1f(uSpeed, pointer.speed)
      gl.uniform3f(uColor, cr, cg, cb)

      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    let raf = 0
    if (prefersReduced) {
      render(0)
    } else {
      const loop = (t: number) => {
        render(t)
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    }

    return () => {
      window.removeEventListener('resize', resize)
      if (raf) cancelAnimationFrame(raf)
      gl.deleteBuffer(buf)
      gl.deleteProgram(prog)
      const lose = gl.getExtension('WEBGL_lose_context')
      lose?.loseContext()
    }
  }, [prefersReduced])

  return <canvas ref={canvasRef} className="archive-bg-gl" aria-hidden="true" />
}
