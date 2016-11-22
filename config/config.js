module.exports = {
  port: process.env.PORT || 3000,
  node_env: process.env.NODE_ENV || 'development',
  morgan_log_level: process.env.MORGAN_LOG_LEVEL || 'dev',
};