import React from 'react';
import { Layout, Avatar } from 'antd';
import NavigationButton from './NavigationButton';
import { observer } from 'mobx-react-lite';

const { Sider } = Layout;

const NavigationPanel: React.FC = () => {
  return (
    <Sider width={180} theme="dark" className="navigation-panel">
      <div className="user-profile">
        <Avatar
          src="https://i.pravatar.cc/80"
          size={64}
          className="user-avatar"
        />
        <div className="username">Username</div>
      </div>

      <div className="navigation-buttons">
        <NavigationButton icon="feed" label="Feed" path="/" />
        <NavigationButton icon="profile" label="Profile" path="/profile" />
        <NavigationButton icon="friends" label="Friends" path="/friends" />
        <NavigationButton icon="messages" label="Messages" path="/messages" />
      </div>
    </Sider>
  );
};

export default NavigationPanel;