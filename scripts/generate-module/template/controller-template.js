const toUpperCaseFirst = require('./to-uppercase-first');

const controllerTemplate = (moduleName) => {
  const serviceParam = `${moduleName}Service`; //testService
  const exportServiceFunctionName = `${toUpperCaseFirst(moduleName)}Service`; //TestService
  const serviceFilePath = `./${moduleName}.service`; //./test.service
  const targetControllerFunctionName = `${toUpperCaseFirst(
    moduleName,
  )}Controller`;

  return `import { Controller, Get, Header } from '@nestjs/common';
import { ${exportServiceFunctionName} } from '${serviceFilePath}';
import Result from 'src/utils/result';

@Controller()
export class ${targetControllerFunctionName} {
  constructor(private readonly ${serviceParam}: ${exportServiceFunctionName}) {}

  @Get('/test')
  @Header('Content-Type', 'application/json')
  test() {
    const data = this.${serviceParam}.test();
    return Result<typeof data>().success(data);
  }
}
      `;
};

module.exports = controllerTemplate;
