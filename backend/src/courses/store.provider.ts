import { Injectable } from '@nestjs/common';
import * as path from 'path';

@Injectable()
export class StoreProvider {
  storageLocation() {
    console.log(path.join(__dirname, './storage'));
    return path.join(__dirname, './storage');
  }
}
