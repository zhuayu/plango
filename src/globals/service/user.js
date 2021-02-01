import request from "@/globals/request/axios.js";
import API from "@/globals/request/api.js";

const userService = {
  userInfo: function(params) {
    return request.get(API.userInfo, params);
  },
  updateUserInfo: function(params) {
    return request.put(API.userInfo, params);
  }
};

export default userService;
