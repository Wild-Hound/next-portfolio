import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FeturedProject from "../Organism/FeturedProject";

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: #1d1d1d;
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

const ProjectsWrapper = styled.div`
  max-width: 1320px;
  padding: 2rem;
  margin: auto;
  > div {
    &:first-child {
      margin-top: 0 !important;
    }
  }
`;
const Project = styled.div``;

const FeturedProjects = () => {
  const [jsonData, setJsonData] = useState<string[][]>();

  useEffect(() => {
    fetch("./Resource/resource.json")
      .then((res) => res.json())
      .then((data) => setJsonData(data));
  }, []);

  return (
    <Wrapper>
      <Heading>Some Things I’ve Built</Heading>
      <ProjectsWrapper>
        {jsonData?.map((data, index) => (
          <FeturedProject
            imgLinks={data}
            isEven={index % 2 ? true : false}
            key={index}
          />
        ))}
      </ProjectsWrapper>
    </Wrapper>
  );
};

export default FeturedProjects;
