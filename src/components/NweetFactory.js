import { db, storageService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";

const NweetFactory = ({ userObj }) => {
  const [jweet, setJweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const uploadFile = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );
      attachmentUrl = await getDownloadURL(uploadFile.ref);
    }
    const newJweet = {
      text: jweet,
      createdAt: new Date(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await addDoc(collection(db, "jweets"), newJweet);
    setJweet("");
    setAttachment("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setJweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(theFile);
    reader.onloadend = (event) => {
      const {
        currentTarget: { result },
      } = event;
      setAttachment(result);
    };
  };
  const onClearAttachment = () => {
    setAttachment("");
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        onChange={onChange}
        type="text"
        value={jweet}
        placeholder="What's on your mind?"
        maxLength={120}
      ></input>
      <input type="file" accept="image/*" onChange={onFileChange}></input>
      <input type="submit" value="jweet"></input>
      {attachment && (
        <div>
          <img src={userObj.attachment} width="50px" height="50px" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default NweetFactory;
