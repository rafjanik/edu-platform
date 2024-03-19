import * as path from 'path';
import { v4 as uuid } from 'uuid';
import * as mime from 'mime';

export function storageLocation() {
  return path.join(__dirname, '../../storage');
}

export function uploadFileName(file: any) {
  return `i-${uuid()}.${(mime as any).extensions[file.mimetype]}`;
}
