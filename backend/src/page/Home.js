import React from "react";
import { LoginForm } from "../component";
import { NavbarBeforeLogin } from "../component";
function Home({ userLogin, getToken, getUser }) {
  return (
    <div>
      <NavbarBeforeLogin />
      <div className="w-full h-10 bg-gray-00">Bar</div>
      <div className=" flex justify-end w-full  bg-red-200">
        <div className="mr-56">
          <LoginForm
            userLogin={userLogin}
            getToken={getToken}
            getUser={getUser}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
