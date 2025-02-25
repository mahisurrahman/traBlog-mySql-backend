const connectToDb = require("../../database/db.js");
const missingInputs = require("../../utils/missingInputs/missingInputs.js");
const queryAsync = require("../../utils/queryAsyncFunction/queryAsync.js");

module.exports = {
  async crtCatgrySrvc(body) {
    try {
      const db = await connectToDb();
      const { categoryName, categoryCode } = body;
      const requiredFields = { categoryName, categoryCode };

      for (const [fieldName, fieldValue] of Object.entries(requiredFields)) {
        const missing = missingInputs(fieldValue, fieldName);
        if (missing) {
          return missing;
        }
      }

      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS categories (
            id INT AUTO_INCREMENT PRIMARY KEY,
            categoryName VARCHAR(225) NOT NULL UNIQUE,
            categoryCode VARCHAR(255) NOT NULL UNIQUE
        );`;

      await queryAsync(db, createTableQuery);

      const checkCategoryExistQuery =
        "SELECT * FROM categories WHERE categoryName = ? OR categoryCode = ?";
      const categoryExists = await queryAsync(db, checkCategoryExistQuery, [
        body.categoryName,
        body.categoryCode,
      ]);

      if (categoryExists.length > 0) {
        db.end();
        return {
          status: 409,
          error: false,
          message: "Category Already Exists",
          data: categoryExists,
        };
      }

      const insertQuery = `INSERT INTO categories (categoryName, categoryCode) VALUES (?, ?)`;
      const values = [body.categoryName, body.categoryCode];

      const insertResult = await queryAsync(db, insertQuery, values);

      if (!insertResult.insertId) {
        // db.end();
        return {
          status: 400,
          message: "Failed to insert category",
          data: null,
          error: true,
        };
      }

      const fetchCategoryQuery = "SELECT * FROM categories WHERE id = ?";
      const newCategoryResults = await queryAsync(db, fetchCategoryQuery, [
        insertResult.insertId,
      ]);

      const newCategory = newCategoryResults[0];
      return {
        status: 201,
        error: false,
        message: "Category successfully added",
        data: newCategory,
      };
    } catch (error) {
      console.log("Create Category Service Error", error);
      return {
        status: 500,
        message: "Create Category Service Error",
        data: null,
        error: true,
      };
    }
  },

  async getAllCatgrySrvc() {
    try {
    } catch (error) {
      console.log("Get All Categories Service Error", error);
      return {
        status: 500,
        message: "Get All Category Service Error",
        data: null,
        error: true,
      };
    }
  },

  async getSingleCatgrySrvc(id) {
    try {
    } catch (error) {
      console.log("Get Single Categories Service Error", error);
      return {
        status: 500,
        message: "Get Single Category Service Error",
        data: null,
        error: true,
      };
    }
  },

  async rmvSingleCatgrySrvc(id) {
    try {
    } catch (error) {
      console.log("Remove Single Categories Service Error", error);
      return {
        status: 500,
        message: "Remove Single Category Service Error",
        data: null,
        error: true,
      };
    }
  },
};
