const connectToDb = require("../../database/db.js");
const missingInputs = require("../../utils/missingInputs/missingInputs.js");
const queryAsync = require("../../utils/queryAsyncFunction/queryAsync.js");

module.exports = {
  async getAllPostsService() {
    try {
      return {
        status: 200,
        error: false,
        data: null,
        message: "Posts Not Found",
      };
    } catch (error) {
      console.log("Get All Post Service Error", error);
      return {
        status: 400,
        error: true,
        data: null,
        message: "Get All Post Service Error",
      };
    }
  },

  async createPostsService(body) {
    try {
      const db = await connectToDb();

      const { postTitle, description, postThumbnail, userId, categoryId } =
        body;
      const requiredFields = {
        postTitle,
        description,
        postThumbnail,
        userId,
        categoryId,
      };

      for (const [fieldName, fieldValue] of Object.entries(requiredFields)) {
        const missing = missingInputs(fieldValue, fieldName);
        if (missing) {
          return missing;
        }
      }

      const createTableQuery = `
          CREATE TABLE IF NOT EXISTS posts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            postTitle VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            postThumbnail VARCHAR(255) NOT NULL,
            userId INT NOT NULL,
            categoryId INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            is_active BOOLEAN DEFAULT TRUE,
            is_deleted BOOLEAN DEFAULT FALSE,
            FOREIGN KEY (userId) REFERENCES users(id),
            FOREIGN KEY (categoryId) REFERENCES categories(id)
          )`;
      await queryAsync(db, createTableQuery);

      const checkPostsExistsQuery = "SELECT * FROM posts WHERE postTitle = ?";
      const checkPostsExists = await queryAsync(db, checkPostsExistsQuery, [
        body.postTitle,
      ]);

      if (checkPostsExists.length > 0) {
        db.end();
        return {
          status: 409,
          error: false,
          message: "Post Title Already Exists",
          data: null,
        };
      }

      const insertQuery =
        "INSERT INTO posts (postTitle, description, postThumbnail, userId, categoryId) VALUES (?, ?, ?, ?, ?)";
      const values = [
        body.postTitle,
        body.description,
        body.postThumbnail,
        body.userId,
        body.categoryId,
      ];

      const insertResult = await queryAsync(db, insertQuery, values);

      if (!insertResult.insertId) {
        return {
          status: 400,
          error: true,
          message: "Failed to insert post",
          data: null,
        };
      }

      const fetchPostsQuery = "SELECT * FROM posts WHERE id = ?";
      const newPostsResults = await queryAsync(db, fetchPostsQuery, [
        insertResult.insertId,
      ]);

      const newPosts = newPostsResults[0];
      return {
        status: 201,
        error: false,
        message: "Post created successfully",
        data: newPosts,
      };
    } catch (error) {
      console.log("Create Posts Service Error", error);
      return {
        status: 400,
        error: true,
        data: null,
        message: "Create Posts Service Error",
      };
    }
  },
};
