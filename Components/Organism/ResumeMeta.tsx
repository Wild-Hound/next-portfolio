import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import GlitchedWriter from "glitched-writer";
import { FaHackerrank } from "react-icons/fa";
import { SiHackerone, SiLeetcode, SiPicartodottv } from "react-icons/si";

const Wrapper = styled.div`
  text-align: center;
  background-color: #31313a;
  border-radius: 5px;
  color: #fff;
  width: 25vw;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
`;

const MetaImg = styled.div`
  height: 325px;
  background-image: url("./Resource/portfolioImg.jpg");
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 90%, 48% 100%, 0 90%);
  clip-path: polygon(0 0, 100% 0, 100% 90%, 48% 100%, 0 90%);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const MetaContent = styled.div`
  padding: 10px;
  display: grid;
  grid-gap: 0.8em;
  gap: 0.8em;
  > h1 {
    font-size: 2.5rem;
    margin: 0;
  }
`;

const AnimetedText = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 2px;
  color: #45f3ff;
  font-family: "Grape Nuts", cursive;
  height: 3.5rem;
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
`;
const Profile = styled.a`
  position: relative;
  /* border: 2px solid #45f3ff; */
  color: #45f3ff;
  border-radius: 2.5rem;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  /* box-shadow: 0 0 10px rgb(69 243 255 / 75%); */
  transition: all 0.35s;
  &:hover {
    background-color: #45f3ff;
    color: white;
  }
`;

const MetaFooter = styled.div`
  display: flex;
  margin-top: 1rem;
  width: 100%;
  border-top: 1px solid #555;
`;
const FooterButton = styled.a`
  width: 100%;
  height: 100%;
  background-color: transparent;
  display: flex;
  font-size: 1.15rem;
  justify-content: center;
  align-items: center;
  padding: 1.25rem;
  transition: all 0.35s;
  cursor: pointer;
  &:hover {
    color: #45f3ff;
  }
  &:first-child {
    border-right: 1px solid #555;
  }
`;

const ResumeMeta = () => {
  const writeRed = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!writeRed?.current) {
      return;
    }

    const Writer = new GlitchedWriter(writeRed.current, { letterize: true });
    Writer.queueWrite(
      [
        "Javascript Maniac",
        "React Hooked",
        "Typescript Obsessed",
        "Node Fanatic",
      ],
      3000,
      true
    );
  }, [writeRed]);

  return (
    <Wrapper>
      <MetaImg />
      <MetaContent>
        <h1>Yasin Khan</h1>
        <AnimetedText ref={writeRed}></AnimetedText>
        <ProfileWrapper>
          <Profile
            href="https://www.hackerrank.com/wildhound404?hr_r=1"
            target="_blank"
          >
            <FaHackerrank />
          </Profile>
          <Profile href="https://leetcode.com/Wild-Hound/" target="_blank">
            <SiLeetcode />
          </Profile>
          <Profile href="https://hackerone.com/yk404?type=user" target="_blank">
            <SiHackerone />
          </Profile>
          <Profile
            href="https://play.picoctf.org/users/yasin404"
            target="_blank"
          >
            <SiPicartodottv />
          </Profile>
        </ProfileWrapper>
      </MetaContent>
      <MetaFooter>
        <FooterButton href="https://github.com/Wild-Hound" target="_blank">
          Linkedin
        </FooterButton>
        <FooterButton href="https://www.linkedin.com/in/yk404/" target="_blank">
          Github
        </FooterButton>
      </MetaFooter>
    </Wrapper>
  );
};

export default ResumeMeta;
