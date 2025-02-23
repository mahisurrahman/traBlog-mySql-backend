const statusCode = require("../../utils/statusCode/statusCode.js");
const authServices = require("../../services/authServices/authServices.js");

const createErrorMessage = (message, data) => {
  return {
    status: statusCode,
    data: data,
    message: message,
    error: true,
  };
};

module.exports = {
  async registerUserController(req, res) {
    try {
      let response = await authServices.registerUserService(req.body);
      return res.status(response.status).send(response);
    } catch (error) {
      console.error(error);
      const newError = createErrorMessage();
      newError.data = error;
      newError.message = "Register User Controller Error";
      newError.status = statusCode.internalServerError;
      newError.error = true;
      return res.status(newError.status).json(newError);
    }
  },

  async loginUserController(req, res) {
    try {
      let response = await authServices.loginUserService(req.body);
      if (!response.error) {
        res.cookie("access_token", response.token, {
          httpOnly: true,
        });
      }

      console.log(response, "Response");

      return res.status(response.status).json(response);
    } catch (error) {
      console.error(error);
      const newError = createErrorMessage();
      newError.data = error;
      newError.message = "Login User Controller Error";
      newError.status = statusCode.internalServerError;
      newError.error = true;
      return res.status(newError.status).json(newError);
    }
  },

  async logoutUserController(req, res) {
    try {
      let response = await authServices.logoutUserService(req.body);
      return res.status(response.status).send(response);
    } catch (error) {
      console.error(error);
      const newError = createErrorMessage();
      newError.data = error;
      newError.message = "Logout User Controller Error";
      newError.status = statusCode.internalServerError;
      newError.error = true;
      return res.status(newError.status).json(newError);
    }
  },
};
