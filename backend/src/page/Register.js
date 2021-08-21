import React from "react";
import "../index.css";
import { Submit } from "../component";

function Register() {
  return (
    <div className="container-lg items-center h-screen w-full flex justify-center content-center">
      <form action="" className="text-left my-2">
        <div class="bg-green-100 rounded-md p-2 px-4 mb-2 flex flex-col">
          <div class="container mb-2 pd-2">
            <label class="block pb-3" for="name">
              Name{" "}
            </label>
            <input className="form-input" type="text" id="name" />
          </div>
          <div class="container mb-2 pd-2">
            <label class="block pb-3 " for="email">
              Email{" "}
            </label>
            <input type="email" id="email" />
          </div>
          <div class="container mb-2 pd-2">
            <label class="block pb-3 " for="password">
              Password
            </label>
            <input type="Password" id="password" />
          </div>
          <div class="container mb-2 pd-2">
            <label class="block pb-3 " for="birthdate">
              Birthdate
            </label>
            <input type="date" id="birthdate" />
          </div>
          <div class="container mb-2 pd-2">
            <label class="block pb-3 " for="gender">
              Gender
            </label>
            <select name="gender" id="gender">
              <option value="">Select Gender</option>
              <option value="">Male</option>
              <option value="">Female</option>
              <option value="">Rather Not To Say</option>
            </select>
          </div>
          <div class="container mb-2 pd-2">
            <label class="block pb-3 " for="type">
              Type
            </label>
            <input type="text" id="type" value="admin" readOnly />
          </div>
          <div class="container mt-4 pd-2">
            <Submit />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
