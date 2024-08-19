import { SnapModel } from '../model/index.js';
import { client } from '../boot/client.js';

export const snaps = (req, res) => {
  SnapModel.database.reverse();
  res.json(SnapModel.database).status(200);
};

export const snap = (req, res) => {
  const { id } = req.params;
  const snap = SnapModel.database.filter((snap) => snap.id === Number(id));
  res.json(snap).status(200);
};

export const create = (req, res) => {
  const { snap, username, socket } = req.body;
  const data = {
    id: Math.floor(Math.random() * 100000),
    username,
    snap,
    createdAt: new Date(),
    socket: socket,
  };

  if (SnapModel.database.length > 300) {
    SnapModel.database.length = 0;
  }

  SnapModel.database.push(data);
  client.emit('client:snap:create', data);
  res.json(data).status(200);
};

export const destroy = (req, res) => {
  res.json({ data: 'destroyed' }).status(200);
};
