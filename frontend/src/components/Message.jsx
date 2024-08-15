import React from "react";
const Message = ({ variant, children }) => {
  return <h1 variant={variant}>{children}</h1>;
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;