const logger = require('emberdyn-logger')

logger.log({ message: 'Hello World', level: 'error' })
logger.log({ message: 'Hello World', level: 'event' })
logger.log({ message: 'Hello World', level: 'warn' })
logger.log({ message: 'Hello World', level: 'info' })
logger.log({ message: 'Hello World', level: 'debug' })
logger.log({ message: 'Hello World', level: 'fatal' })
logger.log({ message: 'Hello World', level: 'system' })
logger.log({ message: 'Hello World', level: 'database' })

logger.addCustomLevels({
  test: {
    color: 'greenBright',
    fileModes: ['production', 'prod']
  }
})

logger.log({ message: 'This is a test', level: 'test' })

console.log(logger.readLog('test'))
