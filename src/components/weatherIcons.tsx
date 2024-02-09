import Sun from "src/assets/weatherIcons/sun.svg"
import Moon from "src/assets/weatherIcons/moon.svg"
import SunClouds from "src/assets/weatherIcons/sunClouds.svg"
import MoonClouds from "src/assets/weatherIcons/moonClouds.svg"
import ScatteredClouds from "src/assets/weatherIcons/scattered.svg"
import BrokenClouds from "src/assets/weatherIcons/brokenClouds.svg"
import Rain from "src/assets/weatherIcons/rain.svg"
import Storm from "src/assets/weatherIcons/storm.svg"
import SnowW from "src/assets/weatherIcons/snow.svg"
import Mist from "src/assets/weatherIcons/mist.svg"

export const weatherIcons = new Map([
    ["01d", Sun],
    ["01n", Moon],
    ["02d", SunClouds],
    ["02n", MoonClouds],
    ["03d", ScatteredClouds],
    ["03n", ScatteredClouds],
    ["04d", BrokenClouds],
    ["04n", BrokenClouds],
    ["09d", Rain],
    ["09n", Rain],
    ["10d", Rain],
    ["10n", Rain],
    ["11d", Storm],
    ["11n", Storm],
    ["13d", SnowW],
    ["13n", SnowW],
    ["50d", Mist],
    ["50n", Mist],
])
