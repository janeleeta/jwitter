import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { db, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import Jweet from "components/Jweet";

const Home = ({ userObj }) => {
  const [jweet, setJweet] = useState("");
  const [jweets, setJweets] = useState([]);
  const [attachment, setAttachment] = useState("");
  useEffect(() => {
    const q = query(collection(db, "jweets"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const jweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJweets(jweetArr);
    });
  }, []);
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
    <div>
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
      <div>
        {jweets.map((jweet) => (
          <Jweet
            key={jweet.id}
            jweetObj={jweet}
            isOwner={jweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
