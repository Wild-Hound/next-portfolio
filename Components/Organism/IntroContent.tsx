import React, { useEffect } from "react";
import styled from "styled-components";
import { initGame } from "../../Game/src";

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
`;

const GameWindow = styled.canvas`
  width: 100%;
  height: 100vh;
`;

const IntroContent = () => {
  useEffect(() => {
    initGame();
  }, []);
  return (
    <Wrapper>
      <FocusCircle>
        <span>Yasin</span>
        <span>Khan</span>
      </FocusCircle>
      <GameWindow id="game" />
    </Wrapper>
  );
};

export default IntroContent;
