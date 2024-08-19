import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../store/users';
import { client } from '../boot/client.js';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const submit = ({ username, password }) => {
    const params = {
      username,
      password,
      socket: client.id,
    };
    dispatch(createUser(params));
    reset({ username: '', password: '' });
  };

  const error = (data) => {};

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    }
  }, [user]);

  return (
    <>
      <form onSubmit={handleSubmit(submit, error)} className="user-form">
        <label>
          <input
            aria-invalid={errors.username ? true : false}
            {...register('username', {
              required: 'write your username',
              minLength: { value: 2, message: 'min 2 characters' },
              maxLength: { value: 50, message: 'max 50 characters' },
            })}
            type="text"
            className="add-snap__input"
            placeholder="username"
          />
        </label>
        <label>
          <input
            aria-invalid={errors.password ? true : false}
            {...register('password', {
              required: 'write your password',
              minLength: { value: 2, message: 'min 2 characters' },
              maxLength: { value: 50, message: 'max 50 characters' },
            })}
            type="text"
            className="add-snap__input"
            placeholder="password"
          />
        </label>
        <label>
          <button
            className="add-snap__button"
            disabled={errors.password ? true : false}
          >
            Login
          </button>
        </label>
        <div>
          <div>
            <small className="text-red">
              {errors.username && errors.username.message}
            </small>
          </div>
          <div>
            <small className="text-red">
              {errors.password && errors.password.message}
            </small>
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;
