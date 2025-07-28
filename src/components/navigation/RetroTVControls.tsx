import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

type Channel = {
  name: string;
  path: string;
};

const channels: Channel[] = [
  { name: "PROFILE", path: "/" },
  { name: "POSTS", path: "/posts" },
  { name: "MESSAGES", path: "/messages" },
  { name: "SETTINGS", path: "/settings" },
  { name: "ABOUT", path: "/about" },
  { name: "CONTACT", path: "/contact" },
];

const RetroTVControls: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentChannel, setCurrentChannel] = useState<number>(0);
  const [powerOn, setPowerOn] = useState<boolean>(true);

  useEffect(() => {
    const index = channels.findIndex((c) => c.path === location.pathname);
    if (index !== -1) setCurrentChannel(index);
  }, [location.pathname]);

  const changeChannel = (index: number) => {
    setCurrentChannel(index);
    navigate(channels[index].path);
  };

  const handlePowerOn = () => {
    if (!powerOn) {
      setPowerOn(true);
      navigate("/loginCRT");
    }
  };

  const handlePowerOff = () => {
    if (powerOn) {
      setPowerOn(false);
      localStorage.removeItem("token");
      navigate("/logout");
    }
  };

  return (
    <div className="tv-panel">
      {/* Индикатор */}
      <div className="channel-indicator">{powerOn ? currentChannel + 1 : "--"}</div>

      {/* Кнопки каналов */}
      <div className="channel-buttons">
        {channels.map((channel, index) => (
          <button
            key={index}
            className={`channel-button ${currentChannel === index ? "active" : ""}`}
            disabled={!powerOn}
            onClick={() => changeChannel(index)}
          >
            {channel.name}
          </button>
        ))}
      </div>

      {/* Кнопки питания */}
      <div className="power-buttons">
        <button
          className={`power-btn black ${powerOn ? "pressed" : ""}`}
          onClick={handlePowerOn}
          title="Login (Power ON)"
          disabled={powerOn}
        >
          {powerOn ? "" : "Войти"}
        </button>
        <button
          className={`power-btn red ${!powerOn ? "pressed" : ""}`}
          onClick={handlePowerOff}
          title="Logout (Power OFF)"
          disabled={!powerOn}
        >
          {!powerOn ? "" : "Выйти"}
        </button>
      </div>
    </div>
  );
};

export default RetroTVControls;
