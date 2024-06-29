import React, { useEffect, useCallback, useState } from "react";
import RcDropdown from "rc-dropdown";
import Menu, { Item as MenuItem, Divider } from "rc-menu";

import "rc-dropdown/assets/index.css";
import "./App.css";

function MyApp() {
  const [frameElement, setFrameElement] = React.useState(null);
  const [visible, setVisible] = useState(false);

  function onSelect({ key }) {
    console.log(`${key} selected`);
  }

  const menu = (
    <Menu onSelect={onSelect}>
      <MenuItem key="1">One</MenuItem>
      <MenuItem key="2">Two</MenuItem>
      <Divider />
      <MenuItem key="3">Three</MenuItem>
    </Menu>
  );

  useEffect(() => {
    const handleCloseDropdown = () => {
      setVisible(false);
    };

    if (frameElement) {
      const myFrame = frameElement.contentWindow.document;

      myFrame.addEventListener("click", handleCloseDropdown);
    }

    return () => {
      if (frameElement) {
        const myFrame = frameElement.contentWindow.document;

        myFrame.removeEventListener("click", handleCloseDropdown);
      }
    };
  }, [frameElement]);

  const handleFrameElement = useCallback((e) => {
    setFrameElement(e.target);
  }, []);

  return (
    <div className="App">
      <RcDropdown visible={visible} trigger="click" overlay={menu} onVisibleChange={setVisible}>
        <button style={{ width: 100 }}>open</button>
      </RcDropdown>
      <iframe
        id="myFrame"
        name="frame_name"
        src="http://localhost:3000/about"
        title="aaa"
        onLoad={handleFrameElement}
        scrolling="no"
      />
    </div>
  );
}

export default MyApp;
