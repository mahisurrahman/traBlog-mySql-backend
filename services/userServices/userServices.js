const connectToDb = require("../../database/db.js");

module.exports = {
  
  async getAllUserService() {
    try {
        const db = await connectToDb();

        const q = "SELECT * FROM users";
        const results = await new Promise((resolve, reject) => {
          db.query(q, (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
        });

        if(results.length > 0){
          return{
            status: 200,
            error: false,
            data: results,
            message: "Get All Users Success",
          }
        }
        
    } catch (error) {
      console.log("Get All User Service Error", error);
      return {
        status: 400,
        error: true,
        data: null,
        message: "Get All User Service Error",
      };
    }
  },
};
