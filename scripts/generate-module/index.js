const fsp = require('fs/promises');
const fs = require('fs');
const path = require('path');
const Console = require('../tools/console');
const controllerTemplate = require('./template/controller-template');

/**
 * 生成绝对路径 ../../modulename.controller.ts
 */
const getTargetPath = (type) =>
  path.resolve(__dirname, `${moduleName}.${type}.ts`);

const writeFileConsole = (targetPath) => {
  return {
    begin() {
      Console.info(`正在开始写入：${targetPath}`);
    },
    exits() {
      Console.info(`目标已经存在，将会删除后重新生成：${targetPath}`);
    },
    rmEnd() {
      Console.info(`删除成功：${targetPath}`);
    },
    end() {
      Console.success(`写入成功：${targetPath}`);
    },
  };
};

/**
 *
 * @param {*} moduleName 模块的名字
 * @param {*} modulePath 模块创建位置的绝对路径
 */
function genModule(moduleName, modulePath) {
  const pathBucket = new Set();

  // 生成controller文件
  const genControllerFile = () => {
    const targetPath = getTargetPath('controller');
    pathBucket.add(targetPath);

    const controllerConsole = writeFileConsole(targetPath);
    return new Promise(async (resolve, reject) => {
      controllerConsole.begin();
      // 判断文件重复
      const isExist = fs.existsSync(targetPath);
      if (isExist) {
        controllerConsole.exits();
        fs.rmSync(targetPath);
        controllerConsole.rmEnd();
      }
      // 开始写入
      fsp
        .writeFile(targetPath, controllerTemplate(moduleName))
        .then(() => {
          controllerConsole.end();
          resolve(moduleName);
        })
        .catch(() => {
          reject('生成controller时出错');
        });
    });
  };

  const genModuleFile = () => {
    pathBucket.push(getTargetPath('module'));
  };

  const genService = () => {
    pathBucket.push(getTargetPath('service'));
  };

  Promise.all([genControllerFile()]).catch((err) => {
    Console.error(`${err}，其他生成成功的文件将一起被删除。`);

    pathBucket.forEach((path) => {
      const isExist = fs.existsSync(path);
      isExist && fs.rmSync(path);
    });
  });
}

const argv = process.argv.slice(2);
const argument0 = argv[0]; //第0个参数，test-module，从中提取模块名

if (argument0.lastIndexOf('-module') < 0) {
  console.error('第一个参数需要传入：模块名-module');
  return;
}

const moduleName = argument0.split('-')[0];
const modulePath = path.resolve(__dirname, `${argv[1] || './'}`);

genModule(moduleName, modulePath);
