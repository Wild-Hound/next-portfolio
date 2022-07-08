import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const Wrapper = styled.div`
  position: relative;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  -webkit-box-align: center;
  align-items: center;
  margin-top: 5rem;
`;

const ProjectContent = styled.div<{ isEven: boolean }>`
  grid-column: 7 / -1;
  ${({ isEven }) => (isEven ? "text-align: left;" : "text-align: right;")}
  position: relative;
  ${({ isEven }) =>
    isEven ? "grid-area: 1 / -7 / 1 / 1;" : "grid-area: 1 / -7 / 1 / -1;"}
`;

const ProjectGrid = styled.div<{ isEven: boolean }>`
  grid-column: 1 / 8;
  box-shadow: 0 10px 30px -15px rgba(2, 12, 27, 0.7);
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  ${({ isEven }) =>
    isEven ? "grid-area: 1 / 6 / 1 / -1;" : "grid-area: 1 / 8 / 1 / 1;"}
  position: relative;
  z-index: 1;
  > img {
    width: 100%;
  }
  .swiper-pagination-bullet {
    background-color: #bdc3c7;
    border-radius: 3px;
    width: 1.5rem;
    height: 0.25rem;
  }
`;

const ProjectOverLine = styled.p`
  margin: 10px 0px;
  color: #45f3ff;
  font-weight: 400;
`;
const ProjectTitle = styled.h3`
  margin: 0px 0px 20px;
  color: #ccd6f6;
  font-size: clamp(24px, 5vw, 28px);
  font-weight: 600;
  line-height: 1.1;
  > a {
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  > a:hover {
    color: #45f3ff;
  }
`;
const ProjectDescription = styled.div`
  box-shadow: 0 10px 30px -15px rgb(2 12 27 / 70%);
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  position: relative;
  z-index: 2;
  padding: 25px;
  border-radius: 4px;
  background-color: #112240;
  color: #a8b2d1;
  font-size: 1.15rem;
  a {
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    position: relative;
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    color: #45f3ff;
  }
`;
const TechList = styled.ul<{ isEven: boolean }>`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  z-index: 2;
  margin: 25px 0px 10px;
  padding: 0px;
  list-style: none;
  ${({ isEven }) =>
    isEven ? "justify-content: flex-start;" : "justify-content: flex-end;"}

  > li {
    color: #a8b2d1;
    font-size: 0.95rem;
    white-space: nowrap;
    margin: 0px 0px 5px 20px;
  }
`;

const Image = styled.img`
  object-position: center;
`;

interface Props {
  isEven: boolean;
  imgLinks: string[];
}
const FeturedProject: React.FC<Props> = ({ isEven, imgLinks }) => {
  return (
    <Wrapper>
      <ProjectContent isEven={isEven}>
        <div>
          <ProjectOverLine>Featured Project</ProjectOverLine>
          <ProjectTitle>
            <a
              href="https://halcyon-theme.netlify.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Halcyon Theme
            </a>
          </ProjectTitle>
          <ProjectDescription>
            <p>
              A minimal, dark blue theme for VS Code, Sublime Text, Atom, iTerm,
              and more. Available on{" "}
              <a
                href="https://marketplace.visualstudio.com/items?itemName=brittanychiang.halcyon-vscode"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visual Studio Marketplace
              </a>
              ,{" "}
              <a
                href="https://packagecontrol.io/packages/Halcyon%20Theme"
                target="_blank"
                rel="noopener noreferrer"
              >
                Package Control
              </a>
              ,{" "}
              <a
                href="https://atom.io/themes/halcyon-syntax"
                target="_blank"
                rel="noopener noreferrer"
              >
                Atom Package Manager
              </a>
              , and{" "}
              <a
                href="https://www.npmjs.com/package/hyper-halcyon-theme"
                target="_blank"
                rel="noopener noreferrer"
              >
                npm
              </a>
              .
            </p>
          </ProjectDescription>
          <TechList isEven={isEven}>
            <li>VS Code</li>
            <li>Sublime Text</li>
            <li>Atom</li>
            <li>iTerm2</li>
            <li>Hyper</li>
          </TechList>
        </div>
      </ProjectContent>
      <ProjectGrid isEven={isEven}>
        <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
          {imgLinks.map((link, index) => {
            return (
              <SwiperSlide key={index}>
                <Image src={`./Resource/portfolioImages/${link}`} alt="" />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </ProjectGrid>
    </Wrapper>
  );
};

export default FeturedProject;
