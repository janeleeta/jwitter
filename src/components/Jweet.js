import React, { useState } from "react";
import { deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../fbase";

const Jweet = ({ jweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newJweet, setNewJweet] = useState(jweetObj.text);
  const JweetRef = doc(db, "jweets", `${jweetObj.id}`);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewJweet(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(JweetRef, {
      text: newJweet,
    });
    setEditing(false);
  };
  const onDeleteClick = async () => {
    const confirm = window.confirm("정말 삭제하시겠습니까?");
    if (confirm) {
      await deleteDoc(JweetRef);
    }
  };
  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              value={newJweet}
              placeholder="Edit this jweet"
              type="text"
              onChange={onChange}
              required
            ></input>
            <input type="submit" value="Edit Confirm" />
            <button onClick={toggleEditing}>Cancel</button>)
          </form>
        </>
      ) : (
        <>
          <h4>{jweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Jweet;
