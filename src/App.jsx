import "./App.css";
import PetCard from "./components/PetCard";
import Header from "./containers/header/Header";
import HeroSection from "./containers/hero/HeroSection";
function App() {
  return (
    <>
      <div>
        <Header />
        <HeroSection />

        <PetCard title="Olá" text="8 anos, vira-lata" image="" />
      </div>
    </>
  );
}

export default App;
