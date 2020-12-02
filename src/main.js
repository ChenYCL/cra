import chalk from 'chalk';
import execa from 'execa';
import fs from 'fs';
import gitignore from 'gitignore';
import Listr from 'listr';
import ncp from 'ncp';
import path from 'path';
import {projectInstall} from 'pkg-install';
import license from 'spdx-license-list/licenses/MIT';
import {promisify} from 'util';

const access = promisify(fs.access);
const writeFile = promisify(fs.writeFile);
const copy = promisify(ncp);
const writeGitignore = promisify(gitignore.writeFile);

async function copyTemplateFiles(options) {
    return copy(options.templateDirectory, options.targetDirectory, {
        clobber: false,
    });
}

// async function createGitignore(options) {
//     const file = fs.createWriteStream(
//         path.join(options.targetDirectory, '.gitignore'),
//         {flags: 'a'}
//     );
//     return writeGitignore({
//         type: 'Node',
//         file: file,
//     });
// }

// async function createLicense(options) {
//     const targetPath = path.join(options.targetDirectory, 'LICENSE');
//     const licenseContent = license.licenseText
//         .replace('<year>', new Date().getFullYear())
//         .replace('<copyright holders>', `${options.name} (${options.email})`);
//     return writeFile(targetPath, licenseContent, 'utf8');
// }

async function initGit(options) {
    const result = await execa('git', ['init'], {
        cwd: options.targetDirectory,
    });
    if (result.failed) {
        return Promise.reject(new Error('Failed to initialize git'));
    }
    return;
}

async function modifyConfig(options) {
    const envPath = path.join(options.targetDirectory, '.env')
    fs.writeFileSync(envPath, `PORT=${options.port}`)

    let config = `
  // https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    name: 'Ant Design Pro',
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use \`navigator.language\` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  history: { type: 'hash' },
  proxy: proxy[REACT_APP_ENV || 'dev'],
  qiankun: {
    // master: {},
    slave: {},
  },
  metas:[
    {
      name: 'keywords',
      content: '内容'
    },
    {
      name: 'description',
      content: '🍙 插件化的企业级前端应用框架。'
    },

  ],
  // manifest: {
  //   basePath: '/',
  // },
  nodeModulesTransform:{ type: 'none' },
  base: '/${options.base}/',
  publicPath: '/',
  outputPath: './${options.base}',
  exportStatic: {},
});

  
  `
    let configPath = path.join(options.targetDirectory, 'config', 'config.ts')
    fs.writeFileSync(configPath, config)
}

export async function createProject(options) {
    options = {
        ...options,
        targetDirectory: options.targetDirectory || process.cwd(),
        email: 'aa34913@gmail.com',
        name: 'ChenYCL',
    };

    const templateDir = path.join(__dirname,'..','templates', options.template.toLowerCase())
    options.templateDirectory = templateDir;

    try {
        await access(templateDir, fs.constants.R_OK);
    } catch (err) {
        console.error(chalk.red.bold('ERROR:'),err);
        process.exit(1);
    }

    const tasks = new Listr(
        [
            {
                title: 'Copy project files',
                task: () => copyTemplateFiles(options),
            },
            {
                title: 'Modify config',
                task: () => modifyConfig(options)
            },
            // {
            //     title: 'Create gitignore',
            //     task: () => createGitignore(options),
            // },
            // {
            //     title: 'Create License',
            //     task: () => createLicense(options),
            // },
            {
                title: 'Initialize git',
                task: () => initGit(options),
                enabled: () => options.git,
            },
            {
                title: 'Install dependencies',
                task: () =>
                    projectInstall({
                        cwd: options.targetDirectory,
                    }),
                skip: () =>
                    !options.runInstall
                        ? 'Pass --install to automatically install dependencies'
                        : undefined,
            },
        ],
        {
            exitOnError: false,
            concurrency: true
        }
    );

    await tasks.run();
    console.log('%s Project ready', chalk.green.bold('DONE'));
    return true;
}
