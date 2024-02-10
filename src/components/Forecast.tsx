import { propsType, forecastType } from "../types/index"
import { optionType } from "../types/index"

import { v4 as uuidv4 } from "uuid"

import { HiMagnifyingGlass } from "react-icons/hi2"
import { BiLoaderAlt, BiTargetLock } from "react-icons/bi"
import { SlLocationPin } from "react-icons/sl"
import SchrixxLogo from "assets/schrixxLogo.svg"
import { useRef } from "react"
import { useClickOutside } from "src/hooks/useClickOutside"
import getFormattedTime from "src/hooks/getFormattedTime"
import { weatherIcons } from "src/components/weatherIcons"
 
interface forecastProps extends propsType {
  forecastData: forecastType
}

const Forecast = ({
  forecastData,
  search,
  onInputChange,
  option,
  showOptions,
  setShowOptions,
  optionClickHandler,
  isLoading,
  userGeoLocation
}: forecastProps): JSX.Element => {
  const optionsRef = useRef<HTMLUListElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleCloseMenu = () => {
    setShowOptions(false)
  }

  useClickOutside(optionsRef, inputRef, handleCloseMenu)

  const { country, name, sunrise, sunset, list, list: { 0: { dt_txt, main: currentTemps, wind, weather: [{ main: currentWeather, icon }] } } } = forecastData

  return (
    <>
      <section className="mt-8 flex flex-col items-center gap-3 forecast:gap-0 forecast:flex-row forecast:justify-around w-full">
        <a target="_blank" href="https://schrixx.com" className="hidden forecast:flex items-center gap-2">
          <img src={SchrixxLogo} alt="logo" className="h-14 w-auto" />
          <span className="tracking-widest text-3xl text-surfaceText">Schrixx</span>
        </a>
        <div className="relative w-fit flex flex-row items-center gap-4 rounded-full bg-white transition-shadow duration-300 focus-within:shadow-sm focus-within:shadow-black hover:shadow-sm hover:shadow-black p-3">
          <HiMagnifyingGlass className="h-6 w-full text-[#1D1C1F]" />
          <input ref={inputRef} type="text" value={search} onChange={onInputChange} placeholder="Location" className="bg-white outline-none text-lg placeholder-surface caret-surface text-surface" />
          <ul ref={optionsRef} className={`${showOptions ? "absolute z-10" : "hidden"} top-14 left-0 bg-surface ml-1 rounded-b-md`}>
            {option.map((option: optionType) => (
              <li key={uuidv4()} className="group">
                <button className="w-full flex gap-2 items-center cursor-pointer hover:bg-surfaceOutline p-2 group-last:rounded-b-md" onClick={() => {optionClickHandler(option)}}>
                  <SlLocationPin className="text-surfaceTextDark text-2xl"/>
                  <div className="flex flex-col items-start justify-center w-full">
                    <span className="text-base text-surfaceText">{option.name}, {option.state}</span>
                    <span className="text-surfaceTextDark text-sm">{option.country}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button onClick={userGeoLocation} className="flex flex-row gap-2 items-center hover:bg-surfaceOutline bg-surface transition-colors w-fit duration-300 p-3 forecast:px-3 rounded-full">
          { isLoading ? <BiLoaderAlt color="#EAE6F2" className="animate-spin" /> : <BiTargetLock color="white" className="h-4 forecast:h-5 w-auto" /> }
          { isLoading ? null : <span className="text-base forecast:text-lg text-white">Current Location</span> }
        </button>
      </section>

      <section className="flex flex-col w-fit mx-auto mt-12 forecast:mt-24 forecastSm:px-4">
        <div className="mb-2 w-full flex flex-col items-center forecast:block forecast:w-fit">
          <p className="text-white text-4xl font-semibold">{name}, {country}</p>
          <p className="flex gap-2 text-white text-xl font-light">
            {Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(dt_txt))}
            <span>{dt_txt.slice(8, 10)},</span>
            <span>{dt_txt.slice(0, 4)}</span>
          </p>
        </div>
        <div className="flex flex-col items-center forecast:items-stretch forecast:flex-row gap-5 bg-white/20 backdrop-blur-2xl p-10 rounded-lg">
          <div className="flex gap-5 items-center justify-center">
            <img src={weatherIcons.get(icon)} alt={currentWeather} className="h-36 w-auto" />
            <div className="flex flex-col">
              <div className="flex">
                <p className="w-fit text-8xl">{Math.round(currentTemps.temp)}</p>
                <p className="text-xl font-[600]">&deg;F</p>
              </div>
              <p className="text-white ml-2">{currentWeather}</p>
            </div>
          </div>
          <div className="hidden forecast:block h-auto w-1 bg-white rounded-lg" />
          <div className="grid grid-rows-2 gap-8">
            <div className="flex gap-8">
              <div>
                <p className="flex text-2xl font-[500]">{Math.round(currentTemps.temp_max)}<span className="text-sm font-[600]">&deg;F</span></p>
                <p className="text-white">High</p>
              </div>
              <div>
                <p className="text-2xl font-[500]">{Math.round(wind.speed)}<span className="text-lg">mph</span></p>
                <p className="text-white">Wind</p>
              </div>
              <div>
                <p className="text-2xl font-[500]">{getFormattedTime(sunrise)}</p>
                <p className="text-white">Sunrise</p>
              </div>
            </div>
            <div className="flex gap-8">
              <div>
                <p className="flex text-2xl font-[500]">{Math.round(currentTemps.temp_min)}<span className="text-sm font-[600]">&deg;F</span></p>
                <p className="text-white">Low</p>
              </div>
              <div>
                <p className="flex text-2xl font-[500]">{Math.round(currentTemps.humidity)}<span className="text-2xl font-[500]">%</span></p>
                <p className="text-white mt-1 text-sm sm:text-base">Humidity</p>
              </div>
              <div>
                <p className="text-2xl font-[500]">{getFormattedTime(sunset)}</p>
                <p className="text-white">Sunset</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      
      <section className="max-w-4xl mt-12 forecast:mt-24 mx-auto px-4">
        <p className="text-white text-2xl font-semibold">Today's Weather</p>
        <div className="flex items-center overflow-x-auto pb-8 pt-8 px-3 gap-6">
          {list.map((item) => (
            <div key={uuidv4()} className="rounded-xl lg:hover:scale-110 lg:transition-transform flex flex-col items-center text-center gap-3 py-4 px-12 bg-white/20 backdrop-blur-2xl">
              <p className="text-xl font-[500]">{getFormattedTime(item.dt)}</p>
              <img
                alt={item.weather[0].description}
                src={weatherIcons.get(item.weather[0].icon)}
                className="h-14 w-auto"
              />
              <p className="text-xl font-[500]">{Math.round(item.main.temp)}&deg;F</p>
            </div>
          ))}
        </div>
      </section>
      <div className="mt-10" />
    </>
  )
}

export default Forecast