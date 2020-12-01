import arg from 'arg';
import inquirer from 'inquirer';
import { createProject } from './main';
import chalk from "chalk";

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--git': Boolean,
      '--yes': Boolean,
      '--install': Boolean,
      '--version':Boolean,
      '-g': '--git',
      '-y': '--yes',
      '-i': '--install',
      '-v':'--version',
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    skipPrompts: args['--yes'] || false,
    git: args['--git'] || false,
    template: args._[0],
    runInstall: args['--install'] || false,
    version:args['--version'] || false
  };
}

async function promptForMissingOptions(options) {
  const defaultTemplate = 'app';
  if(options.version){
     console.log('% cli version:', chalk.green.bold(require('../package.json').version));
     process.exit()
  }
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
    };
  }

  const questions = [];
  if (!options.template) {
    questions.push({
      type: 'list',
      name: 'template',
      message: '请选模版',
      choices: ['app'],
      default: defaultTemplate,
    });
  }

  if (!options.port) {
    questions.push({
      type: 'input',
      name: 'port',
      message: '请输入开发环境端口<9505>',
      validate:(value)=>{
        if(isNaN(value)){
          return '必须是数字'
        }
        return true
      },
      default: 9505,
    });
  }

  if (!options.base) {
    questions.push({
      type: 'input',
      name: 'base',
      message: '请输入子模块注册base名',
    });
  }

  if (!options.git) {
    questions.push({
      type: 'confirm',
      name: 'git',
      message: '初始化git',
      default: false,
    });
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    template: options.template || answers.template,
    git: options.git || answers.git,
    port: options.port || answers.port,
    base: options.base || answers.base
  };
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  await createProject(options);
}

// ...
