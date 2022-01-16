type Result<T> = {state: T, idx: number} | undefined

export class Iterator<T> {
  constructor(idx: number, data: Array<T>) {
    this.idx = idx-1
    this.data = data
  }

  idx: number = -1
  data: Array<T> = []

  next(): Result<T> {
    this.idx++
    if (this.idx >= this.data.length) {
      return undefined
    }
    return {state: this.data[this.idx], idx: this.idx}
  }
}
