import axios from "axios";
const URL = process.env.URL;

const register = async () => {
  await axios({
    method: "POST",
    url: `${URL}/api/register`,
  })
    .then((account) => {
      return account;
    })
    .catch((err) => {
      console.log(err);
    });
};

const login = async () => {
  await axios({
    method: "POST",
    url: `${URL}/api/login`,
  })
    .then((account) => {
      return account;
    })
    .catch((err) => {
      console.log(err);
    });
};
