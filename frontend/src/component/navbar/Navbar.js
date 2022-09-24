import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LoginForm } from "..";
import { useEffect } from "react";
import Handler from "../button/Handler";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import logo from "../../VillaIn.png";
function Navbar({ login, userLogin, getToken, getUser }) {
  const [loginFormShow, setLoginFormShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const loginShowHandler = (e) => {
    if (loginFormShow == false) {
      setLoginFormShow(true);
    } else {
      setLoginFormShow(false);
    }
  };

  console.log(login);
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
        Swal.fire({
          icon: "success",
          text: "Log Out Success",
        });
      }
    });
  };

  useEffect(() => {}, []);

  //   console.log(loginFormShow);

  //   console.log(loginFormShow);

  return (
    <>
      {login ? (
        <div className="relative flex justify-around items-center shadow-lg h-max-content bg-transparent">
          <div className="p-2">
            <img src={logo} alt="" style={{ width: "100px" }} />
          </div>
          <div>
            <ul className="inline-flex justify-around">
              <div className="p-2 ml-56 mr-2">
                <Link to="/">Home</Link>
              </div>
              <div className="p-2 mr-2">
                <Link to="/cart">Book Cart</Link>
              </div>
              <div className="p-2 mr-2">
                <Link to="/booking-list">Book List</Link>
              </div>
              <div className="p-2 mr-2">
                <Link to="/payment">Payment</Link>
              </div>
            </ul>
          </div>
          <div className="flex p-2">
            <Link
              to="/profile"
              className="ml-2 bg-red-400 hover:bg-red-500 text-white font-bold py-1 px-5 rounded-full"
            >
              My Profile
            </Link>
            <Handler handler={logoutHandler} desc={"Logout"} />
          </div>
        </div>
      ) : (
        <div className="relative flex justify-around items-center shadow-lg h-20 bg-transparent">
          <div className="p-2">VillaIn</div>
          <div>
            <ul className="inline-flex justify-around">
              <div className="p-2 mr-2">
                <Link to="/">Home</Link>
              </div>
            </ul>
          </div>
          <div className="flex p-2">
            <div className="inline-block relative">
              {" "}
              <Handler handler={loginShowHandler} desc={"Login"} />
              {loginFormShow ? (
                <div className="absolute w-200px right-0 mt-5 shadow-lg text-right rounded-lg p-4 bg-gray-100 ">
                  <LoginForm
                    handler={loginShowHandler}
                    userLogin={userLogin}
                    getToken={getToken}
                    getUser={getUser}
                  />
                </div>
              ) : (
                ""
              )}
            </div>

            <Link
              to="/register"
              className="ml-2 bg-red-400 hover:bg-red-500 text-white font-bold py-1 px-5 rounded-full"
            >
              Register
            </Link>
            {/* <button onClick={(e) => logoutHandler(e)}>Logout</button> */}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
