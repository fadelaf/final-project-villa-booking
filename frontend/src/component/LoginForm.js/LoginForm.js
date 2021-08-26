import React from "react";
import Handler from "../button/Handler";

function LoginForm({ handler }) {
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
              />
            </div>
          </div>
          <div class="flex justify-center mb-2 p-2">
            <a className="ml-2 bg-green-400 hover:bg-green-500 text-white font-bold py-1 px-5 rounded-full">
              {" "}
              Login
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
