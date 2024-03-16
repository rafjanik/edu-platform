import { Injectable } from '@nestjs/common';
import { InjectConfig } from 'nestjs-config';
import * as path from 'path';

@Injectable()
export class StoreProvider {
  constructor(@InjectConfig() private readonly config) {}

  storageLocation() {
    return path.join(__dirname, '../../storage');
  }
}
