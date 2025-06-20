import React, { useEffect, useState } from "react";

const CRTEffect = () => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `linear-gradient(
        rgba(18, 16, 16, 0) 50%, 
        rgba(0, 0, 0, 0.25) 50%
      )`,
      backgroundSize: "100% 4px",
      zIndex: 2,
      pointerEvents: "none",
      opacity: 0.3,
      mixBlendMode: "screen",
    }}
  />
);

const CRTPowerOn = ({ onFinish }: { onFinish: () => void }) => {
  // Эффект включения: затемнение и "разгорание" экрана
  const [phase, setPhase] = useState<"off" | "flash" | "on">("off");

  useEffect(() => {
    setTimeout(() => setPhase("flash"), 600);
    setTimeout(() => setPhase("on"), 1600);
    setTimeout(onFinish, 2200);
  }, [onFinish]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: phase === "off"
          ? "#000"
          : phase === "flash"
          ? "radial-gradient(ellipse at center, #fff 0%, #00ffcc 40%, #000 100%)"
          : "#000",
        transition: "background 0.7s cubic-bezier(.4,2,.6,1)",
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      {phase === "flash" && (
        <div
          style={{
            width: "100vw",
            height: "8vh",
            background: "linear-gradient(0deg, #fff 0%, #00ffe7 100%)",
            filter: "blur(2px)",
            opacity: 0.8,
            borderRadius: "50%",
            boxShadow: "0 0 80px 40px #00ffe7, 0 0 200px 80px #fff",
            animation: "crt-flash 0.7s linear",
          }}
        />
      )}
      <style>
        {`
          @keyframes crt-flash {
            0% { opacity: 0; }
            30% { opacity: 1; }
            100% { opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

const HeroScene = () => (
  <div
    style={{
      width: 340,
      height: 260,
      margin: "0 auto",
      position: "relative",
      zIndex: 2,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      background:
        "linear-gradient(to top, #222 70%, #333 100%)",
      border: "2px solid #0f0",
      borderRadius: 12,
      boxShadow: "0 0 32px #00ffe7aa",
      overflow: "hidden",
    }}
  >
    {/* Земля */}
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 60,
        background:
          "repeating-linear-gradient(90deg, #0f0 0 2px, transparent 2px 16px)",
        opacity: 0.15,
      }}
    />
    {/* Герой с мечом */}
    <svg
      width={120}
      height={180}
      viewBox="0 0 120 180"
      style={{
        position: "absolute",
        left: "50%",
        bottom: 0,
        transform: "translateX(-50%)",
        filter: "drop-shadow(0 0 8px #00ffe7)",
      }}
    >
      {/* Тело */}
      <ellipse cx="60" cy="120" rx="22" ry="38" fill="#ffe0b2" stroke="#333" strokeWidth="2" />
      {/* Голова */}
      <circle cx="60" cy="70" r="18" fill="#ffe0b2" stroke="#333" strokeWidth="2" />
      {/* Глаза */}
      <ellipse cx="54" cy="74" rx="2.5" ry="4" fill="#222" />
      <ellipse cx="66" cy="74" rx="2.5" ry="4" fill="#222" />
      {/* Меч */}
      <g>
        {/* Лезвие */}
        <rect x="90" y="40" width="6" height="60" fill="#b2f7ff" stroke="#00ffe7" strokeWidth="2">
          <animateTransform attributeName="transform" type="rotate" values="0 93 40; -10 93 40; 0 93 40" dur="1.2s" repeatCount="indefinite" />
        </rect>
        {/* Рукоять */}
        <rect x="87" y="95" width="12" height="8" fill="#c9a13b" stroke="#333" strokeWidth="2" />
      </g>
      {/* Рука с мечом */}
      <rect x="78" y="90" width="18" height="8" rx="4" fill="#ffe0b2" stroke="#333" strokeWidth="2">
        <animateTransform attributeName="transform" type="rotate" values="0 78 94; -10 78 94; 0 78 94" dur="1.2s" repeatCount="indefinite" />
      </rect>
      {/* Левая рука */}
      <rect x="20" y="90" width="18" height="8" rx="4" fill="#ffe0b2" stroke="#333" strokeWidth="2" />
      {/* Плащ */}
      <path d="M60 90 Q90 130 60 170 Q30 130 60 90" fill="#00ffe7" fillOpacity="0.25" />
      {/* Пояс */}
      <rect x="45" y="140" width="30" height="8" rx="4" fill="#333" />
      {/* Ноги */}
      <rect x="48" y="158" width="8" height="18" rx="4" fill="#ffe0b2" stroke="#333" strokeWidth="2" />
      <rect x="64" y="158" width="8" height="18" rx="4" fill="#ffe0b2" stroke="#333" strokeWidth="2" />
    </svg>
    {/* Логотип/надпись */}
    <div
      style={{
        position: "absolute",
        top: 18,
        left: 0,
        width: "100%",
        textAlign: "center",
        fontFamily: "'VT323', 'Fira Mono', monospace",
        fontSize: 32,
        color: "#00ffe7",
        textShadow: "0 0 8px #00ffe7, 0 0 2px #fff",
        letterSpacing: 2,
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      SOCIAL QUEST
    </div>
    {/* Мигающий курсор */}
    <div
      style={{
        position: "absolute",
        bottom: 18,
        left: "50%",
        transform: "translateX(-50%)",
        fontFamily: "'VT323', 'Fira Mono', monospace",
        fontSize: 22,
        color: "#00ffe7",
        textShadow: "0 0 8px #00ffe7",
        letterSpacing: 1,
        userSelect: "none",
        pointerEvents: "none",
        animation: "blink-cursor 1s steps(2, start) infinite",
      }}
    >
       PRESS ENTER TO LOGIN
      <style>
        {`
          @keyframes blink-cursor {
            0% { opacity: 1; }
            50% { opacity: 0.2; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  </div>
);

const LoginCRT = ({ onLogin }: { onLogin: () => void }) => {
  const [powerOn, setPowerOn] = useState(true);

  // После анимации включения ПК ждём нажатия Enter
  useEffect(() => {
    if (!powerOn) {
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
          onLogin();
        }
      };
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }
  }, [powerOn, onLogin]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <CRTEffect />
      {powerOn && <CRTPowerOn onFinish={() => setPowerOn(false)} />}
      {!powerOn && <HeroScene />}
    </div>
  );
};

export default LoginCRT;