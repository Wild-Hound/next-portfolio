import React from "react";
import styled from "styled-components";
import IntroContent from "../Organism/IntroContent";
import ResumeSection from "./ResumeSection";

const MainWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  width: 100%;
`;

const HeroImageWrapper = styled.div`
  background-color: #45f3ff;
  height: 100vh;
  position: sticky;
  top: 0;
`;
const HeroImgBg = styled.div`
  height: 100%;
  background-image: url("./Resource/portfolioImg.jpg");
  mix-blend-mode: luminosity;
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
`;

const ContentWrapper = styled.div`
  position: relative;
  background-color: #1d1d1d;
`;

const InitialSection = () => {
  return (
    <MainWrapper>
      <HeroImageWrapper>
        <HeroImgBg />
      </HeroImageWrapper>
      <ContentWrapper>
        <IntroContent />
        <ResumeSection />
      </ContentWrapper>
    </MainWrapper>
  );
};

export default InitialSection;
