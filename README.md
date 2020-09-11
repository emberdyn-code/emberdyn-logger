# emberdyn-logger

A Logging Module For Node JS

## Installation

`npm install emberdyn-logger`

## Environment Variables

If your project does not already have one, you will need to create a **_.env_** file. The contents of that file should look as follows:

```
#|-------------------------------|
#| Environment Variables Example |
#|-------------------------------|

#Let the module know where you Logger configuration file can be found. The path provided is relative to the root folder of your project.
#This variable is optional and only needed if you create a configuration file to expand or extend the default levels.
EMBERDYN_LOGGER_CONFIG_PATH=src/config

#Set the logging mode to determine where the log should be displayed. Change this value to math modes you specified in the configuration file. (Details below)
EMBERDYN_LOGGING_MODE=development
```

## Configuration

- You may also create a configuration file in the path specified in the **_.env_** file.
- The file name must be `logger.js`.
- Your file should look something like this ...

Custom Configuration File:

```
module.exports = {
  levels: {
    process: {
      color: 'blueBright',
      fileModes: ['production', 'prod']
    },
    api: {
      color: 'magentoBright',
      fileModes: ['production', 'prod']
    }
  }
}
```

The Default Configuration File Looks like this:

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

- Each level in the configuration can define a **_color_** property.
- This logger uses the [chalk]('https://www.npmjs.com/package/chalk') package to add colors to the logs.
- Use the Chalk documentation to find color names for your log levels.
- You can also add a **_fileModes_** property to the configuration for each level. This defines the EMBERDYN_LOGGING_MODE(s) that will write to files instead of the console.

## Example Usage

\*An example project using the logger can be found in the repository.

```
const logger = require('emberdyn-logger')
logger.log({ message: 'Hello World', level: 'info' })
```

## Helper functions

There are also helper function for the logger available for the default logging levels.

### Example

```
logger.error('Testing the helper function for info.', errorObject)
logger.event('Testing the helper function for event.')
logger.warn('Testing the helper function for warn.')
logger.info('Testing the helper function for info.')
logger.debug('Testing the helper function for debug.')
logger.fatal('Testing the helper function for fatal.', errorObject)
logger.system('Testing the helper function for system.')
logger.database('Testing the helper function for database.')
logger.access('Testing the helper function for access.')
```

## Example Project
If you visit the repository you can download an example project.

[Emberdyn Logger Repository](https://github.com/emberdyn-code/emberdyn-logger)