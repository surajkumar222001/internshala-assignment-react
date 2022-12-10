import React, { useState } from "react";

const TableRow = ({ data }) => {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => setIsClicked((prevState) => !prevState);
  const {
    show,
    status,
    area,
    id,
    first_name,
    last_name,
    email,
    gender,
    mobile,
    ip_address,
    time,
  } = data;
  return (
    <tr
      onClick={handleClick}
      className={` ${status !== "TRUE" ? "bg-danger" : "bg-success"} ${
        !isClicked ? "text-white" : "bg-light text-dark"
      }`}
      key={id}
    >
      <td>{first_name}</td>
      <td>{last_name}</td>
      <td>{gender}</td>
      <td>{email}</td>
      <td>{area}</td>
      <td>{mobile}</td>
      <td>{ip_address}</td>
      <td>{time}</td>
    </tr>
  );
};

export default TableRow;
