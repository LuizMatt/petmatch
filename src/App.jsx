import "./App.css";
import PetCard from "./components/PetCard";
import Header from "./containers/header/Header";
function App() {
  return (
    <>
      <div>
        <Header />
        <PetCard
          title="Olá"
          text="8 anos, vira-lata"
          image=""
        />
      </div>
    </>
  );
}

export default App;
