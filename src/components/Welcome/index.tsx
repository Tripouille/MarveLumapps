import React from "react";
import { Kind, MyMessage } from "../MyMessage";

export const Welcome: React.FC = () => {
  return (
    <MyMessage kind={Kind.info} hasBackground>
      <p>Please use the search field to start your amazing research.</p>
    </MyMessage>
  );
};
