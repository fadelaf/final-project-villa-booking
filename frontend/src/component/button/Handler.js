import React from "react";

function Handler({
  handler,
  desc,
  color = "bg-green-400",
  hover = "bg-green-500 ",
  id,
}) {
  return (
    <button
      id={id}
      className={`ml-2 ${color} hover:${hover} text-white font-bold py-1 px-5 rounded-full`}
      onClick={(e) => handler(e, e.target.id)}
    >
      {desc}
    </button>
  );
}

export default Handler;
