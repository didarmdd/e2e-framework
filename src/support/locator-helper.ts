import fs from 'fs';
import path from 'path';

type LocatorMap = Record<string, string>;

const mappingCache = new Map<string, LocatorMap>();

const loadMapping = (mappingName: string): LocatorMap => {
  if (mappingCache.has(mappingName)) {
    return mappingCache.get(mappingName) as LocatorMap;
  }

  const filePath = path.resolve(__dirname, `../../config/mappings/${mappingName}.json`);
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const mapping = JSON.parse(fileContents) as LocatorMap;

  mappingCache.set(mappingName, mapping);
  return mapping;
};

export const getSelector = (mappingName: string, key: string): string => {
  const mapping = loadMapping(mappingName);
  const selector = mapping[key];

  if (!selector) {
    throw new Error(`Selector not found for ${mappingName}.${key}`);
  }

  return selector;
};
