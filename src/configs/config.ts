export default {
  PORT: 4000,
  TOKEN: 'wm-chat-token',
  MONGODB_URI: 'mongodb://127.0.0.1:27017/wm-chat', // mongodb地址
  LOGIN_EXPIRE: 60 * 60 * 24 * 30, // 30天，登录保持过期时间
};
