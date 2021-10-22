
export function isDST(isoDateTime: Date | string) {
    let d = new Date()
    if(typeof isoDateTime === 'string'){
        d = new Date(isoDateTime)
    }
    else {
        d = isoDateTime
    }

    let jan = new Date(d.getFullYear(), 0, 1).getTimezoneOffset();
    let jul = new Date(d.getFullYear(), 6, 1).getTimezoneOffset();
    return Math.max(jan, jul) != d.getTimezoneOffset(); 
}

export function isCurrentlyDST() {
    return isDST(new Date())
}

export function parseTimeFromDate(date: Date) {
    const isDst = isCurrentlyDST()
    let hour = date.getHours()
    const amPm = hour >= 12 ? 'pm' : 'am'
    let min: string | number = date.getMinutes()
  
    hour = hour % 12;
    hour = hour ? hour : 12
    min = min < 10 ? '0' + min : min
  
    if(isDst) {
      hour++
    }
  
    return `${hour}:${min} ${amPm} ${Intl.DateTimeFormat().resolvedOptions().timeZone}`
  }