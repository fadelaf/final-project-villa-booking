import React from "react";

function Handler({ handler, desc }) {
  return (
    <button
      className="ml-2 bg-green-400 hover:bg-green-500 text-white font-bold py-1 px-5 rounded-full"
      onClick={(e) => handler(e)}
    >
      {desc}
    </button>
  );
}

export default Handler;
