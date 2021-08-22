import React from "react";
import { Submit } from "../component";
import { useState } from "react";
import { login } from "../API";
import { useHistory } from "react-router-dom";
function Login({ userLogin, getToken, getUser }) {
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
    <div className="container-lg items-center h-screen w-full flex justify-center content-center">
      <form action="" className="text-left my-2">
        <div class="bg-green-100 rounded-md p-2 px-4 mb-2 flex flex-col">
          <div class="container mb-2 pd-2">
            <label class="block pb-3 " for="email">
              Email{" "}
            </label>
            <input
              type="email"
              id="email"
              onChange={(e) => setFormState({ ...form, email: e.target.value })}
            />
          </div>
          <div class="container mb-2 pd-2">
            <label class="block pb-3 " for="password">
              Password
            </label>
            <input
              type="Password"
              id="password"
              onChange={(e) =>
                setFormState({ ...form, password: e.target.value })
              }
            />
          </div>
          <div class="container mt-4 pd-2">
            <Submit handler={submitHandler} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
