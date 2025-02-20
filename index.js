const port = process.env.PORT || 3999;
const connectToDb = require("./database/db.js");
const { app } = require("./app");

connectToDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// app.get("/", (req, res) => {
//   res.json("Hello This is the backend");
// });

// app.listen(port, () => {
//   console.log("Connected to backend");
// });
