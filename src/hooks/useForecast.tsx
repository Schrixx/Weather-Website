import { ChangeEvent, useEffect, useState } from "react"

import { forecastType, optionType } from "../types/index"

const useForecast = () => {
  const [term, setTerm] = useState<string>("")
  const [option, setOption] = useState<[]>([])
  const [city, setCity] = useState<optionType | null>(null)
  const [forecast, setForecast] = useState<forecastType | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showOptions, setShowOptions] = useState<boolean>(true)

  useEffect(() => {
    if (city) {
      setTerm(city.name)
      setOption([])
      submitOption()
    }
  }, [city])

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

  const userLocationError = () => {
    alert("Failed to obtain location data. Please allow this website to access your location and try again.")
    setIsLoading(false)
  }

  const userGeoLocation = () => {
    setIsLoading(true)
    console.log(`Started userGeoLocation: ${isLoading}`)
    navigator.geolocation.getCurrentPosition( async ({ coords }) => {
      let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=${import.meta.env.VITE_REACT_APP_API_KEY}`)
      let data = await response.json()
      const forecastData = {
        ...data.city,
        list: data.list.slice(0, 16),
      }
      setForecast(forecastData)
      setIsLoading(false)
    }, userLocationError)
  }

  const optionClickHandler = (option: optionType) => {
    setCity(option)
  }

  const submitOption = () => {
    setShowOptions(false)
    if (!city) {
      console.log("nothing in city returning")
      return
    }
    console.log("There IS something in city, getting forecast")
    getForecast(city)
  }

  return {
    option,
    term,
    forecast,
    setForecast,
    showOptions,
    onInputChange,
    optionClickHandler,
    userGeoLocation,
    isLoading,
  }
}

export default useForecast