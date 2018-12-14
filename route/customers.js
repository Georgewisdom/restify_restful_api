const errors = require("restify-errors");
const Customer = require("../model/Customer");
const rjwt = require("restify-jwt-community");
const config = require("../config");
module.exports = server => {
  server.get("/customers", async (req, res, next) => {
    try {
      const customers = await Customer.find({});
      res.send(customers);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });
  //   Add customer route
  server.post(
    "/customers",
    rjwt({ secret: config.JWT_SECRET }),
    async (req, res, next) => {
      //   Check if JSON
      if (!req.is("application/json")) {
        return next(
          new errors.InvalidContentError("Make sure it JSON application")
        );
      }
      const { name, email, balance } = req.body;
      const customer = new Customer({
        name,
        email,
        balance
      });
      try {
        const newCustomer = await customer.save();
        res.send(201);
        next();
      } catch (err) {
        return next(new errors.InternalError(err.message));
      }
    }
  );

  //   Get Single Customer
  server.get("/customers/:id", async (req, res, next) => {
    try {
      const customer = await Customer.findById(req.params.id);
      res.send(customer);
      next();
    } catch (err) {
      return next(
        new errors.ResourceNotFoundError(
          `invalid customer id, review pls this is ${req.params.id}`
        )
      );
    }
  });
  //   Update Customer
  server.put(
    "/customers/:id",
    rjwt({ secret: config.JWT_SECRET }),
    async (req, res, next) => {
      //   Check if JSON
      if (!req.is("application/json")) {
        return next(
          new errors.InvalidContentError("Make sure it JSON application")
        );
      }

      try {
        const customer = await Customer.findOneAndUpdate(
          { _id: req.params.id },
          req.body
        );
        res.send(200);
        next();
      } catch (err) {
        return next(
          new errors.ResourceNotFoundError(
            `invalid customer id, review pls this is ${req.params.id}`
          )
        );
      }
    }
  );
  //   Delete Customer
  server.del("/customers/:id", async (req, res, next) => {
    try {
      const customer = await Customer.findByIdAndRemove({ _id: req.params.id });
      res.send(204);
      next();
    } catch (err) {
      return next(
        new errors.ResourceNotFoundError(
          `invalid customer id, review pls this is ${req.params.id}`
        )
      );
    }
  });
};
