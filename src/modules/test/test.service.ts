import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  test() {
    return {
      test: 'test',
    };
  }
}
