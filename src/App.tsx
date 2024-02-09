import Forecast from "./components/Forecast";
import Search from "./components/Search";
import useForecast from "./hooks/useForecast";

/// <reference types="vite/client" />

const App = (): JSX.Element => {

  const {
    option,
    search,
    forecast,
    onInputChange,
    optionClickHandler,
    isLoading,
    showOptions,
    setShowOptions,
    userGeoLocation,
  } = useForecast()

  return (
    <>
      { forecast ? 
      <Forecast
      search={search} isLoading={isLoading}
      option={option} forecastData={forecast}
      onInputChange={onInputChange}
      setShowOptions={setShowOptions}
      showOptions={showOptions}
      optionClickHandler={optionClickHandler}
      userGeoLocation={userGeoLocation}
      />
      :
      <Search
      search={search} option={option}
      onInputChange={onInputChange}
      isLoading={isLoading}
      setShowOptions={setShowOptions}
      showOptions={showOptions}
      optionClickHandler={optionClickHandler}
      userGeoLocation={userGeoLocation}
      />
      }
    </>
  )
}

export default App
