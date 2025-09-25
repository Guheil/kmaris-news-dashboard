"use client";

import { FC } from "react";
import { NoResultsProps } from "./interface";
import {
  NoResults,
  NoResultsIcon,
  NoResultsTitle,
  NoResultsText,
} from "./elements";

export const NoResultsComponent: FC<NoResultsProps> = ({
  icon,
  title,
  text,
}) => {
  return (
    <NoResults>
      {icon && <NoResultsIcon>{icon}</NoResultsIcon>}
      <NoResultsTitle>{title}</NoResultsTitle>
      {text && <NoResultsText>{text}</NoResultsText>}
    </NoResults>
  );
};

export default NoResultsComponent;