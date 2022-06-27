import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  background-color: #1d1d1d;
  @media screen and (max-width: 1100px) {
    flex-direction: column-reverse;
    height: inherit;
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1d1d1d;
  width: 100%;
  .messageIn {
    height: 100px !important;
  }
`;

const FormContainer = styled.div`
  width: 80%;
  padding: 20px;
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
const Row = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
  }
  grid-column-gap: 35px;
`;
const Col = styled.div`
  position: relative;
  width: 100%;
  padding: 0 10px;
  @media screen and (max-width: 800px) {
    padding: 0;
  }
  margin: 30px 0 10px;
  transition: 0.5s all;
`;
const Inbox = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  color: #45f3ff;
`;
const Text = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  line-height: 40px;
  font-size: 18px;
  padding: 0 10px;
  display: block;
  transition: 0.5s;
  pointer-events: none;
`;
const Line = styled.span`
  position: absolute;
  bottom: 0;
  display: block;
  width: 100%;
  height: 2px;
  background-color: #45f3ff;
  transition: 0.5s;
  border-radius: 2px;
  pointer-events: none;
`;
const Input = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: transparent;
  box-shadow: none;
  border: none;
  outline: none;
  font-size: 18px;
  padding: 0 10px;
  z-index: 1;
  color: #000;

  &:focus ~ .line,
  &:valid ~ .line {
    height: 100%;
  }
  &:focus ~ .text,
  &:valid ~ .text {
    top: -35px;
    left: -10px;
  }
`;
const TextArea = styled.textarea`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: transparent;
  box-shadow: none;
  border: none;
  outline: none;
  font-size: 18px;
  padding: 0 10px;
  z-index: 1;
  padding-top: 0.5rem;
  color: #000;
  &:focus ~ .line,
  &:valid ~ .line {
    height: 100%;
  }
  &:focus ~ .text,
  &:valid ~ .text {
    top: -35px;
    left: -10px;
  }
`;

const SendButton = styled.input`
  border: none;
  padding: 7px 35px;
  cursor: pointer;
  outline: none;
  background: #45f3ff;
  color: #000;
  font-size: 18px;
  border-radius: 2px;
`;

const Contact = () => {
  return (
    <Container>
      <Form action="">
        <FormContainer>
          <Heading>Contact Me</Heading>
          <Row>
            <Col>
              <Inbox>
                <Input type="text" name="fname" required={true} />
                <Text className="text">First Name</Text>
                <Line className="line"></Line>
              </Inbox>
            </Col>
            <Col>
              <Inbox>
                <Input type="text" name="lname" required={true} />
                <Text className="text">Last Name</Text>
                <Line className="line"></Line>
              </Inbox>
            </Col>
          </Row>
          <Row>
            <Col>
              <Inbox>
                <Input type="email" name="email" required={true} />
                <Text className="text">Email</Text>
                <Line className="line"></Line>
              </Inbox>
            </Col>
            <Col>
              <Inbox>
                <Input type="text" name="subject" required={true} />
                <Text className="text">Subject</Text>
                <Line className="line"></Line>
              </Inbox>
            </Col>
          </Row>
          <Row>
            <Col>
              <Inbox className="messageIn">
                <TextArea
                  name="message"
                  id="textarea"
                  rows={10}
                  cols={30}
                  required={true}
                />
                <Text className="text">Type your message here...</Text>
                <Line className="line"></Line>
              </Inbox>
            </Col>
          </Row>
          <Row>
            <Col>
              <SendButton type="submit" value="Send" id="conSubBtn" />
            </Col>
          </Row>
        </FormContainer>
      </Form>
    </Container>
  );
};

export default Contact;
