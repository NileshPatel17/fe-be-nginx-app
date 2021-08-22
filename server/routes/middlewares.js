const isLoggedIn = async (req, res, next) => {
  const isAuthenticated = await req.isAuthenticated();
  if (isAuthenticated) {
    return next();
  }

  const error = new Error('Authentication Required');
  error.status = 401;
  next(error);
};

module.exports = {
  isLoggedIn
};
