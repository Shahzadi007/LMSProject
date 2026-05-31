const notFound = (
  req,
  res,
  next
) => {
  res.status(404);

  throw new Error(
    "Route Not Found"
  );
};

module.exports = notFound;