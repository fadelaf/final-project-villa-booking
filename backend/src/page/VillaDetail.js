import React, { useState } from "react";
import "../index.css";
import { villaDetail, updateVilla } from "../API";
import { useHistory, useParams } from "react-router";
import { useEffect } from "react";
import { Submit } from "../component";
import Swal from "sweetalert2";

function VillaDetail() {
  const params = useParams();
  const id = +params.id;
  const access_token = localStorage.access_token;
  const history = useHistory();

  const [villaData, setVillaData] = useState({});
  const [form, setForm] = useState({});
  const [file, setFile] = useState([]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // console.log(villaData);

  const getVilla = async () => {
    let data = await villaDetail(access_token, id);
    setVillaData(data);
    // console.log(data);
    setForm(data);
    setFile(data.Villas_images);
  };
  const submitUpdate = async (e) => {
    e.preventDefault();
    if (
      form.title == "" ||
      form.desc == "" ||
      form.address == "" ||
      form.type == "" ||
      form.bedrooms == "" ||
      form.bathrooms == "" ||
      form.floor == "" ||
      form.facility == "" ||
      form.price == ""
    ) {
      Swal.fire({
        icon: "error",
        title: "invalid",
        text: "Please Complete Your Form",
      });
      // console.log(false);
    } else {
      let data = new FormData();
      data.append("title", form.title);
      data.append("description", form.description);
      data.append("address", form.address);
      data.append("type", form.type);
      data.append("bedrooms", form.bedrooms);
      data.append("bathrooms", form.bathrooms);
      data.append("floor", form.floor);
      data.append("facility", form.facility);
      data.append("price", form.price);
      // console.log("click");
      let update = await updateVilla(access_token, id, data);
      if (update.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Updated",
          text: "Data Has Been Updated",
        });
        getVilla();
        history.push("/myVilla");
      } else {
        Swal.fire({
          icon: "error",
          title: "invalid",
          text: "Invalid Data",
        });
      }
    }

    // console.log(update);
  };
  console.log(file);
  useEffect(() => {
    getVilla();
  }, []);

  return (
    <>
      <div className="h-10 "></div>
      <div className="flex height-max-content bg-gray-100 justify-center items-center  ">
        <div className="h-max-content bg-white shadow-md">
          <div class="grid grid-rows-3 grid-flow-col gap-4">
            <div className="row-span-3 ml-16 mt-12 height-500px w-max-content border-2">
              <img
                className="h-full w-full"
                src="https://images.unsplash.com/photo-1593642532744-d377ab507dc8?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                alt=""
              />
              <div>
                {/* {file.map((item) => {
                  console.log(item);
                  return (
                    <span>
                      <img
                        src={`http://localhost:3000/images/villas/${item.filename}}`}
                        alt=""
                      />
                    </span>
                  );
                })} */}
              </div>
            </div>
            <div class="col-span-2 p-10">
              <div className="border-2 p-6">
                <label for="">Villa Name</label>
                <div className="p-2">
                  <input
                    name="title"
                    type="text"
                    placeholder="Enter your input here"
                    class="w-full mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                    defaultValue={villaData.title}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <label for="">Description</label>
                <div className="p-2">
                  <textarea
                    name="description"
                    class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-green-500"
                    rows="4"
                    defaultValue={villaData.description}
                    onChange={(e) => handleChange(e)}
                  ></textarea>
                </div>
                <label for="">Address</label>
                <div className="p-2">
                  <input
                    type="text"
                    placeholder="Enter your input here"
                    class="w-full mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                    name="address"
                    defaultValue={villaData.address}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="mt-5">
                  <span>
                    {" "}
                    <label for="">Facility : </label>
                    <input
                      type="text"
                      placeholder="Enter Facility"
                      class="w-full mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                      defaultValue={villaData.facility}
                      name="facility"
                      onChange={(e) => handleChange(e)}
                    />
                  </span>
                </div>
                <span>
                  <label for="">Type : </label> <span> </span>
                  <select
                    class="w-50 border bg-white rounded px-3 py-2 outline-none mr-5"
                    name="type"
                    onChange={(e) => handleChange(e)}
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
                  <label for="">Bedrooms : </label>
                  <input
                    type="text"
                    placeholder="rooms"
                    class="w-20 px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-green-500
                  text-center"
                    name="bedrooms"
                    defaultValue={villaData.bedrooms}
                    onChange={(e) => handleChange(e)}
                  />
                  <label for="">Bathrooms : </label>
                  <input
                    type="number"
                    placeholder="rooms"
                    class="w-20 px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-green-500
                  text-center mr-5"
                    name="bathrooms"
                    defaultValue={villaData.bathrooms}
                    onChange={(e) => handleChange(e)}
                  />
                  <label for="">Floor : </label>
                  <input
                    type="number"
                    placeholder="floors"
                    class="w-20 px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-green-500
                  text-center"
                    name="floor"
                    defaultValue={villaData.floor}
                    onChange={(e) => handleChange(e)}
                  />
                  <label className="ml-2" for="">
                    Price/Night :{" "}
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Price per Night"
                    class=" mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                    name="price"
                    defaultValue={villaData.price}
                    onChange={(e) => handleChange(e)}
                  />
                </span>
                <div>
                  {" "}
                  <Submit handler={submitUpdate} />
                </div>
              </div>
            </div>
            <div class="row-span-2 col-span-2 ...">
              {" "}
              {/* <img
                className="h-full w-full"
                src="https://images.unsplash.com/photo-1593642532744-d377ab507dc8?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                alt=""
              /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VillaDetail;
