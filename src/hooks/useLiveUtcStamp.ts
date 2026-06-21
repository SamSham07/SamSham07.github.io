import { useEffect, useState } from 'react'

function pad(value: number) {
  return value.toString().padStart(2, '0')
}

function formatTimezoneOffset(date: Date) {
  const offsetMinutes = -date.getTimezoneOffset()
  const sign = offsetMinutes >= 0 ? '+' : '-'
  const absoluteMinutes = Math.abs(offsetMinutes)
  const hours = Math.floor(absoluteMinutes / 60)
  const minutes = absoluteMinutes % 60

  return `UTC${sign}${pad(hours)}:${pad(minutes)}`
}

/** Live local timestamp for the SYS bar; updates every second. */
export function useLiveUtcStamp(withSeconds = true) {
  const format = () => {
    const now = new Date()
    const date = [
      now.getFullYear(),
      pad(now.getMonth() + 1),
      pad(now.getDate()),
    ].join('-')
    const time = [
      pad(now.getHours()),
      pad(now.getMinutes()),
      ...(withSeconds ? [pad(now.getSeconds())] : []),
    ].join(':')

    return `${date} ${time} ${formatTimezoneOffset(now)}`.toUpperCase()
  }

  const [stamp, setStamp] = useState(format)

  useEffect(() => {
    setStamp(format())
    const id = window.setInterval(() => setStamp(format()), 1000)
    return () => window.clearInterval(id)
  }, [withSeconds])

  return stamp
}
