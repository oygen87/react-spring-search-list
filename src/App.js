import React, { useState, useEffect } from "react";
import { useSpring, useTrail, config, useTransition } from "react-spring";
import useMeasure from "react-use-measure";

import {
  Container,
  SearchComponent,
  Input,
  Placeholder,
  IconErase,
  List,
  ListItem,
  Status
} from "./Components";

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

  const [propsEraseScale, setEraseScale, ____stop] = useSpring(() => ({
    config: config.wobbly,
    to: { scale: 1 }
  }));

  const trail = useTrail(searchUsers.length, {
    config: { mass: 1, tension: 500, friction: 30 },
    from: { opacity: 0.8, transform: "translate3d(-5px,0,0)" },
    to: { opacity: 1, transform: "translate3d(0,0,0)" }
  });

  const transitionClose = useTransition(isFocused && value.length > 0, null, {
    from: { opacity: 0, transform: "scale(0.8)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.8)" }
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

        {transitionClose.map(
          ({ item, key, props }) =>
            item && (
              <IconErase
                key={key}
                style={{
                  ...props,
                  transform:
                    value.length > 0 && isFocused
                      ? propsEraseScale.scale.interpolate(s => `scale(${s})`)
                      : props.transform
                }}
                onClick={() => setValue("")}
                onMouseMove={() => setEraseScale({ scale: 1.1 })}
                onMouseLeave={() => setEraseScale({ scale: 1 })}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.3394 9.32245C16.7434 8.94589 16.7657 8.31312 16.3891 7.90911C16.0126 7.50509 15.3798 7.48283 14.9758 7.85938L12.0497 10.5866L9.32245 7.66048C8.94589 7.25647 8.31312 7.23421 7.90911 7.61076C7.50509 7.98731 7.48283 8.62008 7.85938 9.0241L10.5866 11.9502L7.66048 14.6775C7.25647 15.054 7.23421 15.6868 7.61076 16.0908C7.98731 16.4948 8.62008 16.5171 9.0241 16.1405L11.9502 13.4133L14.6775 16.3394C15.054 16.7434 15.6868 16.7657 16.0908 16.3891C16.4948 16.0126 16.5171 15.3798 16.1405 14.9758L13.4133 12.0497L16.3394 9.32245Z"
                  id="cross"
                  fill="currentColor"
                />
                <path
                  id="circle"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
                  fill="currentColor"
                />
              </IconErase>
            )
        )}
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
              <ListItem key={searchUsers[index].name} style={props}>
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
