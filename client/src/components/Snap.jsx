import React, { useEffect } from 'react';
import TimeAgo from 'react-timeago';
import { useSelector, useDispatch } from 'react-redux';
import { getSnaps, addSnap } from '../store/snaps';
import { addUser, getUsersCount } from '../store/users';

import cote from '../assets/cote.mp3';
import { client } from '../boot/client.js';

const Snap = () => {
  const dispatch = useDispatch();
  const { snaps, loading } = useSelector((state) => state.snaps);
  const { users, loadingUser } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getSnaps());
    dispatch(getUsersCount());
  }, []);

  const playMeowSound = () => {
    const newMessageAudio = new Audio(cote);
    if (newMessageAudio.paused) {
      newMessageAudio.play().catch(console.warn);
    }
  };

  useEffect(() => {
    client.on('server:snap:create', (data) => {
      if (data.socket !== client.id) {
        dispatch(addSnap(data));
      }
      playMeowSound();
    });

    client.on('server:user:create', (data) => {
      if (data.socket !== client.id) {
        dispatch(addUser(data.count));
      }
      playMeowSound();
    });

    return () => {
      client.off('server:snap:create');
      client.off('server:create:create');
    };
  }, []);

  return (
    <>
      <div>
        <ul className="snaps">
          {loading && <div className="loading">Loading...</div>}
          {snaps &&
            snaps.map((snap, index) => {
              return (
                <li key={index}>
                  <div className="title">
                    <span className="username">@{snap.username} </span>
                    <span className="snaptext">{snap.snap}</span>
                  </div>
                  <div className="date">
                    <TimeAgo date={snap.createdAt} />
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
      <div className="counter">{snaps && snaps.length} snap(s)</div>
      <div className="counter">{users && users} user(s)</div>
    </>
  );
};

export default Snap;
