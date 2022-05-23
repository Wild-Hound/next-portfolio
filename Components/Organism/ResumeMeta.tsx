import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import GlitchedWriter from "glitched-writer";

const Wrapper = styled.div`
  text-align: center;
  background-color: #31313a;
  border-radius: 5px;
  color: #fff;
  width: 25vw;
  height: 65vh;
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
    margin-top: 0;
  }
`;

const ResumeMeta = () => {
  const writeRed = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!writeRed) {
      return;
    }

    const Writer = new GlitchedWriter(writeRed.current, { letterize: true });
    Writer.write("Hello there!");
  }, [writeRed.current]);

  return (
    <Wrapper>
      <MetaImg />
      <MetaContent>
        <h1>Yasin Khan</h1>
        <div ref={writeRed}></div>
      </MetaContent>
    </Wrapper>
  );
};

export default ResumeMeta;
