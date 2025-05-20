import React from "react";
import "./App.css";
import { StoreProvider } from "./stores/StoreContext";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import ProfileAccount from "./pages/ProfileAccount";
import { Layout } from "antd";
import PostList from "./pages/PostList";

const { Sider, Content } = Layout;

const NavigationButtons = () => {
  const navigate = useNavigate();
  
  return (
    <div className="control-buttons">
      <button 
        className="retro-btn active" 
        onClick={() => navigate('/')}
      >
        PROFILE
      </button>
      <button 
        className="retro-btn"
        onClick={() => navigate('/posts')}
      >
        POSTS
      </button>
      <button className="retro-btn power-btn">
        LOGOUT
      </button>
    </div>
  );
};

function App() {
  return (
    <StoreProvider>
      <Router>
        <Layout className="social-network-layout">
          <Content className="social-network-content">
            <Routes>
              <Route path="/posts" element={<PostList />} />
              <Route path="/" element={<ProfileAccount />} />
            </Routes>
          </Content>

          <Sider className="control-panel">
            <NavigationButtons />
          </Sider>
        </Layout>
      </Router>
    </StoreProvider>
  );
}

export default App;