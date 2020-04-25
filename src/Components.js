import styled from "styled-components";
import { animated } from "react-spring";

export const Container = styled.div`
  width: 100%;
  max-width: 500px;
  font-family: "Roboto", sans-serif;
`;

export const SearchComponent = styled(animated.div)`
  background: white;
  overflow: hidden;
  width: 100%;
  border-radius: 8px;
  position: relative;
  z-index: 1;
  min-height: 50px;
  margin-top: 50px;
  box-shadow: 2px 4px 6px 2px rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: 2px 4px 6px 2px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 2px 4px 6px 2px rgba(0, 0, 0, 0.05);
`;

export const Input = styled.input`
  width: 100%;
  border: 0;
  height: 50px;
  padding: 0 1rem;
  box-sizing: border-box;
  outline: none;
  position: relative;
  background: transparent;
  z-index: 2;
  font-family: "Roboto", sans-serif;
`;

export const Placeholder = styled(animated.span)`
  color: #ccc;
  position: absolute;
  top: 15px;
  width: 100%;
  text-align: center;
`;

export const IconErase = styled(animated.svg)`
  #cross,
  #circle {
    fill: #ccc;
  }

  position: absolute;
  top: 13px;
  right: 1rem;
  cursor: pointer;
  z-index: 3;
`;

export const List = styled(animated.div)`
  background: transparent;
  width: 100%;
`;

export const ListItem = styled(animated.div)`
  width: 100%;
  background: white;
  padding: 1rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;

  span {
    margin-left: 1rem;
  }
`;

export const Status = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 10px;
  display: inline-block;
  background: ${props =>
    props.status === "online"
      ? "lime"
      : props.status === "offline"
      ? "tomato"
      : "yellow"};
`;
