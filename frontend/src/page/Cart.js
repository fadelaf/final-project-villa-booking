import React, { useState } from "react";
import Handler from "../component/button/Handler";
import { showCart } from "../API";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteCart } from "../API";
import Swal from "sweetalert2";
function Cart() {
  const access_token = localStorage.access_token;
  const [cartData, setCart] = useState([]);
  const [villaData, setVilla] = useState([]);

  // const [cartId, setCartId] = useState("");
  // const [line, setLine] = useState([]);
  const [image, setImage] = useState([]);
  const URL = "http://localhost:3000";

  const deleteHandler = async (e, id) => {
    e.preventDefault();
    let cartDelete = await deleteCart(access_token, id);
    if (cartDelete.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Cart deleted",
      });
      myCart();
    }

    // console.log(id);
  };

  const myCart = async () => {
    let data = await showCart(access_token);
    // console.log(data);
    setCart(data.cart);
    setVilla(data.villa);
  };
  console.log(villaData);

  useEffect(() => {
    myCart();
  }, []);

  return (
    <>
      <div className="h-10"></div>
      <div className="flex justify-center min-h-screen">
        <div className="border-2 border-red-200 rounded-md h-max-content p-40">
          <table>
            <thead>
              <th className="p-4">No.</th>
              <th className="px-4">Villa Image</th>
              <th className="px-4">Villa Name</th>
              <th className="px-4">Villa Address</th>
              <th className="px-4">Villa Type</th>
              <th className="px-4">Edit Booking</th>
            </thead>
            <tbody>
              {cartData.map((item, i) => {
                return (
                  <tr className="text-base text-center border-2 rounded-lg ">
                    <td className="px-4 py-2 ">{i + 1}</td>

                    {villaData.length === 0 ? (
                      <>{/* <div className="min-h-full">asdas</div> */}</>
                    ) : (
                      <>
                        {" "}
                        <td className="px-4">
                          <img
                            src={`${URL}/images/villas/${villaData[i]?.Villas_images[0].filename}`}
                            alt=""
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                            }}
                          />
                        </td>
                        <td className="px-4">{villaData[i]?.title}</td>
                        <td className="px-4">{villaData[i]?.address}</td>
                        <td className="px-4">{villaData[i]?.type}</td>
                        <td className="px-4">
                          {item.status === "open" ? (
                            <>
                              <Link
                                to={`/booking-form/${item?.id}`}
                                className="ml-2 bg-green-400 hover:bg-green-500 text-white font-bold py-1 px-5 rounded-full"
                              >
                                Continue Booking
                              </Link>
                              <Handler
                                id={item?.id}
                                desc={"delete"}
                                color={"bg-red-400"}
                                hover={"bg-red-500"}
                                handler={deleteHandler}
                              />{" "}
                            </>
                          ) : (
                            "Closed"
                          )}
                        </td>{" "}
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="h-5"></div>
        </div>
      </div>
    </>
  );
}

export default Cart;
