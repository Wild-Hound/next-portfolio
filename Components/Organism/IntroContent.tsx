import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { initGame, startGame } from "../../Game/src";

const Wrapper = styled.div`
  width: 100%;
  background-color: #1d1d1d;
  height: 100vh;
  position: relative;
`;
const FocusCircle = styled.div`
  color: hsla(0, 0%, 100%, 0.8);
  font-size: 6rem;
  font-weight: 800;
  position: absolute;
  line-height: 1.4;
  top: 40%;
  left: -10vw;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  background-color: #1d1d1d;
  border-radius: 50%;
  height: 20vw;
  width: 20vw;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: center;
  align-items: center;
  text-shadow: 0 0 10px rgba(69, 243, 255, 0.5),
    0 0 10px rgba(69, 243, 255, 0.5), 0 0 20px rgba(69, 243, 255, 0.5),
    0 0 50px rgba(69, 243, 255, 0.5);
  border: 2px solid rgba(69, 243, 255, 0.5);
  box-shadow: 0 0 35px rgba(69, 243, 255, 0.75);
  letter-spacing: 5px;
  font-family: "Koulen", cursive;
  line-height: 6.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const GameWrapper = styled.div`
  position: relative;
`;
const GameWindow = styled.canvas`
  width: 100%;
  height: 100vh;
`;
const GameOverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: none;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
`;
const GameScoreCount = styled.div`
  position: absolute;
  top: 0;
  right: 2rem;
  font-size: 5.75rem;
  background-color: transparent;
  color: white;
  font-family: "Koulen", cursive;
  display: none;
`;

const PlayerScoreWrapper = styled.div`
  font-size: 2.5rem;
`;
const NameSubmitWrapper = styled.div`
  display: flex;
  margin: 1rem 0;
  &:focus-within {
    > input {
      outline: 1px solid #45f3ff;
    }
    > button {
      outline: 1px solid #45f3ff;
    }
  }
`;
const NameInput = styled.input`
  border: 1px solid #45f3ff;
  border-radius: 0.35rem;
  padding: 0.5rem 0.75rem;
  font-size: 1.05rem;
  background-color: transparent;
  color: white;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  /* &:focus {
    outline: 1px solid #45f3ff;
  } */
  &::placeholder {
    color: #bdc3c7;
  }
`;
const NameSubmit = styled.button`
  border: 1px solid #45f3ff;
  color: #45f3ff;
  background-color: transparent;
  font-size: 1rem;
  border-top-right-radius: 0.35rem;
  border-bottom-right-radius: 0.35rem;
  padding: 0 0.75rem;
  cursor: pointer;
  transition: all 0.35s;
  &:hover {
    background-color: #45f3ff9d;
    color: white;
  }
`;
const MaxScoreWrapper = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;
const TopPatlers = styled.ol`
  font-size: 1.25rem;
  list-style: none;
  padding: 0;
  border: 1px solid #45f3ff;
  margin-top: 1.75rem;
  padding: 1.5rem;
  border-radius: 0.35rem;
  background-color: #ecf0f116;
  > p {
    font-size: 1.5rem;
    margin: auto;
    margin-bottom: 1rem;
    border-bottom: 2px solid #45f3ff;
    max-width: fit-content;
    padding: 0 0.75rem;
    padding-bottom: 0.75rem;
  }
  > li {
    margin: 0;
    padding: 0;
  }
`;
const ResumeGameButton = styled.button`
  border: 1px solid #45f3ff;
  margin-top: 1.75rem;
  padding: 1rem;
  border-radius: 0.35rem;
  background-color: #ecf0f116;
  outline: none;
  font-size: 1rem;
  cursor: pointer;
  color: white;
  width: 100%;
  transition: all 0.35s;
  &:hover {
    background-color: #45f3ff9d;
  }
`;
const IntroContent = () => {
  const [gameScore, setGameScore] = useState(0);
  const [gameState, setGameState] = useState("init");
  const rewardSoundRef = useRef<HTMLAudioElement>(null);
  const backgroundSoundRef = useRef<HTMLAudioElement>(null);
  const gameOverScreenRef = useRef<HTMLDivElement>(null);
  const gameScroceEleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rewardSoundRef.current) {
      return;
    }
    initGame(gameScore, setGameScore, rewardSoundRef.current, setGameState);
  }, [rewardSoundRef]);

  useEffect(() => {
    if (!backgroundSoundRef.current) {
      return;
    }

    if (gameState === "started") {
      if (!gameOverScreenRef.current || !gameScroceEleRef.current) {
        return;
      }

      const gameoverScreen = gameOverScreenRef.current;
      gameoverScreen.style.display = "none";
      gameScroceEleRef.current.style.display = "block";
      console.log(gameoverScreen);

      backgroundSoundRef.current.play();
      backgroundSoundRef.current.onended = () => {
        if (!backgroundSoundRef.current) {
          return;
        }
        backgroundSoundRef.current.play();
      };
    }

    if (gameState === "game over") {
      backgroundSoundRef.current.currentTime = 0;
      backgroundSoundRef.current.pause();
      if (!gameOverScreenRef.current || !gameScroceEleRef.current) {
        return;
      }

      const gameoverScreen = gameOverScreenRef.current;
      gameoverScreen.style.display = "flex";
      gameScroceEleRef.current.style.display = "none";
    }
  }, [gameState]);

  function gameOverMeta() {
    return (
      <div>
        <PlayerScoreWrapper>Your Score: {gameScore}</PlayerScoreWrapper>
        <NameSubmitWrapper>
          <NameInput placeholder="Enter your name" />
          <NameSubmit>Submit</NameSubmit>
        </NameSubmitWrapper>

        <MaxScoreWrapper>Max Scoce: 35</MaxScoreWrapper>
        <TopPatlers>
          <p>Top players</p>
          <li>Yasin</li>
          <li>Shejan</li>
          <li>Arafat</li>
        </TopPatlers>
        <ResumeGameButton
          onClick={() => {
            setGameScore(0);
            startGame();
          }}
        >
          Resume
        </ResumeGameButton>
      </div>
    );
  }

  return (
    <Wrapper>
      <FocusCircle>
        <span>Yasin</span>
        <span>Khan</span>
      </FocusCircle>
      <GameWrapper>
        <audio ref={rewardSoundRef}>
          <source src="/Resource/gameResource/scale-e6-14577.mp3" />
        </audio>
        <audio ref={backgroundSoundRef}>
          <source src="/Resource/gameResource/chill-drum-loop-6887.mp3" />
        </audio>
        <GameWindow id="game" />
        <GameOverlay ref={gameOverScreenRef}>{gameOverMeta()}</GameOverlay>
        <GameScoreCount ref={gameScroceEleRef}>{gameScore}</GameScoreCount>
      </GameWrapper>
    </Wrapper>
  );
};

export default IntroContent;
