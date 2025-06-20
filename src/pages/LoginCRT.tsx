import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Эффект взрыва звезды (анимированная вспышка)
const StarExplosion: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  useEffect(() => {
    const timeout = setTimeout(onFinish, 1100);
    return () => clearTimeout(timeout);
  }, [onFinish]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 20,
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <svg
        width="100vw"
        height="100vh"
        viewBox="0 0 1920 1080"
        style={{
          width: "100vw",
          height: "100vh",
          display: "block",
        }}
      >
        <radialGradient id="star-explosion" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="40%" stopColor="#fff" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#ffe600" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <circle
          cx="960"
          cy="540"
          r="0"
          fill="url(#star-explosion)"
        >
          <animate
            attributeName="r"
            from="0"
            to="1200"
            dur="0.7s"
            fill="freeze"
            keySplines="0.2 0.8 0.2 1"
            calcMode="spline"
          />
          <animate
            attributeName="opacity"
            from="1"
            to="0"
            begin="0.7s"
            dur="0.4s"
            fill="freeze"
          />
        </circle>
      </svg>
      {/* Вспышка белого цвета поверх */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#fff",
          opacity: 0,
          animation: "star-flash 0.4s 0.7s forwards",
          zIndex: 21,
        }}
      />
      <style>
        {`
          @keyframes star-flash {
            0% { opacity: 0; }
            10% { opacity: 1; }
            100% { opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

// Абстрактный аналоговый шум (canvas)
const AnalogNoise: React.FC<{ duration?: number; onFinish?: () => void }> = ({
  duration = 1200,
  onFinish,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let running = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    function drawNoise() {
      if (!running || !ctx) return;
      const imgData = ctx.createImageData(w, h);
      for (let i = 0; i < imgData.data.length; i += 4) {
        // Случайный серый + редкие цветные пиксели
        const gray = Math.floor(Math.random() * 180 + 40);
        let r = gray, g = gray, b = gray;
        if (Math.random() < 0.01) {
          // Цветные помехи
          r = Math.floor(Math.random() * 256);
          g = Math.floor(Math.random() * 256);
          b = Math.floor(Math.random() * 256);
        }
        imgData.data[i] = r;
        imgData.data[i + 1] = g;
        imgData.data[i + 2] = b;
        imgData.data[i + 3] = 255;
      }
      ctx.putImageData(imgData, 0, 0);

      // "Плавающие" горизонтальные полосы-помехи
      for (let i = 0; i < 6; i++) {
        const y = Math.random() * h;
        ctx.globalAlpha = Math.random() * 0.18 + 0.08;
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, y, w, Math.random() * 8 + 2);
        ctx.globalAlpha = 1;
      }

      // Эффект сканирующих линий
      ctx.globalAlpha = 0.08;
      for (let y = 0; y < h; y += 3) {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, y, w, 1);
      }
      ctx.globalAlpha = 1;
    }

    let frame = 0;
    function loop() {
      if (!running) return;
      drawNoise();
      frame++;
      requestAnimationFrame(loop);
    }
    loop();

    const timer = setTimeout(() => {
      running = false;
      onFinish && onFinish();
    }, duration);

    return () => {
      running = false;
      clearTimeout(timer);
    };
  }, [duration, onFinish]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 10,
        background: "#fff",
        display: "block",
        pointerEvents: "none",
        imageRendering: "pixelated",
      }}
    />
  );
};

const LoginCRT = () => {
  const [phase, setPhase] = useState<"star" | "noise" | "done">("star");
  const navigate = useNavigate();

  // Смена фаз: взрыв -> шум -> переход
  useEffect(() => {
    if (phase === "star") {
      const timeout = setTimeout(() => setPhase("noise"), 1100);
      return () => clearTimeout(timeout);
    }
    if (phase === "noise") {
      const timeout = setTimeout(() => setPhase("done"), 1200);
      return () => clearTimeout(timeout);
    }
    if (phase === "done") {
      navigate("/login");
    }
  }, [phase, navigate]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: 0,
        minWidth: 0,
        position: "relative",
        background: "#111",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        borderRadius: 0,
      }}
    >
      {phase === "star" && <StarExplosion onFinish={() => setPhase("noise")} />}
      {phase === "noise" && <AnalogNoise />}
    </div>
  );
};

export default LoginCRT;