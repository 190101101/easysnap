import { UserModel } from '../model/index.js';
import { client } from '../boot/client.js';

export const users = (req, res) => {
  res.json(UserModel.database).status(200);
};

export const getUsersCount = (req, res) => {
  res.json(UserModel.database.length).status(200);
};

export const user = (req, res) => {
  const { id } = req.params;
  const user = UserModel.database.filter((user) => user.id === Number(id));
  res.json(user).status(200);
};

export const create = (req, res) => {
  const { username, password, socket } = req.body;

  const user = UserModel.database.find((user) => {
    return user.username === username;
  });

  if (!user) {
    const data = {
      id: Math.floor(Math.random() * 10000),
      username,
      password,
      socket: socket,
      createdAt: new Date(),
    };

    if (UserModel.database.length > 100) {
      UserModel.database.length = 0;
    }
 
    UserModel.database.push(data);
    data.count = UserModel.database.length;
    client.emit('client:user:create', data);
    return res.json(data);
  }

  if (user.password !== password) {
    return res.json({ message: 'wrong password ' });
  }

  return res.json(user).status(200);
};

export const destroy = (req, res) => {
  res.json({ data: 'destroyed' }).status(200);
};
