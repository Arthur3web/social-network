import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Image } from "antd";

type Channel = {
  name: string;
  path: string;
  gif: string; // Добавляем поле для гифки
};

const channels: Channel[] = [
  { name: "PROFILE", path: "/", gif: "/AI Robot.gif" },
  { name: "POSTS", path: "/posts", gif: "/Astronaut & Book 2.0 (Reloaded).gif" },
  { name: "MESSAGES", path: "/messages", gif: "/Speak out.gif" },
  { name: "SETTINGS", path: "/settings", gif: "/user.gif" },
  { name: "ABOUT", path: "/about", gif: "/Olympic Boxing.gif" },
  { name: "CONTACT", path: "/contact", gif: "/8-bit Cat.gif" },
];

interface RetroTVControlsProps {
  onNavigate: (navigateFunc: () => void) => void;
}

const RetroTVControls: React.FC<RetroTVControlsProps> = ({ onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentChannel, setCurrentChannel] = useState<number>(0);
  const [powerOn, setPowerOn] = useState<boolean>(true);

  const handleClick = (path: string) => {
    onNavigate(() => navigate(path));
  };
  
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
      {/* Индикатор с гифкой */}
      <div className="channel-indicator">
  {powerOn ? (
    <div style={{
      // width: '100%', // Занимает всю ширину родителя
      height: '100%', // Занимает всю высоту родителя
      overflow: 'hidden', // Обрезаем лишнее, если гифка не пропорциональна
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      // border: '2px solid #0f0',
      backgroundColor: '#000'
    }}>
      <img 
        src={channels[currentChannel].gif}
        alt="Channel indicator"
        style={{
          width: '100%', // Растягиваем на всю ширину контейнера
          height: 'auto', // Сохраняем пропорции
          objectFit: 'cover', // Заполняем контейнер, обрезая лишнее
          imageRendering: 'pixelated'
        }}
      />
    </div>
  ) : (
    <div style={{ 
      width: '100%', 
      height: '100%',
      backgroundColor: '#000',
      border: '2px solid #666',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#666',
      fontSize: '24px'
    }}>
      OFF
    </div>
  )}
</div>

      {/* Кнопки каналов */}
      <div className="channel-buttons">
        {channels.map((channel, index) => (
          <div key={index} className="channel-row">
            <button
              className={`channel-button ${currentChannel === index ? "active" : ""}`}
              disabled={!powerOn}
              onClick={() => changeChannel(index)}
            />
            <span className={`channel-label ${currentChannel === index ? "active" : ""}`}>
              {channel.name}
            </span>
          </div>
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