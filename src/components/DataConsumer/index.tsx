import { Kind, MyMessage } from "../MyMessage";
import React from "react";
import { BoxLoading } from "react-loadingg";

export enum EDataStatus {
  loading = "loading",
  success = "success",
  failure = "failure",
  error = "error",
}

export interface IProps {
  dataStatus: EDataStatus;
  successJSX: () => JSX.Element;
}

/*
 ** Return a JSX.Element based on the current dataStatus.
 */
export const DataConsumer: React.FC<IProps> = ({ dataStatus, successJSX }) => {
  switch (dataStatus) {
    case EDataStatus.loading:
      return <BoxLoading color="#0000ff" speed={0.3} size="large" />;
    case EDataStatus.success:
      return successJSX();
    case EDataStatus.failure:
      return (
        <MyMessage kind={Kind.warning} hasBackground>
          <p>No data available sorry :[</p>
        </MyMessage>
      );
    case EDataStatus.error:
      return (
        <MyMessage kind={Kind.error} hasBackground>
          <p>Oops something went wrong :(</p>
        </MyMessage>
      );
    default:
      return null;
  }
};
