const port = process.env.PORT || 3999;
const connectToDb = require("./database/db.js");
const { app } = require("./app");
const routermanager = require("./routermanager.js");

connectToDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    routermanager();
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
