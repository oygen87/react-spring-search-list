import React, { useState, useEffect } from "react";
import { useSpring, useTrail, config, useTransition } from "react-spring";
import useMeasure from "react-use-measure";
import { users } from "./users";
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
  const [isFocused, setIsFocused] = useState(false);
  const [searchUsers, setSearchUsers] = useState([]);
  const [value, setValue] = useState("");

  const [ref, { height, width }] = useMeasure();

  const [propsHeight, setHeight] = useSpring(() => ({
    config: config.stiff,
    to: { height: 0 }
  }));

  const [propsPlaceholder, setPropsPlaceholder] = useSpring(() => ({
    config: config.stiff,
    to: { x: 0, w: 100 }
  }));

  const [propsOpacity, setOpacity] = useSpring(() => ({
    config: config.stiff,
    to: { opacity: 1 }
  }));

  const [propsEraseScale, setEraseScale] = useSpring(() => ({
    config: config.wobbly,
    to: { scale: 1 }
  }));

  const trail = useTrail(searchUsers.length, {
    config: { mass: 1, tension: 500, friction: 30 },
    from: { opacity: 0.8, transform: "translate3d(-5px,0,0)" },
    to: { opacity: 1, transform: "translate3d(0,0,0)" }
  });

  const transitionClose = useTransition(isFocused && value.length > 0, null, {
    from: { opacity: 0, transform: "scale(0.2)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.2)" }
  });

  useEffect(() => {
    if (value.length) {
      setSearchUsers(
        users.filter(el =>
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
              />
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
