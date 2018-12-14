module.exports = {
  ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5000,
  URL: process.env.BASE_URL || "http://localhost:5000",
  MONGODB_URI:
    process.env.MONGODB_URI ||
    " mongodb://george1:george1@ds125041.mlab.com:25041/restify_api",
  JWT_SECRET: process.env.JWT_SECRET || "secret"
};
