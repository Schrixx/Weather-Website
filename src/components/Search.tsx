import { v4 as uuidv4 } from "uuid"

import { propsType, optionType } from "../types/index"

import { HiMagnifyingGlass } from "react-icons/hi2"
import { BiTargetLock } from "react-icons/bi"
import WeatherLogo from "assets/schrixxWeatherLogo.svg"
import { BiLoaderAlt } from "react-icons/bi";
import { SlLocationPin } from "react-icons/sl"
import { useRef } from "react"
import { useClickOutside } from "src/hooks/useClickOutside"


/// <reference types="vite/client" />

const Search = ({
    search,
    option,
    showOptions,
    setShowOptions,
    onInputChange,
    optionClickHandler,
    isLoading,
    userGeoLocation,
}: propsType): JSX.Element => {
  const optionsRef = useRef<HTMLUListElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleCloseMenu = () => {
    setShowOptions(false)
  }

  useClickOutside(optionsRef, inputRef, handleCloseMenu)

  return (
    <section className="flex justify-center items-center h-[100dvh] w-full overflow-y-hidden">
      <div className="flex items-center justify-center text-center h-[100dvh] md:h-[500px] w-full md:max-w-[500px] bg-white/20 backdrop-blur-0 shadow-2xl md:rounded-2xl">
        <div className="flex flex-col items-center justify-center gap-6 xs:px-6 py-12">
          <a href="https://schrixx.com" target="_blank" className="flex flex-col justify-center items-center gap-3">
            <img src={WeatherLogo} alt="logo" className="h-16 lg:h-24 w-auto" />
            <p className="text-5xl font-[700] text-text text-center tracking-wide text-white">Schrixx Weather</p>
          </a>
          <p className="text-center font-medium text-white">Find the weather forecast of a given city!</p>
          <div className="relative w-fit flex flex-row items-center gap-4 rounded-full bg-white transition-shadow duration-300 focus-within:shadow-sm focus-within:shadow-black hover:shadow-sm hover:shadow-black p-3">
            <HiMagnifyingGlass className="h-6 w-full text-[#1D1C1F]" />
            <input ref={inputRef} type="text" value={search} onChange={onInputChange} placeholder="City" className="bg-white outline-none text-lg placeholder-surface caret-surface text-surface" />
            <ul ref={optionsRef} className={`${showOptions ? "absolute z-10" : "hidden"} top-14 left-0 bg-surface ml-1 rounded-b-md h-[80px] menuHeightSm:h-[170px] menuHeightMd:h-[260px] menuHeightLg:h-fit overflow-y-auto`}>
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
          <button onClick={userGeoLocation} className="flex flex-row gap-2 items-center hover:bg-surfaceOutline bg-surface transition-colors duration-300 p-3 rounded-full">
            { isLoading ? <BiLoaderAlt color="#EAE6F2" className="animate-spin" /> : <BiTargetLock color="white" /> }
            { isLoading ? null : <span className="text-lg text-white">Current Location</span> }
          </button>
        </div>
      </div>
    </section>
  )
}

export default Search
