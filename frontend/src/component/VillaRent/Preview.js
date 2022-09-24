import React from "react";
import { Link } from "react-router-dom";
import Handler from "../button/Handler";
import "react-slideshow-image/dist/styles.css";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import HotelIcon from "@material-ui/icons/Hotel";
import BathtubIcon from "@material-ui/icons/Bathtub";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import * as NumberFormat from "react-number-format";

function Preview({
  login,
  id,
  title,
  address,
  description,
  bathrooms,
  bedrooms,
  floor,
  price,
  type,
  facility,
  images,
  rating,
}) {
  const URL = "http://localhost:3000";
  // console.log(rating);
  let rate = 0;

  rating.forEach((rating) => {
    rate += rating.rating;
  });

  return (
    <div className="h-90 border-2 border-red-200 rounded-md flex p-3 mt-4">
      <div className="relative">
        <img
          className="rounded-md object-cover object-scale-down object-center h-400px-w-600px"
          src={`${URL}/images/villas/${images.filename}`}
          alt=""
        />
      </div>
      <div className="p-4 w-200px">
        <div>
          {" "}
          <Box component="fieldset" borderColor="transparent">
            <Rating name="read-only" value={Math.ceil(rate)} readOnly />
          </Box>
        </div>
        <div className="p-2 text-lg font-light">
          {" "}
          <h2>
            <LocationOnIcon />
            {address}
          </h2>
        </div>
        <div className="p-2 font-medium">
          {" "}
          <h2>{title}</h2>
        </div>
        <div className="p-2 font-extralight text-sm">
          {" "}
          <div className="flex justify-around">
            <div>
              {bedrooms} <HotelIcon />
            </div>
            <div>
              {bathrooms} <BathtubIcon />{" "}
            </div>
            <div>{floor} floor</div>
          </div>
        </div>
        <div className="p-2 font-extralight text-sm">facility: {facility}</div>
        <div className="py-8 px-2 font-extralight text-md font-medium flex flex-row justify-between">
          {" "}
          <div></div>
          <div>
            IDR :{" "}
            <NumberFormat
              value={price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Rp"}
            />{" "}
            / night
          </div>
        </div>
        <div>
          <Link
            className="l-2 bg-green-400 hover:bg-green-500 text-white font-bold py-1 px-5 rounded-full float-right"
            to={`/detail/${id}`}
          >
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Preview;
