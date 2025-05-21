import React from "react";
import { Layout, Avatar } from "antd";
import NavigationButtons from "./NavigationButton";
import { rootStore } from "../../stores/RootStore";
import { observer } from "mobx-react-lite";

const { Sider } = Layout;

const NavigationPanel: React.FC = () => {
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
        <NavigationButtons />
      </div>
    </Sider>
  );
};

export default observer(NavigationPanel);
