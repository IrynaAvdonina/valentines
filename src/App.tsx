import { useState, useEffect, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import happyGif from "/happy.gif";
import shyGif from "/shy.gif";
import sadImg from "/sad.jpg";
import audioUrl from "/valentines.mp3";

import img1 from './assets/img1.jpg';
import img5 from "./assets/img2.jpg";
import img3 from "./assets/img3.jpg";
import img4 from "./assets/img4.jpg";
import img7 from "./assets/img5.jpg";
import img6 from "./assets/img6.jpg";
import img2 from "./assets/img7.jpg";
import img8 from "./assets/img8.jpg";
import img9 from "./assets/img9.jpg";

const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9
];
const position = [
  { x: 0, y: 0 },
  { x: 0, y: 230 },
  { x: 270, y: 20 },
  { x: 290, y: 220 },
  { x: 600, y: 300 },
  { x: 800, y: 0 },
  { x: 850, y: 200 },
  { x: 1050, y: 0 },
  { x: 1150, y: 200 },
];

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
        document.querySelectorAll(".heart").forEach((el) => el.remove());
      };
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
    console.log(window.innerHeight);
    setAccepted(true);
    const audio = new Audio(audioUrl);
    audio.loop = true;
    audio.controls = true;
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
    setNoClicked((prev) => prev + 1);
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
        <ValentineBackground type="gradient" />
      )}
      <div className="container">
        {accepted ? (
          <div>
            <h1 className="love-text"> Ура! Кохаю тебе! 💖</h1>
            <div className="photos">
              <img src={happyGif} />
              <AnimatePresence>
                {images.map((src, index) => (
                  <motion.img
                    key={index}
                    src={src}
                    width={"200px"}
                    height={"200px"}
                    alt="Our memories"
                    className="photo"
                    initial={{
                      opacity: 0,
                      scale: 0.5,
                      x: position[index].x,
                      y: -500,
                    }}
                    animate={{
                      opacity: 1, scale: 1, rotate: Math.random() * 30 - 15, x: position[index].x,
                      y: position[index].y
                    }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 6 }}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="question-text">Чи станеш ти моїм Валентином?</h1>
            {noClicked === 0 ? (
              <div className="heart-shape">
                <img src={shyGif} alt="cute cat" className="gif" />
              </div>
            ) : (
              <img
                src={sadImg}
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
              <div
                onMouseEnter={handleNoHover}
                style={
                  isMoving
                    ? { top: noPosition.top, left: noPosition.left, position: "absolute" }
                    : {}
                }
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
