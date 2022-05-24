import React from "react";
import styled from "styled-components";
import ProjectCard from "../Organism/ProjectCard";

const Wrapper = styled.div`
  background-color: #1d1d1d;
  width: 100%;
  height: 100vh;
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
  margin-top: 0;
`;

const ProjectsCardWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 2.5rem;
  flex-wrap: wrap;
  gap: 4rem;
`;

const PortfolioSection = () => {
  return (
    <Wrapper>
      <Heading>Personal Projects</Heading>
      <ProjectsCardWrapper>
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </ProjectsCardWrapper>
    </Wrapper>
  );
};

export default PortfolioSection;
