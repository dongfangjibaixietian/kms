const { resolve } = require('./utils')

const cacheLoader = {
  loader: 'cache-loader',
  options: {
    cacheDirectory: resolve('.cache-loader'),
  },
}

const threadLoader = (workerParallelJobs) => {
  const options = { workerParallelJobs }
  // poolTimeout最好不要设为无限大，否则worker一直存在，则打包完毕后进程一直不退出
  Object.assign(options, { poolTimeout: 2000 })

  return { loader: 'thread-loader', options }
}

module.exports = {
  cacheLoader,
  threadLoader,
}
