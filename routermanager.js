const { app } = require("./app.js");
const authRoutes = require("./routes/authRoutes/authRoutes.js");
const userRoutes = require("./routes/userRoutes/userRoutes.js");
const postsRoutes = require("./routes/postRoutes/postRoutes.js");
const categoryRoutes = require("./routes/categoryRoutes/categoryRoutes.js");

const routermanager = () => {
  //Auth Routes//
  app.use("/auth", authRoutes);

  //Users Routes//
  app.use("/users", userRoutes);

  //Post Routes//
  app.use("/posts", postsRoutes);

  //Categories Routes//
  app.use("/category", categoryRoutes);
};

module.exports = routermanager;
