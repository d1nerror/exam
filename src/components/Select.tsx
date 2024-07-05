import React from 'react';

function Select(){

    return (
        <div className="flex items-center justify-center min-h-screen bg-cyan-600">
  <div className="p-8 bg-cyan-200 rounded shadow-lg max-w-md">
    <h3 className="block text-cyan-800 font-bold mb-2">Select category</h3>
    <div className="relative">
      <select
        className="block appearance-none w-64 bg-white text-gray-600 py-3 px-3 rounded focus:outline-none"
        value={""}
      >
        <option value="">ACAB_01</option>
        <option value="">ACAB_02</option>
        <option value="">ACAB_03</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-gray-600 h-6 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 12l-6-6h12z" />
        </svg>
      </div>
    </div>
    {/* <p className="mt-2 text-sm text-gray-600">current category</p> */}
  </div>
</div>
    )
}

export default Select;