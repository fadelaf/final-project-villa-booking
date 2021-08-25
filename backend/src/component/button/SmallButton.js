import React from "react";

function SmallButton({ desc, id, handler }) {
  return (
    <button
      className=" rounded-md bg-green-700 w-16 h-8 text-center align-middle text-white ring-1"
      onClick={(e) => handler(e, id)}
    >
      {desc}
    </button>
  );
}

export default SmallButton;
