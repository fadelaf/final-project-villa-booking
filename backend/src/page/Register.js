import React, { useState } from "react";
import "../index.css";
import { Submit } from "../component";
import { register } from "../API";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { NavbarBeforeLogin } from "../component";

function Register() {
  const [form, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    birthdate: "",
    gender: "",
    type: "admin",
  });
  let history = useHistory();
  // console.log(form);

  const submitHandler = async (e) => {
    const { name, email, password, birthdate, gender } = form;
    e.preventDefault();

    if (
      name == "" ||
      email == "" ||
      password == "" ||
      birthdate == "" ||
      gender == ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please Complete Your Form",
      });
    } else {
      console.log("click");
      const data = await register(form);
      Swal.fire({
        icon: "success",
        title: "Register Success",
        text: "Please Login First",
      });
      history.push("/");
    }
  };

  return (
    <>
      <NavbarBeforeLogin />
      <div className="container-lg items-center h-screen w-full flex justify-center content-center">
        <form action="" className="text-left my-2">
          <div class="bg-red-200 rounded-md p-2 px-4 mb-2 flex flex-col">
            <div class="container mb-2 pd-2">
              <label class="block pb-3" for="name">
                Name{" "}
              </label>
              <input
                className="form-input"
                type="text"
                id="name"
                onChange={(e) =>
                  setFormState({ ...form, name: e.target.value })
                }
              />
            </div>
            <div class="container mb-2 pd-2">
              <label class="block pb-3 " for="email">
                Email{" "}
              </label>
              <input
                type="email"
                id="email"
                onChange={(e) =>
                  setFormState({ ...form, email: e.target.value })
                }
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
            <div class="container mb-2 pd-2">
              <label class="block pb-3 " for="birthdate">
                Birthdate
              </label>
              <input
                type="date"
                id="birthdate"
                onChange={(e) =>
                  setFormState({ ...form, birthdate: e.target.value })
                }
              />
            </div>
            <div class="container mb-2 pd-2">
              <label class="block pb-3 " for="gender">
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                onChange={(e) =>
                  setFormState({ ...form, gender: e.target.value })
                }
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Rather Not To Say">Rather Not To Say</option>
              </select>
            </div>
            <div class="container mb-2 pd-2">
              <label class="block pb-3 " for="type">
                Type
              </label>
              <input type="text" id="type" value="admin" readOnly />
            </div>
            <div class="container mt-4 pd-2">
              <Submit handler={submitHandler} />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
