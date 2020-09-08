/**
 * @description Project Name: emberdyn-logger
 * @author Emberdyn, LLC (support@emberdyn.com)
 */

require('dotenv/config')
const path = require('path')
const chalk = require('chalk')
const moment = require('moment')
const {
  existsSync,
  mkdirSync,
  appendFileSync,
  createReadStream
} = require('fs')

const appDir = path.dirname(require.main.filename)

const defaultConfig = require('./config' + path.sep + 'logger')
const customConfig = process.env.EMBERDYN_LOGGER_CONFIG_PATH != undefined ? require(appDir +
  path.sep +
  process.env.EMBERDYN_LOGGER_CONFIG_PATH +
  path.sep +
  'logger') : {}

const config = { levels: { ...defaultConfig.levels, ...customConfig.levels } }

global.loggerLevels = config.levels

exports.log = (options) => {
  const levelName =
    options.level && global.loggerLevels.hasOwnProperty(options.level)
      ? options.level
      : 'info'

  const level = global.loggerLevels[levelName]
  const message = options.message ? options.message : 'Unidentified Error'
  const error = options.error ? options.error : null

  //Chalk function should interpolate to: chalk['brightRed']('[ERROR]: Some Message')
  if (error) {
    console.log(
      `${chalk[level.color](`[${levelName.toUpperCase()}]`)}: ${chalk[
        level.color
      ](error.message + '\n' + error.stack)}`
    )
  } else {
    console.log(
      `${chalk[level.color](`[${levelName.toUpperCase()}]`)}: ${chalk[
        level.color
      ](message)}`
    )
  }

  const file = options.file
    ? path.resolve(
        __dirname,
        '..',
        '..',
        'logs',
        options.file.includes('.') ? options.file : `${options.file}.log`
      )
    : path.resolve(__dirname, '..', '..', 'logs', `${options.level}.log`)

  // Decide whether to write logs to file based on configuration file.
  if (
    config.levels[levelName].fileModes.includes(
      process.env.EMBERDYN_LOGGING_MODE
    )
  ) {
    writeToFile(file, levelName, message)
  }
}

exports.addCustomLevels = (obj) => {
  global.loggerLevels = Object.assign(global.loggerLevels, obj)
}

const writeToFile = (filePath, level, message) => {
  const logsDir = path.resolve(__dirname, '..', '..', 'logs')
  const currentDate = moment(new Date()).format(
    moment.HTML5_FMT.DATETIME_LOCAL_SECONDS
  )

  const data = `{"level": "${level.toUpperCase()}", "message": "${message}", "timestamp": "${currentDate}"}\r\n`
  if (!existsSync(logsDir)) {
    mkdirSync(logsDir)
  }

  const options = {
    encoding: 'utf8',
    mode: 438 /*=0666*/
  }

  appendFileSync(filePath, data, options)
}

exports.readLog = async (fileName) => {
  const logsDir = path.resolve(__dirname, '..', '..', 'logs')

  return new Promise((resolve, reject) => {
    const file = path.join(
      logsDir,
      fileName.includes('.') ? fileName : `${fileName}.log`
    )

    const lineReader = require('readline').createInterface({
      input: createReadStream(file)
    })

    const logs = []

    lineReader.on('line', (line) => {
      logs.push(JSON.parse(line))
    })

    lineReader.on('close', () => {
      console.log(
        chalk.yellow(`${fileName.toUpperCase()} Logs have been accessed `)
      )
      console.table(logs)
      resolve(logs)
    })

    lineReader.on('error', (error) => {
      reject(error)
    })
  })
}
