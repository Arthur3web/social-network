import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Эффект белого шума (CRT noise) на весь контент
const CRTWhiteNoiseFull: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [frames, setFrames] = useState<string[]>([]);
  useEffect(() => {
    // Генерируем 10 кадров "шума"
    const genNoise = () => {
      const arr: string[] = [];
      for (let i = 0; i < 10; i++) {
        let dots = "";
        for (let j = 0; j < 6000; j++) {
          const x = Math.random() * 1920;
          const y = Math.random() * 1080;
          const gray = Math.floor(Math.random() * 200 + 55);
          dots += `<rect x="${x}" y="${y}" width="2" height="2" fill="rgb(${gray},${gray},${gray})" />`;
        }
        arr.push(
          `data:image/svg+xml;utf8,<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg" style="background:#fff">${dots}</svg>`
        );
      }
      return arr;
    };
    setFrames(genNoise());
    const timeout = setTimeout(onFinish, 1200);
    return () => clearTimeout(timeout);
  }, [onFinish]);

  const [frame, setFrame] = useState(0);
  useEffect(() => {
    if (frames.length === 0) return;
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % frames.length);
    }, 60);
    return () => clearInterval(interval);
  }, [frames]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 10,
        background: "#fff",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {frames.length > 0 && (
        <img
          src={frames[frame]}
          alt="noise"
          style={{
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            display: "block",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
      )}
      {/* CRT scanlines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "repeating-linear-gradient(0deg,rgba(0,0,0,0.08) 0px,rgba(0,0,0,0.08) 1px,transparent 1.5px,transparent 4px)",
          zIndex: 11,
        }}
      />
    </div>
  );
};

const LoginCRT = () => {
  const [showNoise, setShowNoise] = useState(true);
  const navigate = useNavigate();

  // ENTER для входа
  useEffect(() => {
    if (!showNoise) {
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
          navigate("/");
        }
      };
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }
  }, [showNoise, navigate]);

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
      {showNoise && <CRTWhiteNoiseFull onFinish={() => setShowNoise(false)} />}
      {!showNoise && (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#00ffe7",
            fontFamily: "'VT323', 'Fira Mono', monospace",
            fontSize: 32,
            letterSpacing: 2,
            textShadow: "0 0 8px #00ffe7, 0 0 2px #fff",
            userSelect: "none",
          }}
        >
          PRESS ENTER TO LOGIN
        </div>
      )}
    </div>
  );
};

export default LoginCRT;