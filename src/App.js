import React, { useState, useEffect } from "react";
import { useSpring, useTrail, animated, config } from "react-spring";
import useMeasure from "react-use-measure";
import styled from "styled-components";

const App = () => {
  const allUsers = [
    { name: "Anders", status: "away" },
    { name: "Anna", status: "online" },
    { name: "Annica", status: "offline" },
    { name: "Bo", status: "online" },
    { name: "Bob", status: "away" },
    { name: "Cara", status: "away" },
    { name: "Carmina", status: "online" },
    { name: "Carmen", status: "offline" },
    { name: "Davor", status: "online" },
    { name: "Eugen", status: "online" },
    { name: "Eve", status: "offline" }
  ];
  const [isFocused, setIsFocused] = useState(false);
  const [searchUsers, setSearchUsers] = useState([]);
  const [value, setValue] = useState("");

  const [ref, { height, width }] = useMeasure();

  const [propsHeight, setHeight, _stop] = useSpring(() => ({
    config: config.stiff,
    to: { height: 0 }
  }));

  const [propsPlaceholder, setPropsPlaceholder, __stop] = useSpring(() => ({
    config: config.stiff,
    to: { x: 0, w: 100 }
  }));

  const [propsOpacity, setOpacity, ___stop] = useSpring(() => ({
    config: config.stiff,
    to: { opacity: 1 }
  }));

  const trail = useTrail(searchUsers.length, {
    config: { mass: 1, tension: 500, friction: 30 },
    from: { opacity: 0.8, transform: "translate3d(-5px,0,0)" },
    to: { opacity: 1, transform: "translate3d(0,0,0)" }
  });

  useEffect(() => {
    if (value.length) {
      setSearchUsers(
        allUsers.filter(el =>
          el.name.toLowerCase().includes(value.trim().toLocaleLowerCase())
        )
      );
      setOpacity({ opacity: 0 });
    } else {
      setSearchUsers([]);
      setOpacity({ opacity: 1 });
    }
  }, [value]);

  useEffect(() => {
    setHeight({ height: height });
  }, [height]);

  useEffect(() => {
    setPropsPlaceholder({
      x: isFocused ? -width / 4 + 40 : 0,
      w: isFocused ? 50 : 100
    });
  }, [isFocused]);

  return (
    <Container>
      <SearchComponent
        style={{
          height: propsHeight.height.interpolate(h => `${h + 50}px`)
        }}
      >
        <Placeholder
          style={{
            opacity: propsOpacity.opacity.interpolate(o => o),
            transform: propsPlaceholder.x.interpolate(
              x => `translate3d(${x}px,0,0)`
            ),
            width: propsPlaceholder.w.interpolate(w => `${w}%`)
          }}
        >
          Search
        </Placeholder>
        <Input
          type="text"
          onChange={e => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={value}
        />

        <List ref={ref}>
          {trail.map((props, index) => {
            return (
              <ListItem key={searchUsers[index]} style={props}>
                <Status status={searchUsers[index].status} />
                <span>{searchUsers[index].name}</span>
              </ListItem>
            );
          })}
        </List>
      </SearchComponent>
    </Container>
  );
};

export default App;

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  font-family: "Roboto", sans-serif;
`;

const SearchComponent = styled(animated.div)`
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

const Input = styled.input`
  width: 100%;
  border: 0;
  height: 50px;
  padding: 0 1rem;
  box-sizing: border-box;
  outline: none;
  position: relative;
  background: transparent;
  z-index: 2;
`;

const Placeholder = styled(animated.span)`
  color: #ccc;
  position: absolute;
  top: 15px;
  width: 100%;
  text-align: center;
  //left: 1rem;
`;

const List = styled(animated.div)`
  background: transparent;
  width: 100%;
`;

const ListItem = styled(animated.div)`
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

const Status = styled.div`
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
