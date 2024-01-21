import Forecast from "./components/Forecast";
import Search from "./components/Search";
import useForecast from "./hooks/useForecast";

/// <reference types="vite/client" />

const App = (): JSX.Element => {

  const {
    option,
    term,
    forecast,
    onSubmit,
    onInputChange,
    onOptionSelect,
  } = useForecast()

  return (
    <>
      { forecast ? 
      <Forecast forecastData={forecast} />
      :       
      <Search
      term={term}
      onInputChange={onInputChange}
      onSubmit={onSubmit} option={option}
      onOptionSelect={onOptionSelect}
      />
      }
    </>
  )
}

export default App
