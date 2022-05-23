import React from "react";
import styled from "styled-components";
import ResumeBody from "../Organism/ResumeBody";
import ResumeMeta from "../Organism/ResumeMeta";

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: black;
`;

const Heading = styled.h1`
  width: 100%;
  color: #45f3ff;
  font-size: 3.25rem;
  text-align: center;
  margin-bottom: 0.625rem;
  font-family: "Koulen", cursive;
  letter-spacing: 2px;
  padding-top: 3.5rem;
`;

const ResumeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 5rem;
`;
const ResumeInnerWrapper = styled.div`
  display: flex;
  z-index: 2;
  width: 90%;
`;

const ResumeSection = () => {
  return (
    <Wrapper>
      <Heading>About Me</Heading>
      <ResumeWrapper>
        <ResumeInnerWrapper>
          <ResumeMeta />
          <ResumeBody />
        </ResumeInnerWrapper>
      </ResumeWrapper>
    </Wrapper>
  );
};

export default ResumeSection;
