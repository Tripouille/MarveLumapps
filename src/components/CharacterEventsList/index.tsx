import React from "react";
import { Alignment, FlexBox } from "@lumx/react";
import { CharacterEvent } from "../CharacterEvent";
import { IEvent } from "../../utils/types";

interface IProps {
  title: string;
  events: IEvent[];
}

export const CharacterEventsList: React.FC<IProps> = ({ title, events }) => {
  const availableEvents = events.length ? (
    events.map((event, index) => <CharacterEvent key={index} event={event} />)
  ) : (
    <p className="error-message">No events available</p>
  );

  return (
    <FlexBox vAlign={Alignment.left} className="events-collection">
      <h2 className="events-collection-title">{title}</h2>
      {availableEvents}
    </FlexBox>
  );
};
