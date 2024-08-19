import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../store/users';

const Users = () => {
  const { users, loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  if (loading) {
    return 'loading...';
  }

  console.log(users);

  return (
    <>
      <h4>Users page</h4>
      <button onClick={() => dispatch(getUsers())}>fetch users</button>
      {users && users.map((user) => <div key={user.id}>{user.username}</div>)}
    </>
  );
};

export default Users;
