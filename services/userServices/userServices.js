module.exports = {
  async getAllUserService() {
    try {
        
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
