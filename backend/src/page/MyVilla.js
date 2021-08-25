import React, { useEffect, useState } from "react";
// import { getVilla } from "../API";
import axios from "axios";
import { getVilla } from "../API";
import { SmallButton } from "../component";
import { Link } from "react-router-dom";
import { deleteVilla } from "../API/Admin";
function MyVilla() {
  const [villa, setVilla] = useState([]);
  const access_token = localStorage.access_token;

  const myVilla = async () => {
    const data = await getVilla(access_token);
    if (data.status === 200) {
      setVilla(data.villa);
    }
  };

  const deleteHandler = async (e, id) => {
    e.preventDefault();
    // console.log("click");
    // console.log(id);
    deleteVilla(access_token, id);
    myVilla();
  };

  useEffect(() => {
    myVilla();
  }, []);
  return (
    <div className="w-full pt-12">
      <table class="w-full ">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Address</th>
            <th>Type</th>
            <th>Bedrooms</th>
            <th>Bathrooms</th>
            <th>Floor</th>
            <th>Facility</th>
            <th>Price</th>
            <th>Edit / Delete</th>
          </tr>
        </thead>
        <tbody>
          {villa.map((data) => {
            return (
              <tr>
                <td className="p-5">image</td>
                <td>{data.title}</td>
                <td>{data.description}</td>
                <td>{data.address}</td>
                <td>{data.type}</td>
                <td>{data.bedrooms}</td>
                <td>{data.bathrooms}</td>
                <td>{data.floor}</td>
                <td>{data.facility}</td>
                <td>{data.price}</td>
                <td>
                  <div className="flex justify-evenly">
                    <div className="rounded-md pt-0.5 bg-green-700 ring-1 w-16 h-8 text-center align-middle text-white">
                      <Link
                        className="text-center align-middle text-white"
                        to={`/myVilla/${data.id}`}
                      >
                        Edit
                      </Link>
                    </div>
                    <div>
                      <SmallButton
                        desc={"delete"}
                        id={data.id}
                        handler={deleteHandler}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default MyVilla;
