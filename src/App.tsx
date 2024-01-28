import Forecast from "./components/Forecast";
import Search from "./components/Search";
import useForecast from "./hooks/useForecast";

/// <reference types="vite/client" />

const App = (): JSX.Element => {

  const {
    option,
    term,
    forecast,
    onInputChange,
    optionClickHandler,
    isLoading,
    showOptions,
    userGeoLocation,
  } = useForecast()

  return (
    <>
      { forecast ? 
      <Forecast
      term={term} isLoading={isLoading}
      option={option} forecastData={forecast}
      onInputChange={onInputChange}
      showOptions={showOptions}
      optionClickHandler={optionClickHandler}
      userGeoLocation={userGeoLocation}
      />
      :
      <Search
      term={term} option={option}
      onInputChange={onInputChange}
      isLoading={isLoading}
      showOptions={showOptions}
      optionClickHandler={optionClickHandler}
      userGeoLocation={userGeoLocation}
      />
      }
    </>
  )
}

export default App
