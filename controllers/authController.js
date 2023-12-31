const checkAuth = (req, res, next) => {
  try{
    if (req.session.token) {
      next();
    }
    else {
      throw new Error("Please log in by going to https://landscapeproject.onrender.com/login");
    }
  }
  catch(err) {res.status(500).json({ message: err.message })};
};

module.exports = {checkAuth};
