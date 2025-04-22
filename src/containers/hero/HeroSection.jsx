import "./HeroSection.css";
import petImage from "../../assets/dog.png";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-row">
          <img src={petImage} alt="Cachorro fofo" className="hero-img" />
          <div className="hero-text">
            <h1>Bem-vindo ao PetMatch!</h1>
            <p>Conectando você ao seu novo melhor amigo.</p>
            <button>Ver pets</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
