const oneDay = 1000 * 60 * 60 * 24

const oneHour = 1000 * 60 * 60

const oneMinute = 1000 * 60

export const calculateTimeFromToday = (date: string) => {
  const currentDate = new Date()
  const refrenceDate = new Date(date)

  const diffInMillis = Math.abs(currentDate.getTime() - refrenceDate.getTime())

  let differenceInterval = ''

  if (diffInMillis < oneHour) {
    const diffInMinutes = Math.floor(diffInMillis / oneMinute)
    differenceInterval = `${diffInMinutes} minutes`
  } else if (diffInMillis < oneDay) {
    const diffInHours = Math.floor(diffInMillis / oneHour)
    differenceInterval = `${diffInHours} hours`
  }
  const diffDays = Math.floor(diffInMillis / oneDay)
  differenceInterval = `${diffDays} days`

  return differenceInterval + ' ago'
}
