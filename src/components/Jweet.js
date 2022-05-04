import React from "react";

const Jweet = ({ jweetObj, isOwner }) => (
  <div>
    <h4>{jweetObj.text}</h4>
    {isOwner && (
      <>
        <button>Delete</button>
        <button>Edit</button>
      </>
    )}
  </div>
);

export default Jweet;
