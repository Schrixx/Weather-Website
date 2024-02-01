import { v4 as uuidv4 } from "uuid"

import { propsType, optionType } from "../types/index"

import { HiMagnifyingGlass } from "react-icons/hi2"
import { BiTargetLock } from "react-icons/bi"
import WeatherLogo from "assets/schrixxWeatherLogo.svg"
import { BiLoaderAlt } from "react-icons/bi";
import { SlLocationPin } from "react-icons/sl"
import { useEffect, useRef } from "react"


/// <reference types="vite/client" />

const Search = ({
    term,
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

  useEffect(() => {
    let handler = (e: any) => {
      if (
        optionsRef.current
        &&
        inputRef.current
        &&
        !optionsRef.current.contains(e.target)
        &&
        !inputRef.current.contains(e.target)
      ) {
        setShowOptions(false)
      }
    }

    document.addEventListener("mousedown", handler)

    return () => {
      document.removeEventListener("mousedown", handler)
    }
  })

  return (
    <div className="flex items-center justify-center mx-auto h-[100dvh] max-w-xl">
      <div className="flex flex-col items-center gap-6 justify-center px-6 py-12 sm:backdrop-blur-2xl sm:shadow-2xl rounded-2xl border-2 border-surfaceText">
        <a href="https://schrixx.com" target="_blank" className="flex flex-col justify-center items-center gap-3">
          <img src={WeatherLogo} alt="logo" className="h-24 w-auto" />
          <p className="text-5xl font-[700] text-center tracking-wide">Schrixx Weather</p>
        </a>
        <p className="text-center">Find the weather forecast of a given location!</p>
        <div className="relative w-fit flex flex-row items-center gap-4 rounded-full bg-surfaceText transition-shadow duration-300 focus-within:shadow-sm focus-within:shadow-black hover:shadow-sm hover:shadow-black p-3">
          <HiMagnifyingGlass className="h-6 w-full text-[#1D1C1F]" />
          <input ref={inputRef} type="text" value={term} onChange={onInputChange} placeholder="Location" className="bg-surfaceText outline-none text-lg placeholder-surface caret-surface text-surface" />
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
      </div>
    </div>
  )
}

export default Search
