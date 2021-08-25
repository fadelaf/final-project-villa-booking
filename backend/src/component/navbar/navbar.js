import React from "react";
import "../../index.css";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
function Navbar({ userLogin }) {
  let history = useHistory();
  const logoutHandler = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Hello there..",
      text: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        userLogin(false);
        localStorage.clear();
        history.push("/");
      }
    });
  };
  return (
    <div className="flex justify-around shadow-lg">
      <div className="p-2">VillaIn</div>
      <div>
        <ul className="inline-flex justify-around">
          <div className="p-2 mr-2">
            <Link to="/dashboard">Dashboard</Link>
          </div>
          <div className="p-2 mr-2">
            <Link to="/profile">Profile</Link>
          </div>
          <div className="p-2 mr-2">
            {" "}
            <Link to="/myVilla">My Villa</Link>
          </div>
          <div className="p-2 mr-2">
            <Link to="/addVilla">Add Villa</Link>
          </div>
        </ul>
      </div>
      <div className="p-2">
        <button onClick={(e) => logoutHandler(e)}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
