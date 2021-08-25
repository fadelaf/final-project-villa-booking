import React, { useState } from "react";
import Swal from "sweetalert2";
import { Submit } from "../component";
import { addVilla } from "../API";
import { useHistory } from "react-router";

function AddVilla() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");
  const [bedrooms, setBed] = useState();
  const [bathrooms, setBath] = useState();
  const [floor, setFloor] = useState();
  const [facility, setFaciltity] = useState("");
  const [price, setPrice] = useState();
  const [file, setFile] = useState([]);
  const history = useHistory();

  const access_token = localStorage.access_token;

  // console.log(file);

  // file.map((item) => {
  //   console.log(item);
  // });
  // console.log(file[0]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      title == "" ||
      desc == "" ||
      address == "" ||
      type == "" ||
      bedrooms == "" ||
      bathrooms == "" ||
      floor == "" ||
      facility == "" ||
      price == ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please Complete Your Form",
      });
    } else {
      try {
        if (price < 0 || bedrooms < 0 || bathrooms < 0 || floor < 0) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Invalid Data",
          });
        } else {
          let data = new FormData();
          [...file].forEach((file, i) => {
            data.append(`file`, file);
          });
          // data.append("files", file);
          data.append("title", title);
          data.append("description", desc);
          data.append("address", address);
          data.append("type", type);
          data.append("bedrooms", bedrooms);
          data.append("bathrooms", bathrooms);
          data.append("floor", floor);
          data.append("facility", facility);
          data.append("price", price);
          console.log(data.getAll("files"));
          let dataBaru = await addVilla(access_token, data);
          console.log(dataBaru);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Add Villa Success",
          });
          history.push("/myVilla");
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "error",
          text: "Invalid Data",
        });
      }
    }
  };

  return (
    <div>
      <div></div>
      <div className="flex flex-col bg-gray-100 justify-center items-center mt-10 mb-10">
        <div className="mt-10 height-500px w-6/12 bg-white shadow-md self-center ">
          <div className="p-2">
            <h2 className="p-2">Add Your Villa</h2>
          </div>
          <hr />
          <div className="grid grid-cols-2">
            <div className="p-5">
              <label for="">Villa Name</label>
              <div className="p-2">
                <input
                  type="text"
                  placeholder="Enter your input here"
                  class="w-full mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <label for="">Description</label>
              <div className="p-2">
                <textarea
                  class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                  rows="4"
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                ></textarea>
              </div>
              <label for="">Address</label>
              <div className="p-2">
                <input
                  type="text"
                  placeholder="Enter your input here"
                  class="w-full mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="p-5">
              <span>
                <label for="">Type : </label> <span> </span>
                <select
                  class="w-50 border bg-white rounded px-3 py-2 outline-none mr-5"
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                >
                  <option placeholder="Select" value="">
                    {" "}
                    Select
                  </option>
                  <option class="py-1" value="Standard">
                    Standard
                  </option>
                  <option class="py-1" value="Premium">
                    Premium
                  </option>
                  <option class="py-1" value="VIP">
                    VIP
                  </option>
                </select>
                <span></span>
                <label for="">Bedrooms : </label>
                <input
                  type="number"
                  placeholder="rooms"
                  class="w-24 px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-green-500
                  text-center"
                  onChange={(e) => {
                    setBed(e.target.value);
                  }}
                />
              </span>
              <div className="mt-5">
                <span>
                  <label for="">Bathrooms : </label>
                  <input
                    type="number"
                    placeholder="rooms"
                    class="w-24 px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-green-500
                  text-center mr-5"
                    onChange={(e) => {
                      setBath(e.target.value);
                    }}
                  />
                  <label for="">Floor : </label>
                  <input
                    type="number"
                    placeholder="rooms"
                    class="w-24 px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-green-500
                  text-center"
                    onChange={(e) => {
                      setFloor(e.target.value);
                    }}
                  />
                </span>
                <div className="mt-5">
                  <span>
                    {" "}
                    <label for="">Facility : </label>
                    <input
                      type="text"
                      placeholder="Enter Facility"
                      class="w-full mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                      onChange={(e) => {
                        setFaciltity(e.target.value);
                      }}
                    />
                  </span>
                </div>
                <div className="mt-2">
                  <span>
                    {" "}
                    <label for="">Price : </label>
                    <input
                      type="number"
                      placeholder="Enter Price"
                      class="w-full mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 mb-10 height-500px w-6/12 bg-white shadow-md self-center">
          <div class="flex justify-center mt-8">
            <div class="w-full rounded-lg shadow-xl bg-gray-50">
              <div class="m-4 h-full p-12   ">
                <label class="inline-block mb-2 text-gray-500">
                  File Upload
                </label>
                <div class="flex items-center justify-center w-full">
                  <label class="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                    <div class="flex flex-col items-center justify-center pt-7">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                        {file.length === "" ? (
                          <span>Attach one or more files</span>
                        ) : (
                          <h1 className="text-red-700 text-xl">
                            {" "}
                            <span>{file.length} files Attached </span>
                          </h1>
                        )}
                      </p>
                    </div>
                    <input
                      type="file"
                      class="opacity-0"
                      multiple
                      onChange={(e) => {
                        setFile(e.target.files);
                      }}
                    />
                  </label>
                </div>
              </div>
              <div class="flex justify-center p-2">
                <Submit handler={submitHandler}></Submit>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddVilla;
