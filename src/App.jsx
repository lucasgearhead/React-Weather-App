import "./App.css";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import DateTime from "./components/DateTime/DateTime";

function App() {
  return (
    <div className="app">
      <CurrentWeather
        temp={"31"}
        rain={"2%"}
        humidity={"48%"}
        wind={"11 km/h"}
        weather={"Clear"}
      />
      <DateTime time={"18:52"} city={"sorocaba"} day={"Monday"} />
    </div>
  );
}

export default App;
