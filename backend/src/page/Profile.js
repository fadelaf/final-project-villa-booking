import React, { useState } from "react";
import { useEffect } from "react";
import { adminUpdate } from "../API";
import Swal from "sweetalert2";
function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    password: "",
    email: "",
    // avatar: "",
  });

  const [file, setFile] = useState({});
  const [data, setData] = useState({});
  const dataParse = JSON.parse(localStorage.getItem("admin"));
  const access_token = localStorage.access_token;
  // console.log(access_token);

  const [edit, setEdit] = useState();
  const editHandler = (e) => {
    e.preventDefault();
    setEdit(true);
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    setEdit(false);
  };

  // const handleUpload = (e) => {
  //   document.getElementById("file").click();
  //   // console.log(display);
  // };
  // const upload = (e) => {
  //   const file = e.target.files[0];
  //   const URLcreateObject = URL.createObjectURL(file);
  //   // setDisplayFiles(URLcreateObject);
  //   // setFile(file);
  //   console.log(file);
  // };
  const saveHandler = async (e) => {
    e.preventDefault();
    // console.log("save");
    if (profile.password === null) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please insert your password",
      });
    } else {
      let newData = new FormData();
      newData.append("name", profile.name);
      newData.append("password", profile.password);
      newData.append("email", profile.email);
      newData.append("file", file);

      let updateData = await adminUpdate(access_token, newData);
      if (updateData.status === 200) {
        localStorage.setItem(
          "admin",
          JSON.stringify(updateData.data.newUpdate)
        );
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Profile Updated",
        });

        cancelHandler(e);
      }
    }
  };
  useEffect(() => {
    const { name, email } = JSON.parse(localStorage.getItem("admin"));

    setProfile({
      name,
      password: null,
      email,
    });

    setData({ ...dataParse });
  }, [edit]);

  // useEffect(() => {
  //   setDisplay(display);
  // }, []);
  // console.log(access_token);
  console.log(file);
  // console.log(data);
  // console.log(dataParse);
  return (
    <>
      <div className="h-10"></div>
      <div className="flex height-800px bg-gray-100 justify-center items-center  ">
        <div className="height-500px w-6/12 bg-white shadow-md grid grid-cols-2">
          <div className="rounded-md">
            <div className="flex-col">
              <div className="flex justify-center mt-12 p-5">
                <img src="https://via.placeholder.com/150" alt="" type="file" />
              </div>
              <div className="flex justify-center upload-pp">
                {edit ? (
                  <div>
                    <input
                      type="file"
                      id="file"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                      }}
                    />
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <br />
              <hr />
              <div className="text-center p-10">
                <h3>Account Verified</h3>
              </div>
            </div>
          </div>
          <div className="p-10">
            <h1 className="text-4xl p-4">Hello {data.name}</h1>
            <hr />
            <h3 className="p-2">Your Profile</h3>
            <div>
              {edit ? (
                <div className="bg-green-200">
                  <div className="p-2 ">
                    <label className="block pb-2" for="name">
                      Name:{" "}
                    </label>
                    <input
                      type="text"
                      defaultValue={data.name}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "") {
                          setProfile({
                            ...profile,
                            name: profile.name,
                          });
                        } else {
                          setProfile({
                            ...profile,
                            name: value,
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="p-2">
                    <label className="block pb-2" for="password">
                      Password:{" "}
                    </label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Insert Password"
                      onChange={(e) => {
                        setProfile({ ...profile, password: e.target.value });
                      }}
                    />
                  </div>
                  <div className="p-2">
                    <label className="block pb-2" for="email">
                      Email:{" "}
                    </label>
                    <input
                      id="email"
                      type="text"
                      defaultValue={data.email}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "") {
                          setProfile({
                            ...profile,
                            email: profile.email,
                          });
                        } else {
                          setProfile({
                            ...profile,
                            email: value,
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="flex mt-2">
                    <button
                      className=" rounded-md bg-green-700 w-16 h-8 text-center align-middle text-white"
                      onClick={(e) => {
                        saveHandler(e);
                      }}
                    >
                      Save
                    </button>
                    <button
                      className="rounded-md bg-green-700 w-16 h-8 text-center align-middle text-white ml-2"
                      onClick={(e) => {
                        cancelHandler(e);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-grey-200">
                  <div className="p-2 ">
                    <label className="block pb-2" for="name">
                      Name:{" "}
                    </label>
                    <input type="text" value={data.name} readOnly />
                  </div>
                  <div className="p-2">
                    <label className="block pb-2" for="name">
                      Password:{" "}
                    </label>
                    <input type="password" placeholder="***" readOnly />
                  </div>
                  <div className="p-2">
                    <label className="block pb-2" for="name">
                      Email:{" "}
                    </label>
                    <input type="text" value={data.email} />
                  </div>
                  <div className="rounded-md bg-red-200 w-16 h-8 text-center align-middle">
                    <button
                      className="rounded-md bg-green-700 w-16 h-8 text-center align-middle text-white"
                      onClick={(e) => {
                        editHandler(e);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              )}

              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
