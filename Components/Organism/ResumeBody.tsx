import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 35vw;
  height: 60vh;
  background-color: #31313a;
  margin: auto;
  padding: 0 1.5rem;
  box-sizing: border-box;
  color: #fff;
  overflow-y: scroll;
`;

const SectionHeading = styled.h2`
  font-weight: 500;
  display: flex;
  flex-direction: column;
  grid-gap: 0.6em;
  gap: 0.6em;
  position: relative;
  &::after {
    content: "";
    height: 1px;
    background: linear-gradient(75deg, #777, #31313a 95%);
    width: 100%;
  }
`;

const ResumeBody = () => {
  return (
    <Wrapper>
      <SectionHeading>Overview</SectionHeading>
      <p>Havn't figure anything out :(</p>
    </Wrapper>
  );
};

export default ResumeBody;
