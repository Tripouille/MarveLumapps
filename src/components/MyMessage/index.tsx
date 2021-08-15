import { Kind, Message } from "@lumx/react";
import React from "react";

interface IProps {
  kind: Kind;
  hasBackground?: boolean;
  children: React.ReactNode;
}

export const MyMessage: React.FC<IProps> = (props) => {
  return <Message className="message" {...props}></Message>;
};

export { Kind } from "@lumx/react";
