const logger = require('../index')

logger.log({ message: 'This is an error logger level using default configuration.', level: 'error' })
logger.log({ message: 'This is an event logger level using default configuration.', level: 'event' })
logger.log({ message: 'This is a warn logger level using default configuration.', level: 'warn' })
logger.log({ message: 'This is an info logger level using default configuration.', level: 'info' })
logger.log({ message: 'This is a debug logger level using default configuration.', level: 'debug' })
logger.log({ message: 'This is a fatal logger level using default configuration.', level: 'fatal' })
logger.log({ message: 'This is a system logger level using default configuration.', level: 'system' })
logger.log({ message: 'This is a database logger level using default configuration.', level: 'database' })
logger.log({ message: 'This is a process logger level using custom configuration.', level: 'process' })
logger.log({ message: 'This is an api logger level using custom configuration.', level: 'api' })

logger.addCustomLevels({
  custom: {
    color: 'greenBright',
    fileModes: ['production', 'prod']
  }
})

logger.log({ message: 'This is a custom run time logger level.', level: 'test' })

console.log(logger.readLog('test'))
