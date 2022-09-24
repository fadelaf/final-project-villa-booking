import React from "react";
import Handler from "../button/Handler";
import { useState } from "react";
import { useHistory } from "react-router";
import { login } from "../../API";
import Swal from "sweetalert2";
import { useEffect } from "react";

function LoginForm({ handler, userLogin, getToken, getUser }) {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    type: "user",
  });

  const history = useHistory();

  const loginHandler = async (e) => {
    e.preventDefault();

    let data = await login(loginData);
    console.log(data);
    if (data.status === 200) {
      userLogin(true);
      getToken(data.access_token);
      getUser(data.user);
      Swal.fire({
        icon: "success",
        title: "Login Success",
      });

      // // console.log(data.user);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "User not Found/Invalid Password",
      });
    }

    // console.log(data);
  };

  useEffect(() => {}, []);
  // console.log(loginData);

  return (
    <div className="">
      {" "}
      <form action="" className="text-left my-2">
        <div className="flex justify-end">
          <div>
            <button onClick={(e) => handler(e)}>x</button>
          </div>
        </div>
        <div class="bg-gray-100 rounded-md p-2 px-4 mb-2 flex flex-col">
          <div className="text-center text-xl mb-5">Login</div>
          <div class="container mb-2 pd-2">
            <label class="block pb-3 " for="email">
              <strong>Email </strong>
            </label>
            <div class="p-2">
              <input
                type="email"
                id="email"
                class="w-full mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 
            border-gray-500
            focus:outline-none focus:border-green-500"
                onChange={(e) => {
                  setLoginData({ ...loginData, email: e.target.value });
                }}
              />
            </div>
          </div>
          <div class="container mb-2 pd-2">
            <label class="block pb-3 " for="password">
              <strong>Password</strong>
            </label>
            <div class="p-2">
              <input
                type="password"
                id="password"
                class="w-full mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700
             focus:outline-none focus:border-green-500
             border-gray-500"
                placeholder="insert password"
                autoComplete="current-password"
                onChange={(e) => {
                  setLoginData({ ...loginData, password: e.target.value });
                }}
              />
            </div>
          </div>
          <div class="flex justify-center mb-2 p-2">
            {/* <button className="ml-2 bg-green-400 hover:bg-green-500 text-white font-bold py-1 px-5 rounded-full">
              {" "}
              Login
            </button> */}
            <Handler desc={"Login"} handler={loginHandler} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
