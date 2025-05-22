import { useNavigate } from "react-router-dom";

const NavigationButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="control-buttons">
      <button className="retro-btn active" onClick={() => navigate("/")}>
        PROFILE
      </button>
      <button className="retro-btn" onClick={() => navigate("/posts")}>
        POSTS
      </button>
      <button
        className="retro-btn power-btn"
        onClick={() => navigate("/login")}
      >
        LOGOUT
      </button>
    </div>
  );
};

export default NavigationButtons;
