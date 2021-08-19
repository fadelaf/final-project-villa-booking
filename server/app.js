const router = require("./router");
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.json("port muncul");
});

app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
