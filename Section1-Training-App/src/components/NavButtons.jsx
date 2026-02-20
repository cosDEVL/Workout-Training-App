import React from "react";
import { NavLink } from "react-router";

export default function NavButtons({ path, text }) {
  return (
    <div className="link">
      <NavLink to={path}>{text}</NavLink>
    </div>
  );
}
