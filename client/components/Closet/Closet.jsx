import React, { useEffect, useState } from 'react';
import { ClosetStyle } from './ClosetStyle';
import { useAuth } from '../../contexts/AuthContext';

const Closet = () => {
  const {
    user: { id },
  } = useAuth();

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data);
      });
  }, [id]);

  return (
    <ClosetStyle>
      <div className="greetingBanner">
        <h1>Welcome, {userInfo.firstName}</h1>
        <h1>Your Closet </h1>
        <button>Add Item</button>
      </div>
    </ClosetStyle>
  );
};

export default Closet;
