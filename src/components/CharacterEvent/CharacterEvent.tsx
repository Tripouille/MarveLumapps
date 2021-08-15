import React from "react";
import { FlexBox, Alignment } from "@lumx/react";
import { IEvent } from "../../Utils/types";

interface IProps {
  event: IEvent;
}

const CharacterEvent: React.FC<IProps> = ({ event }) => {
  return (
    <FlexBox vAlign={Alignment.left} className="event-container">
      <h3 className="event-title">{event.title}</h3>
      <p className="event-description">{event.description}</p>
    </FlexBox>
  );
};

export default CharacterEvent;
