import axios from "axios";
const URL = "http://localhost:3000";

//klo pake env
// const url = process.env.REACT_APP_URL

const register = async (form) => {
  const regdata = await axios({
    method: "POST",
    url: `${URL}/api/register`,
    data: form,
  })
    .then((account) => {
      return account.data;
    })
    .catch((err) => {
      return err.msg;
    });

  return regdata;
};

const login = async (form) => {
  const logindata = await axios({
    method: "POST",
    url: `${URL}/api/login`,
    data: form,
  })
    .then((account) => {
      //   console.log(account);
      return account.data;
    })
    .catch((err) => {
      return err;
    });

  return logindata;
};

const userUpdate = async (access_token, form) => {
  let update = await axios({
    method: "PUT",
    url: `${URL}/api/update`,
    data: form,
    headers: { access_token },
  })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });

  return update;
};

const getVilla = async (page, name, value) => {
  let allVilla = await axios({
    method: "GET",
    url: `${URL}/api/villa/${name}/${page}/${value}`,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });

  return allVilla;
};

const getVillaDetail = async (id) => {
  let detailVilla = await axios({
    method: "GET",
    url: `${URL}/api/detail/${id}`,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });

  return detailVilla;
};

const addCart = async (access_token, villaid) => {
  let add = await axios({
    method: "POST",
    url: `${URL}/api/add-cart`,
    data: { villaid },
    headers: {
      access_token,
    },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });

  return add;
};

const showCart = async (access_token) => {
  let show = await axios({
    method: "GET",
    url: `${URL}/api/show-cart`,
    headers: { access_token },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });

  return show;
};

const bookSummary = async (access_token, cartId) => {
  let summary = await axios({
    method: "GET",
    url: `${URL}/api/order/${cartId}`,
    headers: { access_token },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });

  return summary;
};

const addOrder = async (access_token, data) => {
  let order = await axios({
    method: "POST",
    url: `${URL}/api/add-order`,
    headers: { access_token },
    data: data,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });

  return order;
};

const showBookingList = async (access_token) => {
  let list = await axios({
    method: "GET",
    url: `${URL}/api/show-list`,
    headers: { access_token },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });

  return list;
};

const deleteCart = async (access_token, cartId) => {
  let delCart = await axios({
    method: "DELETE",
    url: `${URL}/api/delete-cart/${cartId}`,
    headers: { access_token },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });

  return delCart;
};

const cancelOrder = async (access_token, id) => {
  let cancel = await axios({
    method: "PUT",
    url: `${URL}/api/cancel-order/${id}`,
    headers: { access_token },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });

  return cancel;
};

const pay = async (access_token, payt_trx_number) => {
  let payment = await axios({
    method: "POST",
    url: `${URL}/api/payment`,
    data: { payt_trx_number },
    headers: { access_token },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });

  return payment;
};

const getVillaReview = async (access_token, id) => {
  let villa = await axios({
    method: "GET",
    url: `${URL}/api/show-order-review/${id}`,
    headers: { access_token },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });

  return villa;
};

const postRatingComment = async (access_token, id, rating, comments) => {
  let post = await axios({
    method: "POST",
    url: `${URL}/api/addComment/${id}`,
    headers: { access_token },
    data: { rating, comments },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });

  return post;
};
export {
  register,
  login,
  userUpdate,
  getVilla,
  getVillaDetail,
  addCart,
  showCart,
  bookSummary,
  addOrder,
  showBookingList,
  deleteCart,
  cancelOrder,
  pay,
  getVillaReview,
  postRatingComment,
};
