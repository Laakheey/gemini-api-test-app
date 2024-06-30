import { useContext } from "react";
import { Context } from "../../context/Context";
import "./main.css";

const Cards = [
  {
    details: "Suggest beautiful places to see an upcoming road trip",
    src: "/assets/compass_icon.png",
  },
  {
    details: "Briefly summarize this concept: urban planning",
    src: "/assets/bulb_icon.png",
  },
  {
    details: "Brainstorm team bonding the activities for our work retreat",
    src: "/assets/message_icon.png",
  },
  {
    details: "Improve the readability of the following code",
    src: "/assets/code_icon.png",
  },
];

const Main = () => {
  const context = useContext(Context);
  if (!context) {
    return <div>Loading...</div>;
  }
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    setRecentPrompt
  } = context;

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src="/assets/user_icon.png" alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              {Cards.map((card, index) => (
                <div
                  className="card"
                  key={index}
                  onClick={() =>{
                    setRecentPrompt(card.details)
                    onSent(card.details, true)
                  }}
                >
                  <p>{card.details}</p>
                  <img src={card.src} alt="" />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src="/assets/user_icon.png" alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src="/assets/gemini_icon.png" alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <>
                  <p dangerouslySetInnerHTML={{ __html: resultData }} />
                </>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter a prompt here"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
            <div className="">
              {input && (
                <img
                  src="/assets/send_icon.png"
                  alt=""
                  onClick={() => onSent("")}
                />
              )}
            </div>
          </div>
          <div className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
