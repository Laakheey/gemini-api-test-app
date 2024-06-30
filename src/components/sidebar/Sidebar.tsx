import { useContext, useState } from "react";
import "./Sidebar.css";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const context = useContext(Context);
  if (!context) {
    return <div>Loading...</div>;
  }

  const { onSent, previousPrompt, setRecentPrompt, newChat } = context;

  const loadPrompt  = async (prompt: string) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  }

  return (
    <div className="sidebar">
      <div className="top">
        <img
          src="/assets/menu_icon.png"
          alt=""
          className="menu"
          onClick={() => setExtended(!extended)}
        />
        <div className="new-chat" onClick={newChat}>
          <img src="/assets/plus_icon.png" alt="" className="" />
          {extended ? <p>New Chat</p> : <></>}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {previousPrompt.map((prev, index) => (
              <div key={index} hidden={index === 0} onClick={() => loadPrompt(prev)}>
                <div className={`recent-entry`}>
                  <img src="/assets/message_icon.png" alt="" />
                  <p>{prev.slice(0, 18)}...</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src="/assets/question_icon.png" alt="" />
          {extended ? <p>Help</p> : <></>}
        </div>
        <div className="bottom-item recent-entry">
          <img src="/assets/history_icon.png" alt="" />
          {extended ? <p>Activity</p> : <></>}
        </div>
        <div className="bottom-item recent-entry">
          <img src="/assets/setting_icon.png" alt="" />
          {extended ? <p>Settings</p> : <></>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
