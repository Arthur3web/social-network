import React, { useState } from "react";
import { Layout, Avatar } from "antd";
import NavigationButtons from "./NavigationButton";
import { rootStore } from "../../stores/RootStore";
import { observer } from "mobx-react-lite";
import RetroTVControls from "./RetroTVControls";
// import GearNavigation from "./GearNavigation";

const { Sider } = Layout;

const NavigationPanel: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigation = (navigateFunc: () => void) => {
    setIsLoading(true);
    // Имитация задержки загрузки (можно удалить в продакшене)
    setTimeout(() => {
      navigateFunc();
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <Sider width={180} theme="dark" className="control-panel">
      {/* <div className="user-profile">
        {rootStore.currentUser && (
          <>
            <div>{rootStore.currentUser.username}</div>
            <div>
              <img
                src={rootStore.currentUser.avatar}
                alt="User avatar"
                width={180}
                height={180}
              />
            </div>
          </>
        )}
      </div> */}

      <div className="navigation-buttons">
        {isLoading ? (
          <div className="loading-overlay">
            <img 
              src="/LOADING 3D TEXT.gif" 
              alt="Loading..." 
              className="loading-animation"
            />
          </div>
        ) : null}
        {/* <NavigationButtons /> */}
        {/* <GearNavigation/> */}
        <RetroTVControls onNavigate={handleNavigation}/>
      </div>
    </Sider>
  );
};

export default observer(NavigationPanel);
