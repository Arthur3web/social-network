import React, { useEffect, useRef, useState } from "react";

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
        borderRadius: "inherit",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1920 1080"
        style={{
          width: "100%",
          height: "100%",
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
          borderRadius: "inherit",
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
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    canvas.width = w;
    canvas.height = h;

    function drawNoise() {
      if (!running || !ctx) return;
      const imgData = ctx.createImageData(w, h);
      for (let i = 0; i < imgData.data.length; i += 4) {
        const gray = Math.floor(Math.random() * 180 + 40);
        let r = gray, g = gray, b = gray;
        if (Math.random() < 0.01) {
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

    function loop() {
      if (!running) return;
      drawNoise();
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
        width: "100%",
        height: "100%",
        zIndex: 10,
        background: "#fff",
        display: "block",
        pointerEvents: "none",
        imageRendering: "pixelated",
        borderRadius: "inherit",
      }}
    />
  );
};

// Страница входа в стиле God of War Ragnarok, не выходящая за рамки контента
const StyledLogin = () => {
  const [error, setError] = useState("");
  // Можно добавить обработку YES/NO
  const handleYes = () => {
    setError("");
    // navigate("/"); // переход на главную
  };
  const handleNo = () => {
    setError("Login cancelled");
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 540,
        margin: "0 auto",
        background: "transparent",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Montserrat, 'Segoe UI', 'Fira Mono', monospace",
        color: "#fff",
        textAlign: "center",
        boxSizing: "border-box",
        padding: "0 16px",
      }}
    >
      {/* Жёлтая полоса с заголовком */}
      <div
        style={{
          width: "100%",
          maxWidth: 540,
          background: "linear-gradient(90deg, #ffce3e 80%, #ffe98a 100%)",
          color: "#181818",
          fontWeight: 900,
          fontSize: 28,
          letterSpacing: 2,
          padding: "16px 0 10px 0",
          borderRadius: "8px 8px 0 0",
          boxShadow: "0 2px 16px #000a",
          textShadow: "0 2px 8px #ffe98a88",
          borderBottom: "2px solid #fff2",
          fontFamily: "Montserrat, 'Segoe UI', 'Fira Mono', monospace",
          textTransform: "uppercase",
          margin: "0 auto",
        }}
      >
        CONNECT TO SOCIAL QUEST
      </div>
      {/* Описание */}
      <div
        style={{
          background: "#181818",
          width: "100%",
          maxWidth: 540,
          margin: "0 auto",
          padding: "28px 0 20px 0",
          fontSize: 18,
          borderRadius: "0 0 8px 8px",
          borderBottom: "2px solid #fff2",
          borderLeft: "2px solid #fff2",
          borderRight: "2px solid #fff2",
          boxShadow: "0 8px 32px #000a",
        }}
      >
        Would you like to log in to your Social Quest account?
        <div style={{ marginTop: 24, display: "flex", justifyContent: "center", gap: 40 }}>
          <button
            type="button"
            onClick={handleYes}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "linear-gradient(90deg, #ffce3e 80%, #ffe98a 100%)",
              color: "#181818",
              border: "none",
              borderRadius: 6,
              fontWeight: 900,
              fontSize: 20,
              padding: "10px 36px",
              cursor: "pointer",
              boxShadow: "0 0 12px #ffe98a88",
              letterSpacing: 2,
              textTransform: "uppercase",
              transition: "filter 0.15s",
              outline: "none",
            }}
          >
            <span style={{
              fontSize: 18,
              background: "#181818",
              borderRadius: 4,
              padding: "2px 8px",
              marginRight: 8,
              border: "2px solid #ffce3e",
              fontWeight: 700,
              fontFamily: "monospace",
              letterSpacing: 1,
            }}>⏎</span>
            YES
          </button>
          <button
            type="button"
            onClick={handleNo}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "none",
              color: "#fff",
              border: "2px solid #fff2",
              borderRadius: 6,
              fontWeight: 900,
              fontSize: 20,
              padding: "10px 36px",
              cursor: "pointer",
              letterSpacing: 2,
              textTransform: "uppercase",
              transition: "background 0.15s, color 0.15s",
              outline: "none",
            }}
          >
            <span style={{
              fontSize: 18,
              background: "#181818",
              borderRadius: 4,
              padding: "2px 8px",
              marginRight: 8,
              border: "2px solid #fff2",
              fontWeight: 700,
              fontFamily: "monospace",
              letterSpacing: 1,
              color: "#fff"
            }}>ESC</span>
            NO
          </button>
        </div>
        {error && (
          <div
            style={{
              color: "#ffce3e",
              fontWeight: 700,
              fontSize: 15,
              marginTop: 20,
              textShadow: "0 0 8px #000",
              letterSpacing: 1,
            }}
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

const LoginCRT = () => {
  const [phase, setPhase] = useState<"star" | "noise" | "login">("star");

  useEffect(() => {
    if (phase === "star") {
      const timeout = setTimeout(() => setPhase("noise"), 1100);
      return () => clearTimeout(timeout);
    }
    if (phase === "noise") {
      const timeout = setTimeout(() => setPhase("login"), 1200);
      return () => clearTimeout(timeout);
    }
  }, [phase]);

  // Контейнер для ограничения по размеру родителя (social-network-content)
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: 360,
        minWidth: 320,
        background: "#000",
        borderRadius: 16,
        overflow: "hidden",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {phase === "star" && <StarExplosion onFinish={() => setPhase("noise")} />}
      {phase === "noise" && <AnalogNoise onFinish={() => setPhase("login")} />}
      {phase === "login" && <StyledLogin />}
    </div>
  );
};

export default LoginCRT;