import React, { useState } from "react";
import Slider from "rc-slider";
import Tooltip from "./tooltip";

import "react-tooltip/dist/react-tooltip.css";
import "rc-tooltip/assets/bootstrap.css";
import "rc-slider/assets/index.css";
import "./App.css";

// const FlexHandle = styled(Handle)`
//   display: flex;
//   justify-content: center;
// `;

// By default the text is rendered inside the handle, so we need to take it out
// white-space: nowrap; ensures that it doesn't break on a new line, due to the handle being very small
// const Value = styled.div`
//   margin: -42px 0 20px;
//   white-space: nowrap;
//   color: white;
//   font-size: 16px;
//   font-weight: bold;
//   padding: 5px;
//   background-color: #4d4d4dd4;
//   border-radius: 4px;
//   position: relative;

//   &::after {
//     content: "";
//     position: absolute;
//     bottom: -5px;
//     left: 50%;
//     transform: translateX(-50%);
//     width: 0;
//     height: 0;
//     border-top: 5px solid #4d4d4dd4;
//     border-bottom: 0px solid transparent;
//     border-right: 5px solid transparent;
//     border-left: 5px solid transparent;
//   }
// `;

function MyApp() {
  const [value, setValue] = useState([0, 100]);

  const [hoverOpen, setHoverOpen] = useState(false);
  const [focusOpen, setFocusOpen] = useState(false);

  React.useEffect(() => {
    const onMouseUp = () => {
      setFocusOpen(false);
    };
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <div className="App">
      <p>aaa</p>
      <p>aaa</p>
      <p>aaa</p>
      <Slider
        step={1}
        range
        max={100}
        min={0}
        value={value}
        onChange={setValue}
        // handle={(props) => {
        //   console.log('props', props)
        //   const { value, dragging, index, ...rest } = props;

        //   return (
        //     <FlexHandle key={index} value={value} {...rest}>
        //       {dragging && <Value>{value}</Value>}
        //     </FlexHandle>
        //   );
        // }}
        handleRender={(node, props) => {
          const nodeProps = node.props;

          const passedProps = {
            ...nodeProps,
            onMouseEnter: (e) => {
              setHoverOpen(true);
              nodeProps.onMouseEnter?.(e);
            },
            onMouseLeave: (e) => {
              setHoverOpen(false);
              nodeProps.onMouseLeave?.(e);
            },
            onMouseDown: (e) => {
              setFocusOpen(true);
              nodeProps.onMouseDown?.(e);
            },
            onFocus: (e) => {
              setFocusOpen(true);
              nodeProps.onFocus?.(e);
            },
            onBlur: (e) => {
              setFocusOpen(false);
              nodeProps.onBlur?.(e);
            },
          };

          const cloneNode = React.cloneElement(node, passedProps);

          return cloneNode;
        }}
        activeHandleRender={(handle, props) => {
          const cloneNode = React.cloneElement(handle, {
            style: {
              ...handle.props.style,
              visibility: "hidden",
            },
          });

          const open = hoverOpen || focusOpen;

          return (
            <Tooltip {...props} open={open} key="tooltip">
              {cloneNode}
            </Tooltip>
          );
        }}
      />
    </div>
  );
}

export default MyApp;
