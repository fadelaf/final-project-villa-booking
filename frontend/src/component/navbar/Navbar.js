import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LoginForm } from "..";
import { useEffect } from "react";
import Handler from "../button/Handler";

function Navbar({ login }) {
  const [loginFormShow, setLoginFormShow] = useState(false);

  const loginShowHandler = (e) => {
    if (loginFormShow == false) {
      setLoginFormShow(true);
    } else {
      setLoginFormShow(false);
    }
  };

  const logoutHandler = (e) => {
    e.preventDefault();
  };

  //   useEffect(() => {}, [loginFormShow]);

  //   console.log(loginFormShow);

  //   console.log(loginFormShow);

  return (
    <>
      {login ? (
        <div className="relative flex justify-around items-center shadow-lg h-20 bg-transparent">
          <div className="p-2">VillaIn</div>
          <div>
            <ul className="inline-flex justify-around">
              <div className="p-2 mr-2">
                <Link to="/">Home</Link>
              </div>
              <div className="p-2 mr-2">Explore Villa</div>
              <div className="p-2 mr-2"></div>
            </ul>
          </div>
          <div className="flex p-2">
            <Link
              to="/register"
              className="ml-2 bg-red-400 hover:bg-red-500 text-white font-bold py-1 px-5 rounded-full"
            >
              My Profile
            </Link>
            <Handler handler={logoutHandler} desc={"Logout"} />
            {/* <button onClick={(e) => logoutHandler(e)}>Logout</button> */}
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
              <div className="p-2 mr-2">Explore Villa</div>
              <div className="p-2 mr-2"></div>
            </ul>
          </div>
          <div className="flex p-2">
            <div className="inline-block relative">
              {" "}
              <Handler handler={loginShowHandler} desc={"Login"} />
              {loginFormShow ? (
                <div className="absolute w-200px right-0 mt-5 shadow-lg text-right rounded-lg p-4 bg-gray-100 ">
                  <LoginForm handler={loginShowHandler} />
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
