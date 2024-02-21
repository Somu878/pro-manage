// import { useState } from "react";

// const useInputChange = (initialState) => {
//   const [data, setData] = useState(initialState);
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setData((prevData) => ({ ...prevData, [name]: value }));
//   };
//   return { data, handleInputChange };
// };
// export default useInputChange;
import React, { useState } from "react";

function UseInputChange(initialState) {
  const [data, setData] = useState(initialState);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  return {
    data,
    handleInputChange,
  };
}
export default UseInputChange;
