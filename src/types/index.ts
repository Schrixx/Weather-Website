import { ChangeEvent, Dispatch, SetStateAction } from "react"

export type optionType = {
    name: string,
    lat: number,
    lon: number,
    country: string,
    state: string,
}

export type propsType = {
    term: string,
    option: [],
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
    isLoading: boolean,
    optionClickHandler: (option: optionType) => void
    userGeoLocation: () => void,
    showOptions: boolean,
    setShowOptions: Dispatch<SetStateAction<boolean>>
}

export type forecastType = {
    name: string,
    country: string,
    sunrise: number,
    sunset: number,
    
    list: [{
        //daytime
        dt: number,
        main: {
            feels_like: number,
            humidity: number,
            pressure: number,
            temp: number,
            temp_max: number,
            temp_min: number,
        },
        weather: {
            main: string,
            icon: string,
            description: string,
        },
        wind: {
            speed: number,
            gust: number,
            deg: number,
        },
        clouds: {
            all: number
        },
        pop: number,
        visibility: number,
    }]
}
