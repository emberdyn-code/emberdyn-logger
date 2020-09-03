/**
 * @description Project Name: restful-api
 * @author Shawn Foster (shawn@emberdyn.com)
 * @copyright (c) Emberdyn, LLC 2019, - All Rights Reserved
 * @version 1.0.0
 */

import 'dotenv/config'
import path from 'path'
import chalk from 'chalk'
import moment from 'moment'
import { existsSync, mkdirSync, appendFileSync, createReadStream } from 'fs'
const config = require(node.process.env.EMBERDYN_LOGGER_CONFIG_PATH + '/logger')

export const initLogger = () => {
  global.loggerLevels = config.levels
}

export const log = (options) => {
  const levelName =
    options.level && global.loggerLevels.hasOwnProperty(options.level)
      ? options.level
      : 'info'

  const level = global.loggerLevels[levelName]
  const message = options.message ? options.message : 'Unidentified Error'
  const error = options.error ? options.error : null

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
  if (config.levels[levelName].fileModes.includes(process.env.API_MODE)) {
    writeToFile(file, levelName, message)
  }
}

export const addCustomLevels = (obj) => {
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

export const readLog = async (fileName) => {
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
