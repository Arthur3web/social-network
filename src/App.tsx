import React from "react";
import "./App.css";
import { StoreProvider } from "./stores/StoreContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfileAccount from "./pages/ProfileAccount";
import { Layout } from "antd";
import PostList from "./pages/PostList";
import NavigationPanel from "./components/navigation/NavigationPanel";
import Login from "./pages/Login";

const { Content } = Layout;

function App() {
  return (
    <StoreProvider>
      <Router>
        <Layout className="social-network-layout">
          <Content className="social-network-content">
            <Routes>
              <Route path="/posts" element={<PostList />} />
              <Route path="/" element={<ProfileAccount />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Content>

          <NavigationPanel />
        </Layout>
      </Router>
    </StoreProvider>
  );
}

export default App;
