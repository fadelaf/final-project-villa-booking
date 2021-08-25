import axios from "axios";
const URL = "http://localhost:3000";

const adminUpdate = async (access_token, newData) => {
  let update = await axios({
    method: "PUT",
    url: `${URL}/admin/updateProfile`,
    data: newData,
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

const getVilla = async (access_token) => {
  let villa = await axios({
    method: "GET",
    url: `${URL}/admin/myVilla`,
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

const deleteVilla = async (access_token, id) => {
  let villaDelete = await axios({
    method: "DELETE",
    url: `${URL}/admin/delete`,
    data: { id },
    headers: { access_token },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });

  return villaDelete;
};

const addVilla = async (access_token, data) => {
  let villa = await axios({
    method: "POST",
    url: `${URL}/admin/addVillas`,
    headers: {
      "Content-Type": "multipart/form-data",
      access_token,
    },
    data: data,
  })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });

  return villa;
};

const villaDetail = async (access_token, id) => {
  let detail = await axios({
    method: "GET",
    url: `${URL}/admin/detail/${id}`,
    headers: { access_token },
  })
    .then((res) => {
      return res.data.detailVilla;
    })
    .catch((err) => {
      return err;
    });
  return detail;
};

const updateVilla = async (access_token, id, data) => {
  let update = await axios({
    method: "PUT",
    url: `${URL}/admin/update/${id}`,
    headers: { access_token },
    data: data,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });

  return update;
};

export {
  adminUpdate,
  getVilla,
  deleteVilla,
  addVilla,
  villaDetail,
  updateVilla,
};
