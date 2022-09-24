import React from "react";
import logo from "../../VillaIn.png";
function Footer() {
  return (
    <div className="flex flex-row mt-10 justify-evenly items-center py-10 bg-red-400 text-white">
      <div>copyright 2021</div>
      <div>
        {" "}
        <img src={logo} alt="" style={{ width: "100px" }} />
      </div>
      <div>FadelCompany</div>
    </div>
  );
}

export default Footer;
