/**
 * @author wuaixiaoyao
 * @date 2019/10/25
 * @Description: pm2 配置文件
 */
// module.exports = {
//   "apps": {
//     "name": "pm2-h5", // 起个进程名，即AppName
//     "script": "app.js", // 启动的入口文件
//     "watch": true, // 监听文件变化，自动重启
//     "ignore_watch": [
//       // 不需要监听的文件
//       "node_modules",
//       "logs"
//     ],
//     "exec_mode": "cluster", //集群模式,内置的cluster,相当于对node的cluster的封装
//     "instances": 4, // 设置多进程
//     "error_file": "logs/err.log", // 错误日志存储的文件
//     "out_file": "logs/out.log", // console.log()打印的都会放进去
//     "log_date_format": "YYYY-MM-DD HH:mm:ss" // 给每行日志标记一个时间
//   }
// }

module.exports = {
  apps: [
    {
      name: 'react-h5', // 项目名称
      cwd: './', // 当前工作路径
      script: 'app.js', // 实际启动脚本
      autorestart: true, // 自动重启
      exec_mode: 'cluster', // 应用启动模式，支持fork和cluster模式 内置的cluster,相当于对node的cluster的封装
      min_uptime: '60s', // 应用运行少于时间被认为是异常启动
      restart_delay: 60, // 重启时延
      instances: 'max', // 开启n个实例，仅在cluster模式有效，用于负载均衡
      watch: ['build'], // 监控变化的目录
      watch_delay: 1000, // 监控时延
      ignore_watch: ['node_modules'], // 从监控目录中排除
      watch_options: {
        // 监听配置
        followSymlinks: false,
        usePolling: true,
      },
      error_file: 'logs/err.log', // 错误日志存储的文件
      out_file: 'logs/out.log', // console.log()打印的都会放进去
      log_date_format: 'YYYY-MM-DD HH:mm:ss', // 给每行日志标记一个时间
      // 默认的环境变量
      env: {
        PM2_ENV: 'dev',
      },
      // 测试环境
      env_test: {
        RUNTIME_ENV: 'test',
      },
      env_production: {
        RUNTIME_ENV: 'prod',
      },
    },
  ],
};
