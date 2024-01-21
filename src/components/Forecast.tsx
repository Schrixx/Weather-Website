import { forecastType } from "../types/index"

type Props = {
  forecastData: forecastType,
}

const Forecast = ({ forecastData }: Props): JSX.Element => {

  return (
    <div>{forecastData.country}</div>
  )
}

export default Forecast