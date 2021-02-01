const PREFIX_API = process.env.VUE_APP_HOST;

export default {
  smsSend: `${PREFIX_API}/sms/send`,
  smsLogin: `${PREFIX_API}/sms/login`,
  qiniuToken: `${PREFIX_API}/qiniu/token`,
  socialWechat: `${PREFIX_API}/auth/social/wechat`,
  socialWechatUrl: `${PREFIX_API}/auth/social/wechat/url`,
  userInfo: `${PREFIX_API}/user/user-info`,
  userWechatBind: `${PREFIX_API}/user/wechat-bind`,
  userPhoneBind: `${PREFIX_API}/user/phone-bind`
};
