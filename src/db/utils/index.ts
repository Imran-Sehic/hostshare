import { promises as fs } from 'fs';
import path from 'path';

export async function readFileData() {
  const jsonDirectory = path.join(process.cwd(), 'src', 'db');
  const fileContents = await fs.readFile(jsonDirectory + '/data.json', 'utf8');
  return fileContents;
}
