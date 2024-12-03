import React from "react";

const Toggle = ({showPassword, setshowPassword}) => {
  return (
    <>
      <label className="relative mt-2 inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" onChange={() => setshowPassword(prev => !prev)} className="sr-only peer" />
        <div className="group peer ring-0 bg-gradient-to-bl from-neutral-800 via-neutral-700 to-neutral-600 rounded-full outline-none duration-1000 after:duration-300 w-16 h-6 shadow-md peer-focus:outline-none after:content-[''] after:rounded-full after:absolute after:[background:#0D2B39] peer-checked:after:rotate-180 after:[background:conic-gradient(from_135deg,_#b2a9a9,_#b2a8a8,_#ffffff,_#d7dbd9_,_#ffffff,_#b2a8a8)] after:outline-none after:h-4 after:w-6 after:top-1 after:left-1 peer-checked:after:translate-x-8 peer-hover:after:scale-95 peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-emerald-900"></div>
        <p className="mx-2 font-semibold">{showPassword ? "Hide" : "Show" } Password</p>
      </label>
    </>
  );
};

export default Toggle;
