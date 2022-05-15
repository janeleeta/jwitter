import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "@firebase/firestore";
import { updateProfile } from "@firebase/auth";
import { authService, db } from "fbase";

const Profile = ({ userObj, refreshUser }) => {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogoutClick = async () => {
    const auth = getAuth();
    await signOut(auth);
    navigate("/");
  };
  const getMyjweets = async () => {
    const q = query(
      collection(db, "jweets"),
      orderBy("createdAt", "desc"),
      where("creatorId", "==", userObj.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };
  useEffect(() => {
    getMyjweets();
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={newDisplayName}
          type="text"
          placeholder="Display name"
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogoutClick}>Logout</button>
    </>
  );
};
export default Profile;
