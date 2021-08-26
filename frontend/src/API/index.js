import axios from "axios";
const URL = "http://localhost:3000";

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

export { register, login };
