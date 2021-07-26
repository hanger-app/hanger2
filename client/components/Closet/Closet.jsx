import React, { useEffect, useState } from 'react';
import { ClosetStyle } from './ClosetStyle';
import { useAuth } from '../../contexts/AuthContext';

const Closet = () => {
  const {
    user: { id },
  } = useAuth();
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((data) => data.json())
      .then((data) => setUserInfo(data));
  }, [id]);
  console.log('userInfo: ', userInfo);
  return (
    <ClosetStyle>
      <div className="greetingBanner">
        {userInfo.closet ? <h1>Welcome, {userInfo.firstName}</h1> : <h1>Welcome back, {userInfo.firstName}</h1>}
        <h1>Your Closet </h1>
        <button>Add Item</button>
      </div>
    </ClosetStyle>
  );
};

export default Closet;
