const connectToDb = require("../../database/db.js");

module.exports = {
  async registerUserService(body) {
    console.log("Body Data", body);
    try {
      const db = await connectToDb();
      console.log(db, "Connect To DB");

      // Check Existing User
      const q = "SELECT * FROM users WHERE email = ? OR userName = ?";
      const results = await new Promise((resolve, reject) => {
        db.query(q, [body.email, body.userName], (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });

      if (results.length > 0) {
        return {
          status: 409,
          error: false,
          message: "User Already Exists",
          data: results,
        };
      }

      // Close the database connection
      db.end();

      return {
        status: 200,
        error: false,
        message: "User can be registered",
        data: null,
      };
    } catch (error) {
      console.log("Register User Service Error", error);
      return {
        status: 400,
        error: true,
        data: null,
        message: "Register User Service Error",
      };
    }
  },

  async loginUserService(body) {
    try {
      // Implement login logic here
    } catch (error) {
      console.log("Login User Service Error", error);
      return {
        status: 400,
        error: true,
        data: null,
        message: "Login User Service Error",
      };
    }
  },

  async logoutUserService(body) {
    try {
      // Implement logout logic here
    } catch (error) {
      console.log("Logout User Service Error", error);
      return {
        status: 400,
        error: true,
        data: null,
        message: "Logout User Service Error",
      };
    }
  },
};
