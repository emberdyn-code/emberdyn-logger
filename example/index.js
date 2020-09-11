const logger = require('../index')

logger.log({
  message: 'This is an error logger level using default configuration.',
  level: 'error'
})
logger.log({
  message: 'This is an event logger level using default configuration.',
  level: 'event'
})
logger.log({
  message: 'This is a warn logger level using default configuration.',
  level: 'warn'
})
logger.log({
  message: 'This is an info logger level using default configuration.',
  level: 'info'
})
logger.log({
  message: 'This is a debug logger level using default configuration.',
  level: 'debug'
})
logger.log({
  message: 'This is a fatal logger level using default configuration.',
  level: 'fatal'
})
logger.log({
  message: 'This is a system logger level using default configuration.',
  level: 'system'
})
logger.log({
  message: 'This is a database logger level using default configuration.',
  level: 'database'
})
logger.log({
  message: 'This is a process logger level using custom configuration.',
  level: 'process'
})
logger.log({
  message: 'This is an api logger level using custom configuration.',
  level: 'api'
})

logger.addCustomLevels({
  custom: {
    color: 'greenBright',
    fileModes: ['production', 'prod']
  }
})

logger.log({
  message: 'This is a custom run time logger level.',
  level: 'test'
})

console.log(logger.readLog('test'))

logger.error('Testing the helper function for info.')
logger.event('Testing the helper function for event.')
logger.warn('Testing the helper function for warn.')
logger.info('Testing the helper function for info.')
logger.debug('Testing the helper function for debug.')
logger.fatal('Testing the helper function for fatal.')
logger.system('Testing the helper function for system.')
logger.database('Testing the helper function for database.')
logger.access('Testing the helper function for access.')
