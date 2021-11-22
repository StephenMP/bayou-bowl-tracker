export function truncate(str: string, length: number) {
  if (str.length > length) {
    return `${str.substring(0, length - 3)}...`
  }

  return str
}

export function sortIgnoreCase(a: string, b: string) {
  return Intl.Collator().compare(a, b)
}
