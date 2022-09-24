import React from "react";
import { useState } from "react";
import { getVillaDetail } from "../API";
import { useEffect } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { addCart } from "../API";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import HotelIcon from "@material-ui/icons/Hotel";
import BathtubIcon from "@material-ui/icons/Bathtub";
import Avatar from "@material-ui/core/Avatar";
function VillaDetail({ login }) {
  const [villaDetail, setVillaDetail] = useState({});
  const [user, setUser] = useState({});
  const [image, setImage] = useState([]);
  const [comment, setComment] = useState([]);
  const [display, setDisplay] = useState();
  const params = useParams();
  const id = +params.id;
  const access_token = localStorage.access_token;
  const URL = "http://localhost:3000";

  const getDetail = async () => {
    let data = await getVillaDetail(id);
    setVillaDetail(data);
    setUser(data.User);
    setImage(data.Villas_images);
    setComment(data.Villas_comments);
  };

  const displayClick = (e, name) => {
    setDisplay(name);
  };

  const reserveHandler = async (e) => {
    e.preventDefault();
    let data = await addCart(access_token, id);
    if (data.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Added to Cart",
      });
    }
    // console.log(data);
  };
  console.log(comment);
  useEffect(() => {
    getDetail();
  }, []);

  return (
    <div className="flex justify-center py-5">
      <div className="border-2 border-red-200 rounded-md h-max-content w-1000px">
        <div className="p-4">
          <h1 className="pb-4 text-4xl font-bold">{villaDetail?.title}</h1>
          <hr />
        </div>
        <div className=" px-4 text-2xl font-light">
          <h1>
            <LocationOnIcon /> {villaDetail?.address}{" "}
          </h1>
        </div>
        <div className="py-2 px-2 flex">
          <div className="py-2 ">
            <div
              className="h-full w-full"
              style={{ width: "750px", height: "500px" }}
            >
              {display ? (
                <img
                  className=" rounded-md object-cover h-full w-full object-center object-scale-down"
                  src={`${URL}/images/villas/${display}`}
                  alt=""
                />
              ) : (
                <img
                  className="rounded-md object-cover h-full w-full object-center object-scale-down"
                  src={`${URL}/images/villas/${image[0]?.filename}`}
                  alt=""
                />
              )}
            </div>
          </div>
          <div className="py-2 px-2 flex flex-col flex-wrap">
            {image.map((item) => {
              return (
                <div
                  className="p-1 cursor-pointer"
                  style={{ width: "120px", height: "100px" }}
                >
                  <img
                    name={item?.filename}
                    className="rounded-md object-cover h-full w-full object-center"
                    src={`${URL}/images/villas/${item?.filename}`}
                    alt=""
                    onClick={(e) => displayClick(e, e.target.name)}
                  />
                </div>
              );
            })}

            {/* <div className="p-1">
              <img
                className="h-30rem "
                src="https://images.unsplash.com/photo-1521782462922-9318be1cfd04?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80"
                alt=""
              />
            </div>
            <div className="p-1">
              <img
                className="h-30rem"
                src="https://images.unsplash.com/photo-1521782462922-9318be1cfd04?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80"
                alt=""
              />
            </div> */}
          </div>
        </div>
        <div className="py-2 flex flex-row justify-around">
          <div className="py-2 px-10 w-40rem border-r-2">
            <div className="flex flex-row ">
              <div className="font-medium">
                <h1>Villa is Hosted by : </h1>
              </div>
              <div className="ml-60">
                <div className="flex ">
                  <div className="text-center pr-4 pt-2 ">{user?.name}</div>
                  <div>
                    <Avatar
                      alt="Remy Sharp"
                      src={`${URL}/images/avatar/${user?.avatar}`}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-2">
              <span className="px-4 font-light">
                {villaDetail?.bedrooms} <HotelIcon />
              </span>
              <span className="px-4 font-light">
                {villaDetail?.bathrooms} <BathtubIcon />
              </span>
              <span className="px-4 font-light">
                {villaDetail?.floor} floor
              </span>
            </div>

            <div>
              {" "}
              <div className="p-2 font-medium ">
                Villa Type : {villaDetail?.type}
              </div>
              <div className="p-2 font-light ">
                facility : {villaDetail?.facility}
              </div>
              <div className="p-2">
                <div className="pb-4 font-medium">Description :</div>
                {villaDetail?.description}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
                saepe quidem quae commodi cupiditate quos odio doloremque
                ducimus iste soluta totam explicabo, similique, facere, ex cum
                repellendus laboriosam amet expedita.
              </div>
            </div>
            <div>
              <div className="text-xl font-bold pt-4 border-b-2">comments</div>
              <div className="py-4">
                {comment.map((item) => {
                  return (
                    <div className="p-1">
                      <div>
                        {" "}
                        <Box component="fieldset" borderColor="transparent">
                          <Rating
                            name="read-only"
                            value={item?.rating}
                            readOnly
                          />
                        </Box>
                      </div>
                      <div>{item?.comments}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="border-2 border-red-400 rounded-md h-24">
            <div className="p-4 ">
              <div className="flex justify-center ">
                <div className="p-2">
                  {login ? (
                    <button
                      className="bg-red-400 hover:bg-red-500 text-white rounded-lg font-bold p-2 "
                      onClick={(e) => reserveHandler(e)}
                    >
                      Add to Book Cart
                    </button>
                  ) : (
                    <div className="bg-gray-400 text-white rounded-lg font-bold p-2 ">
                      Login For Book
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VillaDetail;
