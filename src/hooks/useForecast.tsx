import { ChangeEvent, useEffect, useState } from "react"

import { forecastType, optionType } from "../types/index"

const useForecast = () => {
  const [term, setTerm] = useState<string>("")
  const [option, setOption] = useState<[]>([])
  const [city, setCity] = useState<optionType | null>(null)
  const [forecast, setForecast] = useState<forecastType | null>(null)

  useEffect(() => {
    console.log("Option Effect Change: ")
    console.log(option)
  }, [option])

  useEffect(() => {
    console.log("Forecast: ")
    console.log(forecast)
  }, [forecast])

  const findLocations = (location: string) => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location.trim()}&limit=5&appid=${import.meta.env.VITE_REACT_APP_API_KEY}`)
    .then(res => res.json())
    .then(data => {
      console.log("Option:")
      console.log(data)
      setOption(data)
    })
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    const location = e.target.value.trim()
    setTerm(location)

    if (e.target.value === "") return
    findLocations(location)
  }

  const getForecast = (city: optionType) => {
    if (forecast) {
      fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${import.meta.env.VITE_REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        const forecastData = {
          ...data.city,
          list: data.list.slice(0, 16),
        }
        setForecast(forecastData)
      })
    }
  }

  const onSubmit = () => {
    if (!city) return

    getForecast(city)
  }

  function onOptionSelect(option: optionType) {
    setCity(option)
  }

  useEffect(() => {
    if (city) {
      setTerm(city.name)
      setOption([])
    }
  }, [city])

  return {
    option,
    term,
    forecast,
    onSubmit,
    onInputChange,
    onOptionSelect,
  }
}

export default useForecast