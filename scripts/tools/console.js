const chalk = require('chalk');
const Console = {
  error(msg) {
    console.log(chalk.red.bold(msg));
  },
  info(msg) {
    console.log(chalk.white(msg));
  },
  success(msg) {
    console.log(chalk.green(msg));
  },
};

module.exports = Console;
