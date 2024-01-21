import { ChangeEvent } from "react"

import { v4 as uuidv4 } from "uuid"

import { optionType } from "../types/index"

import { HiMagnifyingGlass } from "react-icons/hi2"
import { BiTargetLock } from "react-icons/bi"
import WeatherLogo from "assets/weatherLogo.svg"


/// <reference types="vite/client" />

type Props = {
    term: string,
    option: [],
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
    onOptionSelect: (option: optionType) => void,
    onSubmit: () => void
}

const Search = ({
    term,
    option,
    onSubmit,
    onInputChange,
    onOptionSelect,
}: Props): JSX.Element => {

  return (
    // <div className="mt-8 flex flex-row justify-around">
    //   <NavLink to="https://schrixx.com" target="_blank" className="flex flex-row gap-1 items-center">
    //     <img src={Logo} alt="logo" className="h-14 w-auto" />
    //     <span className="text-3xl tracking-wider">Schrixx</span>
    //   </NavLink>




    // </div>
    <>
      <div className="flex flex-col items-center gap-6 justify-center h-[100dvh] max-w-xl mx-auto">
        <a href="https://schrixx.com" target="_blank" className="flex flex-col justify-center items-center gap-3">
          <img src={WeatherLogo} alt="logo" className="h-24 w-auto" />
          <span className="text-5xl font-[700]">Schrixx Weather</span>
        </a>
        <span className="">Find the current weather forecast of a location!</span>
        <div className="relative w-fit flex flex-row items-center gap-4 rounded-full bg-surface transition-shadow duration-300 focus-within:shadow-md focus-within:shadow-black hover:shadow-md hover:shadow-black p-3">
          <button onClick={onSubmit}><HiMagnifyingGlass className="h-6 w-full" /></button>
          <input type="text" value={term} onChange={onInputChange} placeholder="Location" className="bg-surface outline-none text-lg" />
          <ul className="absolute top-14 left-11 bg-surface ml-1 rounded-b-md">
            {option.map((option: optionType) => (
              <li key={uuidv4()} className="group">
                <button className="w-full cursor-pointer hover:bg-surfaceOutline p-2 group-last:rounded-b-md" onClick={() => onOptionSelect(option)}>{option.name}, {option.country}</button>
              </li>
            ))}
          </ul>
        </div>
        <button className="flex flex-row gap-2 items-center hover:bg-primaryHover bg-primary transition-colors duration-300 p-3 rounded-full">
          <BiTargetLock />
          <span className="text-lg">Current Location</span>
        </button>
      </div>
    </>
  )
}

export default Search
