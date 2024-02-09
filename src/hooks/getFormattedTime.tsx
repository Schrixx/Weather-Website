export default function getFormattedTime (unixTime: number, locale = "en-US"): string {
    // multiply by 1000 to convert seconds to milliseconds
    const date = new Date(unixTime * 1000)
    const options: Intl.DateTimeFormatOptions = { hour: "numeric", minute: "numeric" }
    return new Intl.DateTimeFormat(locale, options).format(date)
}