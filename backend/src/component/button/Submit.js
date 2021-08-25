import React from "react";
import "../../index.css";

function Submit({ handler }) {
  return (
    <button
      class="bg-green-400 hover:bg-green-500 text-white font-bold py-1 px-5 rounded-full"
      onClick={(e) => handler(e)}
    >
      Submit
    </button>
  );
}

export default Submit;
