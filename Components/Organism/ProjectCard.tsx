import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
  max-width: fit-content;
  &:hover > div {
    &:first-child {
      transform: translate(-25px, -200px);
    }
    &:last-child {
      transform: translateY(50px);
    }
  }
  .swiper.swiper-initialized.swiper-horizontal.swiper-pointer-events.swiper-backface-hidden.mySwiper {
    height: 100% !important;
  }
  .swiper-button-next,
  .swiper-button-prev {
    color: white;
  }
`;
const ImageWrapper = styled.div`
  width: 520px;
  height: 300px;
  transition: all 0.5s;
  position: absolute;
  bottom: 0;
  z-index: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: left top;
`;

const CardContent = styled.div`
  width: 520px;
  height: 300px;
  color: #000;
  background-color: #31313a;
  transition: all 0.5s;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  padding: 0.5em;
  box-sizing: border-box;
  color: #fff;
  padding-top: 3.75rem;
  > h3 {
    margin: 0;
  }
`;

const ProjectCard = () => {
  return (
    <Wrapper>
      <ImageWrapper>
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          <SwiperSlide>
            <Image src="./Resource/tempCover.jpeg" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src="./Resource/tempCover.jpeg" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src="./Resource/tempCover.jpeg" alt="" />
          </SwiperSlide>
        </Swiper>
      </ImageWrapper>
      <CardContent>
        <h3>Javascript Fundamentals</h3>
        <p>
          Some javascript fundamentals can be hard to understand at later
          stages, Here are some javascript fundamentals explained
        </p>
      </CardContent>
    </Wrapper>
  );
};

export default ProjectCard;
