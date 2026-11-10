import { useEffect, useRef } from 'react';

const COLORS = ['#c9a44c', '#e8d49b', '#f4ebdd', '#d94a3a', '#ffffff'];

/** Confeti en canvas a pantalla completa. Cambia `burst` para lanzar otra tanda. */
export function Confetti({ burst }: { burst: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
    };
    resize();
    addEventListener('resize', resize);

    const make = (fromTop: boolean) => ({
      x: Math.random() * innerWidth,
      y: fromTop ? -20 : innerHeight * 0.55,
      vx: (Math.random() - 0.5) * (fromTop ? 3 : 14),
      vy: fromTop ? 2 + Math.random() * 3 : -8 - Math.random() * 12,
      w: 6 + Math.random() * 7,
      h: 4 + Math.random() * 6,
      r: Math.random() * 6,
      vr: (Math.random() - 0.5) * 0.3,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
    });
    const parts = Array.from({ length: 160 }, () => make(false));
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      if (now - start < 7000 && parts.length < 260) for (let i = 0; i < 3; i++) parts.push(make(true));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.vy += 0.18; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
        if (p.y > innerHeight + 30) { parts.splice(i, 1); continue; }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      if (parts.length) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize); };
  }, [burst]);

  return <canvas ref={ref} className="confetti" aria-hidden="true" />;
}
