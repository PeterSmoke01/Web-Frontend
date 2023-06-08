import React from "react";
import { NavLink } from "react-router-dom";
const UserMenu = () => {
  return (
    <div>
      <div className="text-center">
        <div className="list-group">
          <h4>Dash board</h4>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action"
          >
            Update Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/collection"
            className="list-group-item list-group-item-action"
          >
            My Car Collection
          </NavLink>

          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action"
          >
            Add Cars
          </NavLink>
          <NavLink
            to="/dashboard/user/requests"
            className="list-group-item list-group-item-action"
          >
            Requested Cars
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
