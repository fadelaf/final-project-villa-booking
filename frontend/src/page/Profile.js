import React, { useState } from "react";
import { useEffect } from "react";
// import { adminUpdate } from "../API";
import Swal from "sweetalert2";
import { userUpdate } from "../API";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    password: "",
    email: "",
    // avatar: "",
  });
  const URL = "http://localhost:3000";

  const [displayFiles, setDisplayFiles] = useState();

  const [file, setFile] = useState({});
  const [data, setData] = useState({});
  const dataParse = JSON.parse(localStorage.getItem("user"));
  const access_token = localStorage.access_token;
  console.log(access_token);

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

      let updateData = await userUpdate(access_token, newData);
      console.log(updateData);
      if (updateData.status === 200) {
        localStorage.setItem("user", JSON.stringify(updateData.data.newUpdate));
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
    const { name, email } = JSON.parse(localStorage.getItem("user"));

    setProfile({
      name,
      password: null,
      email,
    });

    setData({ ...dataParse });
  }, [edit]);

  // console.log(profile);
  // console.log(data.avatar);
  return (
    <>
      {data === "" ? (
        ""
      ) : (
        <>
          {" "}
          <div className="h-10"></div>
          <div className="flex height-800px bg-gray-100 justify-center items-center  py-12">
            <div className="height-500px w-6/12 bg-white shadow-md grid grid-cols-2">
              <div className="rounded-md">
                <div className="flex-col">
                  <div className="flex justify-center mt-12 p-5">
                    {displayFiles ? (
                      <img
                        src={`${displayFiles}`}
                        alt="avatar"
                        style={{
                          width: "100px",
                          height: "300px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <img
                        src={`${URL}/images/avatar/${data?.avatar}`}
                        alt="avatar"
                        style={{
                          width: "300px",
                          height: "400px",
                          objectFit: "cover",
                        }}
                      />
                    )}
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
                <h1 className="text-4xl p-4">Hello {data?.name}</h1>
                <hr />
                <h3 className="p-2">Your Profile</h3>
                <div>
                  {edit ? (
                    <div className="">
                      <div className="p-2 ">
                        <label className="block pb-2" for="name">
                          Name:{" "}
                        </label>
                        <input
                          className="bg-gray-100 p-2 rounded-md"
                          type="text"
                          defaultValue={data.name}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === "") {
                              setProfile({
                                ...profile,
                                name: profile?.name,
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
                          className="bg-gray-100 p-2 rounded-md"
                          id="password"
                          type="password"
                          placeholder="Insert Password"
                          onChange={(e) => {
                            setProfile({
                              ...profile,
                              password: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="p-2">
                        <label className="block pb-2" for="email">
                          Email:{" "}
                        </label>
                        <input
                          className="bg-gray-100 p-2 rounded-md"
                          id="email"
                          type="text"
                          defaultValue={data.email}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === "") {
                              setProfile({
                                ...profile,
                                email: profile?.email,
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
                        <input type="text" value={data?.name} readOnly />
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
                        <input type="text" value={data?.email} />
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
          </div>{" "}
        </>
      )}
    </>
  );
}

export default Profile;
