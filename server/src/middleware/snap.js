export const deleteSnap = (req, res, next) => {
  const { token } = req.headers;

  if (token != 'pepikus') {
    return res.json({ data: 'incorrect', status: false });
  }

  next();
};
