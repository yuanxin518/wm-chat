import { Controller, Get, Header } from '@nestjs/common';
import { TestService } from './test.service';
import Result from 'src/utils/result';

@Controller()
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get('/test')
  @Header('Content-Type', 'application/json')
  test() {
    const data = this.testService.test();

    return Result<typeof data>().success(data);
  }
}
