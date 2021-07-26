import React, { useEffect, useState } from 'react';
import { Popover } from '@material-ui/core';

import { useForm } from 'react-hook-form';
import { ClosetStyle, PopOverStyle } from './ClosetStyle';
import { useAuth } from '../../contexts/AuthContext';

const Closet = () => {
  const {
    user: { id },
  } = useAuth();

  const [userInfo, setUserInfo] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const { register, handleSubmit, error } = useForm();

  const open = Boolean(anchorEl);

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((data) => data.json())
      .then((data) => setUserInfo(data));
  }, [id]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSave = (data) => {
    handleClose();
    console.log('Form Data: ', data);
    /**There will be logic here to make a fetch to the backend with our form data
     * as well as populate our closet with a new closetItem component */
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const itemForm = (
    <PopOverStyle>
      <div className="itemForm">
        <p>Current Item</p>
        <div className="formBox">
          <form onSubmit={handleSubmit(handleSave)}>
            <label className="formLabel">
              Name:
              <input className="formLabel" type="text" name="name" {...register('name', { required: true })} />
            </label>

            <label>
              Type:
              <input className="formLabel" type="text" name="type" {...register('type', { required: true })} />
            </label>
            <br />
            <label>
              Photo:
              <input
                className="formLabel"
                type="file"
                name="photo"
                accept="image/*"
                {...register('photo', { required: true })}
              />
            </label>
            <br />
            <input className="formLabel" id="submit" type="submit" value="save" />
          </form>
        </div>
      </div>
    </PopOverStyle>
  );

  return (
    <ClosetStyle>
      <div className="greetingBanner">
        {userInfo.closet ? <h1>Welcome, {userInfo.firstName}</h1> : <h1>Welcome back, {userInfo.firstName}</h1>}
        <h1>Your Closet </h1>
        <button type="button" onClick={handleClick}>
          Add Item
        </button>
        <Popover
          open={open}
          onClose={handleClose}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          {itemForm}
        </Popover>
      </div>
    </ClosetStyle>
  );
};

export default Closet;
