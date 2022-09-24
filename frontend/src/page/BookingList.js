import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { showBookingList } from "../API";
import { Link } from "react-router-dom";
import Handler from "../component/button/Handler";
import { cancelOrder } from "../API";
import Swal from "sweetalert2";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import HotelIcon from "@material-ui/icons/Hotel";
import BathtubIcon from "@material-ui/icons/Bathtub";
import { CircularProgress } from "@mui/material";
// or
import NumberFormat from "react-number-format";

function BookingList() {
  const [orderList, setList] = useState([]);
  const [villa, setVilla] = useState([]);
  const access_token = localStorage.access_token;
  const URL = "http://localhost:3000";

  const cancelHandler = async (e, id) => {
    e.preventDefault();

    let orderCancel = await cancelOrder(access_token, id);
    if (orderCancel.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Cart deleted",
      });
      //   console.log(orderCancel);
      getList();
    }
  };

  const getList = async () => {
    let data = await showBookingList(access_token);
    if (data.status === 200) {
      setList(data.order);
      setVilla(data.villa);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  console.log(villa);

  return (
    <div className="min-h-screen">
      <div className="h-10"></div>

      {orderList.length === "" ? (
        <CircularProgress />
      ) : (
        orderList.map((item, i) => {
          return (
            <div className="flex justify-center py-5 bg-gray-100">
              <div className="p-2 border-2 border-green-200 bg-white rounded-md h-max-content w-max-content flex flex-row shadow-md">
                <div className="p-4">
                  <div className="font-bold border-b-2">Villa Booking</div>
                  <div className="flex flex-row">
                    <div>
                      {" "}
                      <div className="h-90 border-2 border-red-200 rounded-md flex p-3 mt-4">
                        <div className="relative">
                          <img
                            className="rounded-md object-cover object-scale-down object-center h-400px-w-600px"
                            src={`${URL}/images/villas/${villa[i]?.Villas_images[0].filename}`}
                            alt=""
                          />
                        </div>
                        <div className="p-4 w-200px">
                          <div className="p-2 text-md font-light border-b-2">
                            {" "}
                            <h2>
                              <LocationOnIcon /> {villa[i]?.address}
                            </h2>
                          </div>
                          <div className="p-2 text-lg font-medium border-b-2">
                            {" "}
                            <h2>{villa[i]?.title}</h2>
                          </div>
                          <div className="p-2 font-extralight text-sm">
                            {" "}
                            <div className="flex justify-around border-b-2">
                              <div>
                                {villa[i]?.bedrooms} <HotelIcon />
                              </div>
                              <div>
                                {villa[i]?.bathrooms} <BathtubIcon />
                              </div>
                              <div>{villa[i]?.floor} floor</div>
                            </div>
                          </div>
                          <div className="p-2 font-light text-sm border-b-2">
                            {" "}
                            facility : {villa[i]?.facility}
                          </div>
                          <div className="py-8 px-2 font-extralight text-md font-medium flex flex-row justify-between">
                            {" "}
                            <div></div>
                            <div className="border-b-2 p-2">
                              <NumberFormat
                                value={villa[i]?.price}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"Rp"}
                              />{" "}
                              / night
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="font-bold border-b-2">Booked Summary</div>
                  <div className="p-2 mt-4 rounded-md border-2 border-red-200 shadow-md">
                    <div className="p-2">
                      <div className="p-2">
                        <span className="font-bold border-b-2 p-1 ">
                          {" "}
                          payment number:{" "}
                        </span>{" "}
                        <span></span>
                        {item?.payt_trx_number}{" "}
                      </div>
                      <div className="p-2">
                        <div className="border-b-2 p-1">
                          {" "}
                          <span className="font-bold  p-1">
                            {" "}
                            checkin:{" "}
                          </span>{" "}
                          {item?.start.split("T")[0]}
                        </div>
                        <div className="border-b-2 p-1">
                          {" "}
                          <span className="font-bold "> checkout: </span>{" "}
                          {item?.end.split("T")[0]}
                        </div>
                      </div>
                      <div className="p-2 px-4 border-b-2">
                        <span className="font-bold">duration: </span>{" "}
                        {item?.total_days} days
                      </div>
                      <div className="p-2 px-4 border-b-2">
                        <span className="font-bold ">tax:</span>{" "}
                        {item?.tax * 100}%
                      </div>{" "}
                      <div className="px-4 border-b-2">
                        <span className="font-bold ">discount :</span>{" "}
                        {item?.discount * 100}%
                      </div>
                      <div className="p-2 font-medium">
                        total due:{" "}
                        <NumberFormat
                          value={item?.total_due}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"Rp"}
                        />{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="font-bold border-b-2">Billing Address</div>
                  <div className="p-2 mt-4 rounded-md border-2 border-red-200 shadow-md">
                    <div className="p-2">
                      <div className="p-2 border-b-2">
                        Address: {item?.address}
                      </div>
                      <div className="p-2 border-b-2">City: {item?.city}</div>
                      <div className="p-2 border-b-2">
                        Notes: {item?.description}
                      </div>
                      <div className="flex flex-row justify-center p-2">
                        {item?.status === "paid" ? (
                          <>
                            {" "}
                            <div>
                              <div className="bg-gray-600 text-white font-bold py-1 px-5 rounded-full">
                                Booking Paid
                              </div>{" "}
                              <div className="p-2 mt-2">
                                <Link
                                  className="bg-green-400 hover:bg-green-600 text-white font-bold py-1 px-5 rounded-full"
                                  to={`/review/${item?.id}`}
                                >
                                  Give Review
                                </Link>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            {" "}
                            <div>
                              <Link
                                className="bg-green-400 hover:bg-green-600 text-white font-bold py-1 px-5 rounded-full"
                                to="/payment"
                              >
                                Pay Book
                              </Link>
                              <Handler
                                id={item?.id}
                                desc={"Cancel"}
                                color={"bg-red-400"}
                                hover={"bg-red-600"}
                                handler={cancelHandler}
                              />
                            </div>{" "}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default BookingList;
