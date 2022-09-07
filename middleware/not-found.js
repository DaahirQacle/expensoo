const notFoundMiddleware = (req, res) => {
  res.status(404).send("this route does not exits");
};

export default notFoundMiddleware;
