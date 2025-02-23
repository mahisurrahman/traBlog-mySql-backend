const connectToDb = require("../../database/db.js");
const bcrypt = require("bcryptjs");
const queryAsync = require("../../utils/queryAsyncFunction/queryAsync.js");
const missingInputs = require("../../utils/missingInputs/missingInputs.js");
const jwt = require("jsonwebtoken");

module.exports = {
  async registerUserService(body) {
    try {
      const db = await connectToDb();
      const {
        firstName,
        lastName,
        userImg,
        gender,
        userRole,
        username,
        email,
        password,
      } = body;

      //Ensure if any input field is missing//
      const requiredFields = {
        firstName,
        lastName,
        userImg,
        gender,
        userRole,
        username,
        email,
        password,
      };
      for (const [fieldName, fieldValue] of Object.entries(requiredFields)) {
        const missing = missingInputs(fieldValue, fieldName);
        if (missing) {
          return missing;
        }
      }

      // Ensure Database Model Exists
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          firstName VARCHAR(225) NOT NULL,
          lastName VARCHAR(225) NOT NULL,
          userImg VARCHAR(225) NOT NULL,
          gender INT NOT NULL,
          userRole INT NOT NULL,
          username VARCHAR(50) NOT NULL UNIQUE,
          email VARCHAR(100) NOT NULL UNIQUE,
          password TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          is_active BOOLEAN DEFAULT TRUE,
          is_deleted BOOLEAN DEFAULT FALSE
        );`;
      await queryAsync(db, createTableQuery);

      // Check Existing User
      const checkQuery = "SELECT * FROM users WHERE email = ? OR username = ?";
      const existingUsers = await queryAsync(db, checkQuery, [
        body.email,
        body.username,
      ]);
      if (existingUsers.length > 0) {
        db.end();
        return {
          status: 409,
          error: false,
          message: "User Already Exists",
          data: existingUsers,
        };
      }

      // Hashing Password
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(body.password, salt);

      // Insert user's data to the DB
      const insertQuery = `
        INSERT INTO users (firstName, lastName, userRole, userImg, gender, username, email, password)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      const values = [
        body.firstName,
        body.lastName,
        body.userRole,
        body.userImg,
        body.gender,
        body.username,
        body.email,
        hash,
      ];
      const insertResult = await queryAsync(db, insertQuery, values);

      // Make sure insertId exists
      if (!insertResult.insertId) {
        return {
          status: 400,
          error: true,
          message: "Failed to insert user",
          data: null,
        };
      }

      // Fetch the new user data
      const fetchUserQuery = "SELECT * FROM users WHERE id = ?";
      const newUserResults = await queryAsync(db, fetchUserQuery, [
        insertResult.insertId,
      ]);
      const newUser = newUserResults[0];

      return {
        status: 201,
        error: false,
        message: "User created successfully",
        data: newUser,
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
      const db = await connectToDb();
      // Check User Exists
      const q = "SELECT * FROM users WHERE username = ?";
      const userExists = await queryAsync(db, q, [body.username]);

      if (userExists.length === 0) {
        return {
          status: 404,
          error: true,
          message: "User not found",
          data: null,
        };
      }

      //Check Password//
      const isPassCorrect = bcrypt.compareSync(
        body.password,
        userExists[0].password
      );

      if (!isPassCorrect) {
        return {
          status: 400,
          error: true,
          message: "Password does not match",
          data: null,
        };
      }

      const token = jwt.sign({ id: userExists[0].id }, "jwtkey");
      const { password, ...other } = userExists[0];

      return {
        status: 200,
        error: false,
        message: "Login Successful",
        data: {
          other,
          token,
        },
      };
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
