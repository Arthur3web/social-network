import { observer } from "mobx-react-lite";
import { rootStore } from "../stores/RootStore";
import { Button, Divider } from "antd";
import {
  MessageOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import React from "react";

const CRTEffect = () => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(
      rgba(18, 16, 16, 0) 50%, 
      rgba(0, 0, 0, 0.25) 50%
    )`,
    backgroundSize: '100% 4px',
    zIndex: -1,
    pointerEvents: 'none',
    opacity: 0.3
  }} />
);

const ProfileAccount = () => {
  if (!rootStore.currentUser) return null;

  const { currentUser } = rootStore;
  const userBio = "bio" in currentUser ? (currentUser as any).bio : "No information";
  const registerDate = "createdAt" in currentUser 
    ? new Date((currentUser as any).createdAt).toLocaleDateString() 
    : "Unknown";

  return (
    <div style={{
      // minHeight: '100vh',
      height: '100%',
      // background: '#0f0f23',
      color: '#0f0',
      fontFamily: '"Courier New", monospace',
      position: 'relative',
    }}>
      <CRTEffect />
      
      {/* Scanlines */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(
          to bottom,
          rgba(0, 255, 0, 0.03) 0%,
          rgba(0, 0, 0, 0) 5%
        )`,
        backgroundSize: '100% 4px',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{
        display: 'flex',
        // maxWidth: '800px',
        // margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Левая колонка */}
        <div style={{
          width: '200px',
          borderRight: '2px dotted #0f0',
          paddingRight: '20px',
          marginRight: '20px'
        }}>
          <div style={{
            // border: '3px solid #0f0',
            padding: '2px',
            marginBottom: '20px',
            // boxShadow: '0 0 10px #0f0'
          }}>
            <img 
              src={currentUser.avatar} 
              alt="Avatar" 
              style={{
                width: '100%',
                height: 'auto',
                imageRendering: 'pixelated'
              }} 
            />
            {/* <img 
              src="/LOADING 3D TEXT.gif" 
              alt="Loading..." 
              className="loading-animation"
            /> */}
          </div>

          <div style={{
            border: '1px solid #0f0',
            padding: '10px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            <h3 style={{
              margin: '0 0 10px 0',
              color: '#0f0',
              fontSize: '16px'
            }}>{currentUser.username}</h3>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <Button 
                icon={<MessageOutlined />}
                style={{
                  background: '#0f0',
                  color: '#000',
                  border: 'none',
                  fontFamily: '"Courier New", monospace',
                  fontWeight: 'bold'
                }}
              >
                MSG
              </Button>
              <Button 
                icon={<UserAddOutlined />}
                style={{
                  background: 'transparent',
                  color: '#0f0',
                  border: '1px solid #0f0',
                  fontFamily: '"Courier New", monospace',
                  fontWeight: 'bold'
                }}
              >
                ADD
              </Button>
            </div>
          </div>

          <div style={{
            border: '1px solid #0f0',
            padding: '10px',
            fontSize: '12px'
          }}>
            <div>LEVEL: 8</div>
            <div>XP: 3200/4000</div>
            <div style={{
              height: '4px',
              background: '#333',
              margin: '5px 0'
            }}>
              <div style={{
                width: '80%',
                height: '100%',
                background: '#0f0'
              }}></div>
            </div>
          </div>
        </div>

        {/* Правая колонка */}
        <div style={{ flex: 1 }}>
          <h2 style={{
            borderBottom: '1px solid #0f0',
            paddingBottom: '5px',
            fontSize: '18px',
            marginTop: '0'
          }}>USER PROFILE</h2>

          <Divider style={{
            borderColor: '#0f0',
            color: '#0f0',
            fontFamily: '"Courier New", monospace'
          }}>BIO</Divider>

          <div style={{
            background: 'rgba(0, 255, 0, 0.05)',
            border: '1px dotted #0f0',
            padding: '15px',
            marginBottom: '20px',
            lineHeight: '1.5'
          }}>
            {userBio}
          </div>

          <Divider style={{
            borderColor: '#0f0',
            color: '#0f0',
            fontFamily: '"Courier New", monospace'
          }}>STATS</Divider>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '10px',
            marginBottom: '20px'
          }}>
            <div style={{
              border: '1px solid #0f0',
              padding: '10px'
            }}>
              <div style={{ fontSize: '12px' }}>JOINED</div>
              <div style={{ fontWeight: 'bold' }}>{registerDate}</div>
            </div>

            <div style={{
              border: '1px solid #0f0',
              padding: '10px'
            }}>
              <div style={{ fontSize: '12px' }}>RANK</div>
              <div style={{ fontWeight: 'bold' }}>HACKER</div>
            </div>
          </div>

          <div style={{
            border: '1px solid #0f0',
            padding: '10px',
            fontSize: '12px'
          }}>
            <div style={{ marginBottom: '5px' }}>SYSTEM STATUS:</div>
            <div style={{ color: '#0f0' }}>● ONLINE</div>
            <div style={{ color: '#0f0' }}>● ENCRYPTED</div>
            <div style={{ color: '#ff0' }}>● WARNING: 2 ALERTS</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(ProfileAccount);