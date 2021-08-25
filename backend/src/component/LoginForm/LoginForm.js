import React from "react";
import { Submit } from "..";
import { useState } from "react";
import { login } from "../../API";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
function LoginForm({ userLogin, getToken, getUser }) {
  const history = useHistory();
  const [form, setFormState] = useState({
    email: "",
    password: "",
    type: "admin",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    const loginData = await login(form);
    console.log(loginData);

    try {
      if (loginData.status === 200) {
        const access_token = loginData.access_token;

        userLogin(true);
        getToken(access_token);
        getUser(loginData.user);
        history.push("/dashboard");
      }
    } catch (err) {
      console.log("error");
    }
  };
  return (
    <div>
      {" "}
      <form action="" className="text-left my-2">
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
                onChange={(e) =>
                  setFormState({ ...form, email: e.target.value })
                }
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
                onChange={(e) =>
                  setFormState({ ...form, password: e.target.value })
                }
              />
            </div>
          </div>
          <div class="flex justify-center mb-2 p-2">
            <Submit handler={submitHandler} />
            <Link
              to="/register"
              className="ml-2 bg-green-400 hover:bg-green-500 text-white font-bold py-1 px-5 rounded-full"
            >
              {" "}
              Register
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
