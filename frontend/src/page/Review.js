import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { showBookingList } from "../API";
import { useParams } from "react-router";
import { getVillaReview } from "../API";
import Handler from "../component/button/Handler";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { postRatingComment } from "../API";
import Swal from "sweetalert2";
import { useHistory } from "react-router";
function Review() {
  const [orderList, setList] = useState([]);
  const [villa, setVilla] = useState([]);
  const [rating, setRating] = useState(0);
  const [comments, setComment] = useState("");
  const [image_disp, setImageDisp] = useState("");
  const access_token = localStorage.access_token;
  const params = useParams();
  const id = +params.orderId;
  const URL = "http://localhost:3000";

  let history = useHistory();

  console.log(comments);

  const getVillaForReview = async () => {
    let data = await getVillaReview(access_token, id);
    if (data.status === 200) {
      setList(data.order);
      setVilla(data.villa);
      setImageDisp(data.villa?.Villas_images[0]?.filename);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (comments === "") {
      Swal.fire({
        icon: "error",
        title: "Incomplete",
        text: "Please complete the form",
      });
    } else {
      giveRate();
      history.push("/");
    }
  };

  let villaid = villa?.id;
  // let image_disp = villa?.Villas_images[0]?.filename;

  const giveRate = async () => {
    let post = await postRatingComment(access_token, villaid, rating, comments);
    if (post.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Thank You for Comment",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Incomplete",
        text: "Please complete the form",
      });
    }
  };

  useEffect(() => {
    getVillaForReview();
  }, []);

  console.log(villa);

  return (
    <>
      {villa.length === "" ? (
        ""
      ) : (
        <>
          {" "}
          <div className="flex justify-center py-5 bg-gray-100">
            <div className="p-2 border-2 border-green-200 bg-white rounded-md h-max-content w-max-content flex flex-row shadow-md">
              <div className="p-4">
                <div>Villa Booking</div>
                <div className="flex flex-row">
                  <div>
                    {" "}
                    <div className="h-90 border-2 border-red-200 rounded-md flex p-3 mt-4">
                      {image_disp === "" ? (
                        ""
                      ) : (
                        <div className="relative">
                          <img
                            className="rounded-md object-cover h-400px-w-600px"
                            src={`${URL}/images/villas/${image_disp}`}
                            alt=""
                          />
                        </div>
                      )}
                      {/* <div className="relative">
                        <img
                          className="rounded-md object-cover h-400px-w-600px"
                          src={`${URL}/images/villas/${villa?.Villas_images[0]?.filename}`}
                          alt=""
                        />
                      </div> */}
                      <div className="p-4 w-200px">
                        <div className="p-2 text-lg font-light">
                          {" "}
                          <h2>{villa?.address}</h2>
                        </div>
                        <div className="p-2 font-medium">
                          {" "}
                          <h2>{villa?.title}</h2>
                        </div>
                        <div className="p-2 font-extralight text-sm">
                          {" "}
                          <div className="flex justify-around">
                            <div>{villa?.bedrooms} bedrooms</div>
                            <div>{villa?.bathrooms} bathrooms</div>
                            <div>{villa?.floor} floor</div>
                          </div>
                        </div>
                        <div className="p-2 font-extralight text-sm">
                          {" "}
                          {villa?.facility}
                        </div>
                        <div className="py-8 px-2 font-extralight text-md font-medium flex flex-row justify-between">
                          {" "}
                          <div></div>
                          <div>IDR {villa?.price} / night</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center py-5 bg-gray-100">
            <div className="bg-white rounded shadow-md p-2">
              <div className="p-2">
                <Box component="fieldset" borderColor="transparent">
                  <Typography component="legend">Give Rating</Typography>
                  <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(event, newValue) => {
                      setRating(newValue);
                    }}
                  />
                </Box>
              </div>
              <div>
                <textarea
                  className="w-96 rounded-md border-gray-300 border-2"
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                ></textarea>
              </div>
              <div className="p-2">
                <Handler desc={"Submit Review"} handler={submitHandler} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Review;
