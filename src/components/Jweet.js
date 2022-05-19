import React, { useState } from "react";
import { deleteDoc, updateDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
    const urlRef = ref(storageService, jweetObj.attachmentUrl);
    if (confirm) {
      await deleteDoc(JweetRef);
      await deleteObject(urlRef);
    }
  };
  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };
  return (
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              value={newJweet}
              placeholder="Edit this jweet"
              type="text"
              onChange={onChange}
              autoFocus
              className="formInput"
              required
            ></input>
            <input type="submit" value="Edit Confirm" className="formBtn" />
            <span onClick={toggleEditing} className="formBtn cancelBtn">
              Cancel
            </span>
          </form>
        </>
      ) : (
        <>
          {jweetObj.attachmentUrl && <img src={jweetObj.attachmentUrl} />}
          <h4>{jweetObj.text}</h4>
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Jweet;
