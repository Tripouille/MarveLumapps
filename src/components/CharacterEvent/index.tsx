import React from "react";
import { FlexBox, Alignment } from "@lumx/react";
import { IEvent } from "../../utils/types";

interface IProps {
  event: IEvent;
}

export const CharacterEvent: React.FC<IProps> = ({ event }) => {
  return (
    <FlexBox vAlign={Alignment.left} className="event-container">
      <h3 className="event-title">{event.title}</h3>
      <p className="event-description">{event.description}</p>
    </FlexBox>
  );
};
