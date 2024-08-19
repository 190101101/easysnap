import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createSnaps } from '../store/snaps';
import { client } from '../boot/client.js';

const Form = () => {
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      snap: '',
    },
  });

  const submit = ({ snap }) => {
    dispatch(
      createSnaps({
        snap: snap,
        username: user.username,
        socket: client.id,
      })
    );

    reset({ snap: '' });
  };

  const error = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submit, error)} className="">
        <input
          aria-invalid={errors.snap ? true : false}
          {...register('snap', {
            required: 'invalid field, write anything',
            minLength: { value: 2, message: 'min 2 characters' },
            maxLength: { value: 50, message: 'max 50 characters' },
          })}
          type="text"
          className="add-snap__input"
          placeholder="add Snap"
          disabled={!user && true}
        />
        <small className="text-red">{errors.snap && errors.snap.message}</small>
      </form>
    </div>
  );
};

export default Form;
