import { propsType, forecastType } from "../types/index"
import { optionType } from "../types/index"

import { v4 as uuidv4 } from "uuid"

import { HiMagnifyingGlass } from "react-icons/hi2"
import { BiLoaderAlt, BiTargetLock } from "react-icons/bi"
import { SlLocationPin } from "react-icons/sl"
import SchrixxLogo from "assets/schrixxLogo.svg"
import Sun from "assets/weatherIcons/sunny.png"
import { useRef } from "react"
import { useClickOutside } from "src/hooks/useClickOutside"
 
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

  const { list: { 0: { main: currentTemps, weather: { main: currentWeather } } } } = forecastData

  return (
    <>
      <section className="mt-8 flex justify-around w-full">
        <a target="_blank" href="https://schrixx.com" className="flex items-center gap-2">
          <img src={SchrixxLogo} alt="logo" className="h-14 w-auto" />
          <span className="tracking-widest text-3xl">Schrixx</span>
        </a>
        <div className="relative w-fit flex flex-row items-center gap-4 rounded-full bg-surfaceText transition-shadow duration-300 focus-within:shadow-sm focus-within:shadow-black hover:shadow-sm hover:shadow-black p-3">
          <HiMagnifyingGlass className="h-6 w-full text-[#1D1C1F]" />
          <input ref={inputRef} type="text" value={search} onChange={onInputChange} placeholder="Location" className="bg-surfaceText outline-none text-lg placeholder-surface caret-surface text-surface" />
          <ul ref={optionsRef} className={`${showOptions ? "absolute" : "hidden"} top-14 left-11 bg-surface ml-1 rounded-b-md`}>
            {option.map((option: optionType) => (
              <li key={uuidv4()} className="group">
                <button className="w-full flex gap-2 items-center cursor-pointer hover:bg-surfaceOutline p-2 group-last:rounded-b-md" onClick={() => {optionClickHandler(option)}}>
                  <SlLocationPin className="text-surfaceTextDark text-2xl"/>
                  <div className="flex flex-col items-start justify-center w-full">
                    <span className="text-base">{option.name}, {option.state}</span>
                    <span className="text-surfaceTextDark text-sm">{option.country}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button onClick={userGeoLocation} className="flex flex-row gap-2 items-center hover:bg-surfaceOutline bg-surface transition-colors duration-300 p-3 rounded-full">
          { isLoading ? <BiLoaderAlt color="#EAE6F2" className="animate-spin" /> : <BiTargetLock /> }
          { isLoading ? null : <span className="text-lg">Current Location</span> }
        </button>
      </section>

      <section className="flex mt-24 w-fit backdrop-blur-2xl p-10 rounded-lg">
        <div className="flex gap-1">
          <img src={Sun} alt={currentWeather} className="h-12 w-auto" />
          <div>
            <p>{currentTemps.temp}</p>
            <span>&deg;C</span>
          </div>
        </div>
        <div className="h-auto w-1 bg-surfaceText rounded-lg" />
        <div className="grid">
          data
        </div>
      </section>
    </>
  )
}

export default Forecast