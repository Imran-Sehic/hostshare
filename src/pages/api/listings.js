import path from 'path';
import { promises as fs } from 'fs';

export async function readFileData() {
    const jsonDirectory = path.join(process.cwd(), 'src', 'db');
    const fileContents = await fs.readFile(jsonDirectory + '/data.json', 'utf8');
    return fileContents
}

export default async function handler(req, res) {
    const data = await readFileData();
    res.status(200).json(data);
}