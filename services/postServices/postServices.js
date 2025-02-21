module.exports = {
    async getAllPostsService() {
      try {
          return{
            status: 200,
            error: false,
            data: null,
            message: "Posts Not Found"
          }
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
  };
  