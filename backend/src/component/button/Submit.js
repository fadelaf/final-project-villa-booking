import React from "react";
import "../../index.css";

function Submit({ handler }) {
  return (
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-7 rounded-full"
      onClick={(e) => handler(e)}
    >
      Submit
    </button>
  );
}

export default Submit;
