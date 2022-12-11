import { get } from '@vandeurenglenn/esm-providers'
import { readFile } from 'fs/promises'
import { sep, join } from 'path'
/** 
 * @param {string} path
 */
export default async (path, options) => {
  let parts = path.split(/\/|\\/g)
  let name
  if (parts[0].startsWith('@')) {
    name = parts.splice(0, 2).join(sep)
  } else {
    name = parts.splice(0)[0]
  }
  console.log(name);
  console.log(parts);
  parts[parts.length - 1] = parts[parts.length - 1].split('.js')[0]
  const target = parts.join(sep)
  const importInfo = await get(name)
  console.log(join(importInfo.path, importInfo.exports[target]));
  return (await readFile(join('./', importInfo.path, importInfo.exports[target]))).toString()
}