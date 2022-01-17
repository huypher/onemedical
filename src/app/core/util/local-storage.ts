import {ttl} from '../../constant'

export function saveLocalStorageWithExpire(key: string, value: string) {
  if (value === '') {
    return
  }
  const now = new Date()
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  }
  localStorage.setItem(key, JSON.stringify(item))
}

export function getLocalStorage(key: string): string {
  const itemStr = localStorage.getItem(key)
  if (!itemStr) {
    return ''
  }
  const item = JSON.parse(itemStr)
  const now = new Date()
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key)
    return ''
  }
  return item.value
}
