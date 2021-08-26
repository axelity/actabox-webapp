export const useUniqueId = (prefix?: string): Function => {
  const uniqueId = () => {
    let s = '' 
    if (prefix) s = s.concat(prefix.trim().toLowerCase(), '_')
    s = s.concat(((new Date().getTime() / 1000) | 0).toString(16))
  
    return s.concat(
      'xxxxxxxxxxxxxxxx'
        .replace(/[x]/g, function () {
          return ((Math.random() * 16) | 0).toString(16)
        })
        .toLowerCase(),
    )
  }
  return uniqueId
}
