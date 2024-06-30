import React from "react";
import RcTooltip from "rc-tooltip";

const Tooltip = React.forwardRef(({ children, open, value, dragging }) => {
  const tooltipRef = React.useRef(null);

  React.useEffect(() => {
    if (dragging) {
      tooltipRef.current?.forceAlign();
    }
  }, [dragging, value]);

  return (
    <RcTooltip
      visible={open}
      prefixCls="rc-tooltip"
      overlayClassName="rc-slider-tooltip"
      overlayStyle={{ padding: "4px 0" }}
      placement="top"
      overlay={value}
      ref={tooltipRef}
    >
      {children}
    </RcTooltip>
  );
});

export default Tooltip;
