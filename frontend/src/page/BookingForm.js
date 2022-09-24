import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { bookSummary } from "../API";
import Handler from "../component/button/Handler";
import { addOrder } from "../API";
import { useHistory } from "react-router";
import NumberFormat from "react-number-format";

function BookingForm() {
  const access_token = localStorage.access_token;
  const [dateStart, setStart] = useState("");
  const [dateEnd, setEnd] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const params = useParams();
  const cartId = +params.cartId;

  const history = useHistory();

  const [summaryData, setSummaryData] = useState({
    price: "",
    address: "",
    facility: "",
    bedrooms: "",
    bathrooms: "",
    floor: "",
    title: "",
  });

  const getData = async () => {
    let data = await bookSummary(access_token, cartId);
    setSummaryData(data);
  };

  const toDateFormat = new Date();
  let year = toDateFormat.getFullYear();
  let month = toDateFormat.getMonth() + 1;
  let date = toDateFormat.getDate();
  if (month < 10) month = "0" + month.toString();
  if (date < 10) date = "0" + date.toString();
  let minDate = year + "-" + month + "-" + date;
  let min = new Date(minDate);
  minDate = min.setDate(min.getDate() + 1);
  minDate = new Date(minDate);
  month = minDate.getMonth() + 1;
  date = minDate.getDate();
  if (month < 10) month = "0" + month.toString();
  if (date < 10) date = "0" + date.toString();
  minDate = minDate.getFullYear() + "-" + month + "-" + date;

  // console.log(minDate);

  let date1 = new Date(dateStart);
  // console.log(dateStart);
  let date2 = new Date(dateEnd);
  let diff_inTime = date2.getTime() - date1.getTime();
  let diff_inDays = diff_inTime / (1000 * 3600 * 24);
  let discount = 0;
  let tax = 1.05;
  if (diff_inDays > 2) {
    discount = 0.05;
  }
  let price = summaryData?.price;
  let total_due = summaryData?.price * diff_inDays;
  let discountAmount = total_due * discount;
  total_due = (total_due - discountAmount) * tax;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      dateStart === "" ||
      dateEnd === "" ||
      address === "" ||
      city === "" ||
      notes === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please Complete Your Form",
      });
    } else {
      try {
        let days = diff_inDays;

        if (days === 0) {
          Swal.fire({
            icon: "error",
            title: "CheckOut Invalid",
            text: "Cannot checkout On the Same Days",
          });
        } else {
          let data = {
            days: days,
            start: dateStart,
            end: dateEnd,
            address: address,
            city: city,
            notes: notes,
            price: price,
            cartId: cartId,
          };

          let feedback = await addOrder(access_token, data);
          if (feedback.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Booking Success",
            });
            history.push("/booking-list");

            console.log(feedback);
          }
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error",
        });
      }
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="h-10"></div>
      <div className="flex justify-center py-5 bg-gray-100">
        <div className="p-2 border-2 border-red-200 bg-white rounded-md h-max-content w-1000px flex flex-row shadow-md ">
          <div className="p-2 w-max-content ">
            <div className="p-2">
              <label for="checkin">Check In</label>
              <div className="p-2">
                <input
                  className="rounded-md border-2 p-2          focus:outline-none focus:border-green-500"
                  type="date"
                  id="checkin"
                  min={minDate}
                  onChange={(e) => setStart(e.target.value)}
                />
              </div>
            </div>
            <div className="p-2">
              <label for="checkout">Check Out</label>
              <div className="p-2">
                {" "}
                <input
                  className="rounded-md border-2 p-2  focus:outline-none focus:border-green-500"
                  type="date"
                  id="checkout"
                  min={dateStart}
                  onChange={(e) => setEnd(e.target.value)}
                />
              </div>
            </div>
            <div className="p-2">
              <label for="Address">Address</label>
              <div className="p-2">
                {" "}
                <input
                  className="rounded-md border-2 p-2  focus:outline-none focus:border-green-500 w-40rem"
                  type="text"
                  id="Address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="p-2">
              <label for="City">City</label>
              <div className="p-2">
                {" "}
                <input
                  className="rounded-md border-2 p-2  focus:outline-none focus:border-green-500 w-40rem"
                  type="text"
                  id="City"
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
            <div className="p-2">
              <label for="description">Notes</label>
              <div className="p-2">
                {" "}
                <input
                  className="rounded-md border-2 p-2 focus:outline-none focus:border-green-500 w-40rem"
                  type="text"
                  id="description"
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
            <div className="p-2"></div>
          </div>
          <div className="p-2">
            <div className="p-2 rounded-md border-2 border-red-400">
              <div className="p-2">
                <h1>Order Summary</h1>
              </div>
              <div className="p-2">
                <div>{summaryData.title}</div>
                <div>{summaryData.address}</div>
                <div className="flex flex-row justify-around">
                  <div>{summaryData.bedrooms} bedrooms</div>
                  <div className="px-1">{summaryData.bathrooms} bathrooms </div>
                  <div className="px-1">{summaryData.floor} floor</div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="pt-10">price</div>
                  <div className="pt-10">
                    <NumberFormat
                      value={summaryData?.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Rp"}
                    />
                    ;
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="py-1">night</div>
                  <div className="py-1">{diff_inDays ? diff_inDays : "-"}</div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="py-2">subtotal</div>
                  <div className="py-2">
                    <NumberFormat
                      value={
                        diff_inDays ? summaryData?.price * diff_inDays : "-"
                      }
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Rp"}
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="py-2">discount</div>
                  <div className="py-2">{diff_inDays > 2 ? "5%" : "-"}</div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="py-1">tax</div>
                  <div className="py-1">5%</div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="py-2">Total Due</div>
                  <div className="py-2">
                    <NumberFormat
                      value={total_due > 0 ? total_due : 0}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Rp"}
                    />
                  </div>
                </div>
                <div className="flex justify-center pt-4">
                  <Handler desc={"submit"} handler={submitHandler} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;
