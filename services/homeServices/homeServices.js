module.exports = {
  async getHomeRouteService() {
    try {
        console.log("Home Route Hit");
    } catch (error) {
      console.log("Get Home Route Service Error", error);
      return {
        status: 500,
        message: "Get Home Route Service Error",
        data: null,
        error: true,
      };
    }
  },
};
