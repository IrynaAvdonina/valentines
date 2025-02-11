import { useState, useEffect, MouseEvent } from "react";
import "./App.css";
import happyGif from './../public/happy.gif';
function ValentineBackground({ type }: { type: "hearts" | "gradient" })
{
  useEffect(() =>
  {
    if (type === "hearts")
    {
      const interval = setInterval(() =>
      {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = Math.random() * 2 + 3 + "s";
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
      }, 300);
      return () =>
      {
        clearInterval(interval);
        document.querySelectorAll(".heart").forEach(el => el.remove());

      }
    }
  }, [type]);

  return <div className={`background ${type}`}></div>;
}

export default function ValentinePage()
{
  const [accepted, setAccepted] = useState(false);
  const [noClicked, setNoClicked] = useState(0);
  const [noPosition, setNoPosition] = useState({ top: "50%", left: "50%" });
  const [isMoving, setIsMoving] = useState(false);

  const handleYesClick = () =>
  {
    setAccepted(true);
    const audio = new Audio("/valentines.mp3");
    audio.loop = true;
    audio.play();
  };

  const moveNoButton = () =>
  {
    const randomX = Math.random() * 80 + "%";
    const randomY = Math.random() * 80 + "%";
    setNoPosition({ top: randomY, left: randomX });
  };

  const handleNoClick = (e: MouseEvent) =>
  {
    setNoClicked(prev => prev + 1);
    setIsMoving(true);
    (e.target as HTMLButtonElement).disabled = true;
    moveNoButton();
  };

  const handleNoHover = () =>
  {
    if (isMoving)
    {
      moveNoButton();
    }
  };

  return (
    <>
      {accepted ? (
        <ValentineBackground type="hearts" />
      ) : (
        <ValentineBackground type="gradient" />)}
      <div className="container">
        {accepted ? (
          <div>
            <h1 className="love-text"> Ура! Кохаю тебе! 💖</h1>
            <img src={happyGif} />
          </div>
        ) : (
          <div>
            <h1 className="question-text">Чи станеш ти моїм Валентином?</h1>
            {noClicked === 0 ? (
              <div className="heart-shape">
                <img
                  src="/shy.gif"
                  alt="cute cat"
                  className="gif"
                />
              </div>) : (
              <img
                src="/sad.jpg"
                alt="sad cat"
                width={"240px"}
                height={"240px"}
                className="sad-img"
              />
            )}
            <div className="button-container">
              <button onClick={handleYesClick} className="yes-button">
                Так 💘
              </button>
              <div onMouseEnter={handleNoHover}
                style={isMoving ? { top: noPosition.top, left: noPosition.left, position: "absolute" } : {}}
              >
                <button onClick={handleNoClick} className="no-button">
                  Ні
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
