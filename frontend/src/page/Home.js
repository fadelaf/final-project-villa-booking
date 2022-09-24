import React from "react";
import { Navbar, Preview } from "../component";
import { useState, useEffect } from "react";
import { getVilla } from "../API";
import Handler from "../component/button/Handler";
import "react-rangeslider/lib/index.css";
import logo from "../VillaIn.png";
// import Pagination from "@material-ui/lab/Pagination";
import { Pagination } from "@material-ui/lab";
import Slider from "react-rangeslider";
import Typography from "@material-ui/core/Slider";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Switch from "@material-ui/core/Switch";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import HotelIcon from "@material-ui/icons/Hotel";
import BathtubIcon from "@material-ui/icons/Bathtub";
import NumberFormat from "react-number-format";

function Home({ login }) {
  // const [dropdownOpen, setOpen] = useState(false);
  // const toggle = () => setOpen(!dropdownOpen);
  const [villa, setVillaData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  const [value, setValue] = useState(10000000);

  const getVillaData = async (page) => {
    try {
      setIsLoading(true);
      let name = search === "" ? " " : search;
      if (!page) page = 1;
      let data = await getVilla(page, name, value);

      if (data.status === 200) {
        setIsLoading(false);
        setVillaData(data?.get);
        setTotalPage(data?.totalPage);
      }

      // console.log(data);
    } catch (err) {
      // console.log(err);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleChange = (e, value) => {
    e.preventDefault();
    let page = value;
    getVillaData(page);
  };

  // const typeChange = (event) => {
  //   setType({ ...type, [event.target.name]: event.target.checked });
  // };

  const handleChangeStart = () => {
    console.log("Change event started");
  };

  const handleChangeValue = (value) => {
    setValue(value);
  };

  const handleChangeComplete = () => {
    console.log("Change event completed");
  };

  // console.log(value);
  console.log(villa);
  useEffect(() => {
    setIsLoading(true);
    getVillaData();
  }, [search || value]);
  // useEffect(() => {
  //   getVillaData();
  // }, [type]);
  // useEffect(() => {
  //   getVillaData();
  // }, [value]);

  return (
    <>
      <div>
        {" "}
        <div className="h-1000px bg-cover-photo bg-cover">
          {" "}
          {/* <Navbar /> */}
          <div className="flex justify-center blur-xl text-white text-8xl py-20">
            <div className="w-50 bg-blend-lighten bg-gray-600 bg-opacity-30 shadow-lg p-2 rounded-lg">
              {" "}
              Find Your Place
            </div>
          </div>
          <div className="flex justify-center blur-xl text-4xl text-white">
            <div className="w-50 bg-blend-lighten bg-gray-600 bg-opacity-30 shadow-lg p-2 rounded-lg">
              Stay - Live - Flexible
            </div>
          </div>
        </div>
        <div></div>
        <div className="flex justify-center py-10">
          <div className="flex py-20">
            <div className="">
              <input
                type="text"
                className="form-control p-2 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-500"
                placeholder="Search product.."
                onChange={(e) => handleSearch(e)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    getVillaData();
                  }
                }}
                value={search}
                style={{ width: "100%" }}
              />
              <div className="py-10">
                <div>
                  <div className="py-10">
                    <FormLabel component="legend">
                      {" "}
                      <div className="py-1 font-semibold">Price</div>
                    </FormLabel>
                    {/* <input type="range" id="price" min="0" max="100000000" /> */}
                    <div className="slider">
                      <Slider
                        min={100000}
                        max={10000000}
                        value={value}
                        onChangeStart={handleChangeStart}
                        onChange={handleChangeValue}
                        onChangeComplete={handleChangeComplete}
                      />
                      <div className="value">{value}</div>
                    </div>
                    <div>
                      <img src={logo} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Button onClick={() => getVillaData()}>
                <SearchIcon />
              </Button>
            </div>
          </div>

          <div className="flex flex-col ">
            <div className="text-4xl">Show Villas: </div>

            <div className="h-10"></div>
            <div className="w-600px">
              {!isLoading ? (
                villa.length === 0 ? (
                  "Show no result"
                ) : (
                  villa.map((item) => {
                    console.log(item);
                    return (
                      <Preview
                        login={login}
                        id={item?.id}
                        title={item?.title}
                        address={item?.address}
                        description={item?.description}
                        bathrooms={item?.bathrooms}
                        bedrooms={item?.bedrooms}
                        floor={item?.floor}
                        price={item?.price}
                        type={item?.type}
                        images={item?.Villas_images[0]}
                        facility={item?.facility}
                        rating={item?.Villas_comments}
                      />
                    );
                  })
                )
              ) : (
                <div>Loading....</div>
              )}
            </div>
            <div className="h-10"></div>
            <div className="h-10">
              <Pagination
                count={totalPage}
                page={currentPage}
                onChange={handleChange}
                color="secondary"
                variant="outlined"
                shape="rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
