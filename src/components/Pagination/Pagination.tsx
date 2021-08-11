import React from "react";
import { Button } from "@lumx/react";
import { NavLink } from "react-router-dom";

interface IProps {
  itemPerPage: number;
  itemNumber: number;
  path: string;
}

const Pagination: React.FC<IProps> = ({ itemPerPage, itemNumber, path }) => {
  return (
    <nav id="pagination">
      {[...Array(Math.ceil(itemNumber / itemPerPage))].map((_, i) => (
        <NavLink className="navlink" key={i + 1} to={`${path}/${i + 1}`}>
          <Button className="navlink-button">{i + 1}</Button>
        </NavLink>
      ))}
    </nav>
  );
};

export default Pagination;
