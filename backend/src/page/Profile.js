import React, { useState } from "react";
import { useEffect } from "react";
function Profile() {
  const [data, setData] = useState({
    name: "",
    password: "",
    email: "",
  });

  const [edit, setEdit] = useState();
  const editHandler = () => {
    setEdit(true);
  };

  const dataParse = JSON.parse(localStorage.getItem("admin"));
  console.log(dataParse);

  // useEffect(() => {}, []);
  return (
    <div className="flex height-800px bg-black justify-center items-center  ">
      <div className="height-500px w-full bg-white shadow-md grid grid-cols-2">
        <div>as</div>
        <div>
          <h1 className="text-4xl p-4">Hello Account</h1>
          <hr />
          <h3 className="p-2">Your Profile</h3>
          <div>
            <div className="p-2">
              <label className="block pb-2" for="name">
                Name:{" "}
              </label>
              <input type="text" value={dataParse.name} readOnly />
            </div>
            <div className="p-2">
              <label className="block pb-2" for="name">
                Password:{" "}
              </label>
              <input type="text" value="*******" readOnly />
            </div>
            <div className="p-2">
              <label className="block pb-2" for="name">
                Email:{" "}
              </label>
              <input type="text" value={dataParse.email} />
            </div>
            <div>
              <button>Edit</button>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
