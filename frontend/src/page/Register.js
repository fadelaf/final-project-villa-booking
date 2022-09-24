import React from "react";
import Handler from "../component/button/Handler";
import Swal from "sweetalert2";
import { useHistory } from "react-router";
import { useState } from "react";
import { register } from "../API";
import { Navbar } from "../component";

function Register() {
  const [form, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    birthdate: "",
    gender: "",
    type: "user",
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
      <div className="container-lg items-center h-screen w-full flex justify-center content-center bg-cover-photo">
        <form action="" className="text-left my-2">
          <div class="bg-gray-200 rounded-md p-2 px-4 mb-2 flex flex-col">
            <div class="container mb-2 pd-2">
              <label class="block pb-3" for="name">
                Name{" "}
              </label>
              <input
                className="form-input p-1"
                type="text"
                id="name"
                onChange={(e) =>
                  setFormState({ ...form, name: e.target.value })
                }
              />
            </div>
            <div class="container mb-2 pd-2">
              <label class="block pb-3" for="email">
                Email{" "}
              </label>
              <input
                className="p-1"
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
                className="p-1"
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
                className="p-1"
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
              <input
                className="p-1"
                type="text"
                id="type"
                value="user"
                readOnly
              />
            </div>
            <div class="flex justify-center mt-4 pd-2">
              <Handler handler={submitHandler} desc={"Submit"} />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
