import { useEffect, useState } from 'react'

/** Live UTC timestamp for the SYS bar — updates every second. */
export function useLiveUtcStamp(withSeconds = true) {
  const format = () => {
    const iso = new Date().toISOString()
    const date = iso.slice(0, 10)
    const time = withSeconds ? iso.slice(11, 19) : iso.slice(11, 16)
    return `${date} ${time}`.toUpperCase()
  }

  const [stamp, setStamp] = useState(format)

  useEffect(() => {
    setStamp(format())
    const id = window.setInterval(() => setStamp(format()), 1000)
    return () => window.clearInterval(id)
  }, [withSeconds])

  return stamp
}
