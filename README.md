# emberdyn-logger
A Logging Module For Node JS

## Installation
```npm install emberdyn-logger```

## Environment Variables
If your project does not already have one, you will need to create a ***.env*** file.  The contents of that file should look as follows:
```
#|-------------------------------|
#| Environment Variables Example |
#|-------------------------------|

#Let the module know where you Logger configuration file can be found. The path provided is relative to the root folder of your project.
EMBERDYN_LOGGER_CONFIG_PATH=src/config

#Set the logging mode to determine where the log should be displayed. Change this value to math modes you specified in the configuration file. (Details below)
EMBERDYN_LOGGING_MODE=development
```

## Configuration
* You must also create a configuration file in the path specified in the ***.env*** file.
* The file name must be `logger.js`.

Example Configuration File:
```
module.exports = {
  levels: {
    access: {
      color: 'cyanBright',
      fileModes: ['production', 'prod']
    },
    warn: {
      color: 'yellowBright',
      fileModes: ['production', 'prod']
    },
    system: {
      color: 'blue',
      fileModes: ['production', 'prod']
    },
    database: {
      color: 'cyan',
      fileModes: ['production', 'prod']
    },
    info: {
      color: 'green',
      fileModes: ['production', 'prod']
    },
    debug: {
      color: 'cyan',
      fileModes: ['production', 'prod']
    },
    event: {
      color: 'magenta',
      fileModes: ['production', 'prod']
    },
    error: {
      color: 'red',
      fileModes: ['production', 'prod']
    },
    fatal: {
      color: 'redBright',
      fileModes: ['production', 'prod']
    }
  }
}
```

* This logger uses the [chalk]('https://www.npmjs.com/package/chalk') package to add colors to the logs. 
* Use the Chalk documentation to find color names for your log levels.


## Example Usage
```logger.log({ message: 'Hello World', level: 'info' })```
