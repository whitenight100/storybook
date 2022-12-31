import fs from 'fs';
import path from 'path';
import _ from 'lodash';

export async function getThemeBlocks(): Promise<ThemeExtensionBlock[]> {
  const blocksDir = path.join(process.cwd(), './ext/theme-app-extension/blocks');
  const files = await fs.promises.readdir(blocksDir);
  return files.map(getBlockFromFile);
}

export function getThemeBlocksSync(): ThemeExtensionBlock[] {
  const blocksDir = path.join(process.cwd(), './ext/theme-app-extension/blocks');
  const files = fs.readdirSync(blocksDir);
  return files.map(getBlockFromFile);
}

function getBlockFromFile(fileName: string): ThemeExtensionBlock {
  const fileNameNoExt = fileName.replace(/\.liquid?$/, '');
  return {
    name: _.startCase(fileNameNoExt),
    slug: _.snakeCase(fileNameNoExt),
    fileName: fileName,
  };
}
