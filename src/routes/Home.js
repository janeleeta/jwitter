import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "fbase";
import Jweet from "components/Jweet";

const Home = ({ userObj }) => {
  const [jweet, setJweet] = useState("");
  const [jweets, setJweets] = useState([]);
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
    await addDoc(collection(db, "jweets"), {
      text: jweet,
      createdAt: new Date(),
      creatorId: userObj.uid,
    });
    setJweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setJweet(value);
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
        <input type="submit" value="jweet"></input>
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
