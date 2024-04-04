import "./App.css";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";

function App() {
  return (
    <div className="App">
      <CurrentWeather
        temp={"31"}
        rain={"2%"}
        humidity={"48%"}
        wind={"11 km/h"}
        weather={"Céu limpo"}
      />
    </div>
  );
}

export default App;
