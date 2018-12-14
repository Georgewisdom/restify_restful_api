const restify = require("restify");
const mongoose = require("mongoose");
const config = require("./config");
const rjwt = require("restify-jwt-community");

// Initialise resify server into a const
const server = restify.createServer();

// Middleware
server.use(restify.plugins.bodyParser());

// Protect
// server.use(rjwt({ secret: config.JWT_SECRET }).unless({ path: ["/auth"] })); // this protect selected routes

// Launch Server
server.listen(config.PORT, () => {
  mongoose.set("useFindAndModify", false);
  mongoose.connect(
    config.MONGODB_URI,
    { useNewUrlParser: true }
  );
});

const db = mongoose.connection;

db.on("error", err => console.log(err));

db.once("open", () => {
  require("./route/customers")(server);
  require("./route/users")(server);
  console.log(`server started on port ${config.PORT}`);
});
