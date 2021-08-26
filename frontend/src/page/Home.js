import React from "react";
import { Navbar } from "../component";
function Home() {
  return (
    <div>
      {" "}
      <div className="h-1000px bg-cover-photo bg-cover">
        {" "}
        {/* <Navbar /> */}
        <div className="flex justify-center blur-xl ">
          <div className="flex w-max-content h-30 bg-white rounded-full shadow-xl py-2 mt-10 p-2">
            <div className="p-1">
              <div className=" rounded-full h-100px w-40 border-gray-300 border-2 text-center">
                1
              </div>
            </div>
            <div className="p-1">
              <div className=" rounded-full h-100px w-40 border-gray-300 border-2 text-center">
                2
              </div>
            </div>

            <div className="p-1">
              <div className=" rounded-full h-100px w-40 border-gray-300 border-2 text-center">
                3
              </div>
            </div>

            <div className="p-1">
              <div className=" rounded-full h-100px w-40 border-gray-300 border-2 text-center">
                4
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
