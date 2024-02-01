import { ChangeEvent, useEffect, useState } from "react"

import useDebounce from "./useDebounce"
import { forecastType, optionType } from "../types/index"

const useForecast = () => {
  const [search, setSearch] = useState<string>("")
  // const debouncedSearch = useDebounce(search)
  const [option, setOption] = useState<[]>([])
  const [city, setCity] = useState<optionType | null>(null)
  const [forecast, setForecast] = useState<forecastType | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showOptions, setShowOptions] = useState<boolean>(true)

  useEffect(() => {
    if (city) {
      setSearch(city.name)
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
    if (showOptions === false) setShowOptions(true)

    const location = e.target.value.trim()
    setSearch(useDebounce(location))

    if (e.target.value === "") return
    findLocations(useDebounce(location))
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
    search,
    forecast,
    setForecast,
    showOptions,
    setShowOptions,
    onInputChange,
    optionClickHandler,
    userGeoLocation,
    isLoading,
  }
}

export default useForecast