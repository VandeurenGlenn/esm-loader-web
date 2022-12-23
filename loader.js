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
  
  if (parts[parts.length - 1].includes('.js')) {
    parts[parts.length - 1] = parts[parts.length - 1].split('.js')[0]
  } else if (parts[parts.length - 1].includes('.ts')) {
    parts[parts.length - 1] = parts[parts.length - 1].split('.ts')[0]
  }
    
  const target = parts.join(sep)
  const importInfo = await get(name)
  return (await readFile(join('./', importInfo.path, importInfo.exports[target]))).toString()
}