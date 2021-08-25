import React from "react";
import { Link } from "react-router-dom";

function NavbarBeforeLogin() {
  return (
    <div className="flex justify-around shadow-md">
      <div className="p-2">VillaIn</div>
      <div>
        <ul className="inline-flex justify-around">
          <div className="p-2 mr-2">
            <Link to="/">Home</Link>
          </div>
          <div className="p-2 mr-2">
            <Link to="/register">Register</Link>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default NavbarBeforeLogin;
