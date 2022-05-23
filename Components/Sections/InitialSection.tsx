import React from "react";
import styled from "styled-components";

const MainWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
`;

const HeroImageWrapper = styled.div`
  background-color: #45f3ff;
  height: 100vh;
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
const FocusCircle = styled.div`
  color: hsla(0, 0%, 100%, 0.8);
  font-size: 4.2vw;
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
`;

const InitialSection = () => {
  return (
    <MainWrapper>
      <HeroImageWrapper>
        <HeroImgBg />
      </HeroImageWrapper>
      <ContentWrapper>
        <FocusCircle>
          <span>
            Yasin <br /> Khan
          </span>
        </FocusCircle>
      </ContentWrapper>
    </MainWrapper>
  );
};

export default InitialSection;
