'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/* ── Simplex-like noise (lightweight, no deps) ── */
function fade(t: number) { return t * t * t * (t * (t * 6 - 15) + 10) }
function lerp(a: number, b: number, t: number) { return a + t * (b - a) }
const p = Array.from({ length: 512 }, (_, i) => i < 256 ? i : Math.floor(Math.random() * 256))
function noise(x: number, y: number, z: number) {
  const X = Math.floor(x) & 255, Y = Math.floor(y) & 255, Z = Math.floor(z) & 255
  x -= Math.floor(x); y -= Math.floor(y); z -= Math.floor(z)
  const u = fade(x), v = fade(y), w = fade(z)
  const A = p[X] + Y, B = p[X + 1] + Y
  function g(h: number, x: number, y: number, z: number) {
    const mask = h & 15
    const u2 = mask < 8 ? x : y, v2 = mask < 4 ? y : mask === 12 || mask === 14 ? x : z
    return ((mask & 1) === 0 ? u2 : -u2) + ((mask & 2) === 0 ? v2 : -v2)
  }
  return lerp(
    lerp(lerp(g(p[A + Z], x, y, z), g(p[B + Z], x - 1, y, z), u), lerp(g(p[A + 1 + Z], x, y - 1, z), g(p[B + 1 + Z], x - 1, y - 1, z), u), v),
    lerp(lerp(g(p[A + Z + 1], x, y, z - 1), g(p[B + Z + 1], x - 1, y, z - 1), u), lerp(g(p[A + 1 + Z + 1], x, y - 1, z - 1), g(p[B + 1 + Z + 1], x - 1, y - 1, z - 1), u), v),
    w
  )
}

const PARTICLE_COUNT = 8000
const REPULSION_RADIUS = 0.35
const REPULSION_STRENGTH = 0.6
const SPRING_STIFFNESS = 0.05
const DAMPING = 0.82

export default function ParticleSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    /* ── Scene ── */
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100)
    camera.position.z = 3

    const resize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    /* ── Particle data ── */
    const origin = new Float32Array(PARTICLE_COUNT * 3)
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const velocities = new Float32Array(PARTICLE_COUNT * 3)

    // Distribute on a triangle / constellation
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const t = i / PARTICLE_COUNT
      let x: number, y: number, z: number

      // Mix: 60% triangle edges, 40% scattered fill
      if (Math.random() < 0.6) {
        const side = Math.floor(Math.random() * 3)
        const s = Math.random()
        const tri = [
          [-1.0, -0.7], [1.0, -0.7], [0.0, 1.1],
        ]
        const a = tri[side], b = tri[(side + 1) % 3]
        x = a[0] + s * (b[0] - a[0]) + (Math.random() - 0.5) * 0.08
        y = a[1] + s * (b[1] - a[1]) + (Math.random() - 0.5) * 0.08
        z = (Math.random() - 0.5) * 0.1
      } else {
        // Fill with some randomness inside triangle area
        const r1 = Math.sqrt(Math.random()), r2 = Math.random()
        x = (1 - r1) * -1.0 + r1 * (1 - r2) * 1.0 + r1 * r2 * 0.0 + (Math.random() - 0.5) * 0.4
        y = (1 - r1) * -0.7 + r1 * (1 - r2) * -0.7 + r1 * r2 * 1.1 + (Math.random() - 0.5) * 0.3
        z = (Math.random() - 0.5) * 0.15
      }

      origin[i * 3] = x; origin[i * 3 + 1] = y; origin[i * 3 + 2] = z
      positions[i * 3] = x; positions[i * 3 + 1] = y; positions[i * 3 + 2] = z
    }

    const geometry = new THREE.BufferGeometry()
    const posAttr = new THREE.BufferAttribute(positions, 3)
    posAttr.setUsage(THREE.DynamicDrawUsage)
    geometry.setAttribute('position', posAttr)

    /* ── GLSL Shader ── */
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        uniform float uTime;
        varying float vAlpha;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          float d = length(position.xy);
          vAlpha = 0.5 + 0.5 * sin(uTime * 0.8 + d * 3.0);
          gl_PointSize = mix(1.0, 1.8, vAlpha) * (300.0 / -mv.z);
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float r = length(uv);
          if (r > 0.5) discard;
          float alpha = (1.0 - r * 2.0) * vAlpha;
          // Glow: centre white, edges orange
          vec3 orange = vec3(0.91, 0.40, 0.04);
          vec3 white  = vec3(1.0, 0.95, 0.90);
          vec3 color  = mix(orange, white, smoothstep(0.3, 0.0, r));
          gl_FragColor = vec4(color, alpha * 0.45);
        }
      `,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    /* ── Mouse interaction ── */
    const mouse = new THREE.Vector2(-9999, -9999)
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    }
    const onMouseLeave = () => { mouse.set(-9999, -9999) }
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)

    /* ── Animation loop ── */
    let time = 0
    let raf: number
    const raycaster = new THREE.Raycaster()
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
    const mouseWorld = new THREE.Vector3()

    const tick = () => {
      raf = requestAnimationFrame(tick)
      time += 0.016
      material.uniforms.uTime.value = time

      // Project mouse to world space
      raycaster.setFromCamera(mouse, camera)
      raycaster.ray.intersectPlane(plane, mouseWorld)

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const ix = i * 3
        const ox = origin[ix], oy = origin[ix + 1], oz = origin[ix + 2]

        // Perlin idle drift
        const drift = noise(ox * 1.5 + time * 0.3, oy * 1.5, oz + time * 0.2) * 0.012

        // Repulsion
        const dx = positions[ix] - mouseWorld.x
        const dy = positions[ix + 1] - mouseWorld.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < REPULSION_RADIUS && dist > 0.001) {
          const force = REPULSION_STRENGTH * (1 - dist / REPULSION_RADIUS) ** 2
          velocities[ix] += (dx / dist) * force
          velocities[ix + 1] += (dy / dist) * force
        }

        // Spring back to origin
        velocities[ix] += (ox - positions[ix]) * SPRING_STIFFNESS + drift
        velocities[ix + 1] += (oy - positions[ix + 1]) * SPRING_STIFFNESS
        velocities[ix + 2] += (oz - positions[ix + 2]) * SPRING_STIFFNESS

        // Damping
        velocities[ix] *= DAMPING
        velocities[ix + 1] *= DAMPING
        velocities[ix + 2] *= DAMPING

        positions[ix] += velocities[ix]
        positions[ix + 1] += velocities[ix + 1]
        positions[ix + 2] += velocities[ix + 2]
      }

      posAttr.needsUpdate = true
      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  )
}
