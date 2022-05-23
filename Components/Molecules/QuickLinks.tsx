import React from "react";
import styled from "styled-components";
import {
  AiOutlineGithub,
  AiOutlineWhatsApp,
  AiFillLinkedin,
} from "react-icons/ai";

const Wrapper = styled.div`
  background-color: #1d1d1d;
  height: 100vh;
  min-width: 84px;
  position: sticky;
  top: 0;
  border-left: 1px solid #999;
`;

const ButtonsWrapper = styled.div`
  height: 100%;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  -webkit-justify-content: flex-end;
  justify-content: flex-end;
  -webkit-align-items: center;
  align-items: center;
  font-size: 1.35em;
  padding: 2.5em 0;
  box-sizing: border-box;
  grid-gap: 1em;
  gap: 1em;
`;

const SocialButton = styled.div`
  padding: 0.75rem;
  border: 1px solid #45f3ff;
  /* height: 25px;
  width: 25px; */
  color: #45f3ff;
  border-radius: 50px;
  text-align: center;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.35s;
  font-size: 1.25em;
  &:hover {
    background-color: #45f3ff;
    color: white;
  }
`;

const QuickLinks = () => {
  return (
    <Wrapper>
      <ButtonsWrapper>
        <SocialButton>
          <AiOutlineGithub />
        </SocialButton>
        <SocialButton>
          <AiFillLinkedin />
        </SocialButton>
        <SocialButton>
          <AiOutlineWhatsApp />
        </SocialButton>
      </ButtonsWrapper>
    </Wrapper>
  );
};

export default QuickLinks;
