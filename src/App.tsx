import { ChangeEvent, useState } from "react";
import { NavLink } from "react-router-dom";

import { HiMagnifyingGlass } from "react-icons/hi2";
import { BiTargetLock } from "react-icons/bi";
import Logo from "assets/logo.svg"

/// <reference types="vite/client" />

function App() {
  const [term, setTerm] = useState<string>("")

  const findLocations = (location: string) => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location.trim()}&limit=5&appid=${import.meta.env.VITE_REACT_APP_API_KEY}`)
    .then(res => res.json())
    .then(data => console.log({data}))
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    const location = e.target.value.trim()
    setTerm(location)

    if (e.target.value === "") return
    findLocations(location)
  }

  return (
    <div className="mt-8 flex flex-row justify-around">
      <NavLink to="https://schrixx.com" target="_blank" className="flex flex-row gap-1 items-center">
        <img src={Logo} alt="logo" className="h-14 w-auto" />
        <span className="text-3xl tracking-wider">Schrixx</span>
      </NavLink>

      <div className="w-fit flex flex-row items-center gap-4 rounded-full bg-surface transition-shadow duration-300 focus-within:shadow-md focus-within:shadow-black hover:shadow-md hover:shadow-black p-3">
        <span><HiMagnifyingGlass className="h-6 w-full" /></span>
        <input type="text" value={term} onChange={onInputChange} placeholder="Location" className="bg-surface outline-none text-lg" />
      </div>

      <button className="flex flex-row gap-2 items-center hover:bg-primaryHover bg-primary transition-colors duration-300 p-4 rounded-full">
        <BiTargetLock />
        <span>Current Location</span>
      </button>
    </div>
  )
}

export default App
