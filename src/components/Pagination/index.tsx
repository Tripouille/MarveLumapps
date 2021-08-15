import React from "react";
import { Button } from "@lumx/react";
import { NavLink } from "react-router-dom";

interface IProps {
  itemPerPage: number;
  itemNumber: number;
  path: string;
  activePage: number;
}

export const Pagination: React.FC<IProps> = ({
  itemPerPage,
  itemNumber,
  path,
  activePage,
}) => {
  const getClassName = (pageNumber: number): string => {
    const className = "navlink-button";

    return pageNumber === activePage ? `active ${className}` : className;
  };

  return (
    <nav className="pagination">
      {[...Array(Math.ceil(itemNumber / itemPerPage))].map((_, i) => (
        <NavLink className="navlink" key={i + 1} to={`${path}/${i + 1}`}>
          <Button className={getClassName(i + 1)}>{i + 1}</Button>
        </NavLink>
      ))}
    </nav>
  );
};
