import "./PetCard.css";

const PetCard = ({ title, text, image }) => {
  return (
    <div className="card-container">
      <img className="card-img" src={image} alt={`Foto de ${title}`} />
      <div className="card-content">
        <p className="card-line">
          <strong>Nome:</strong> {title}
        </p>
        <p className="card-line">
          <strong>Idade:</strong> {text.split(",")[0]}
        </p>
        <p className="card-line">
          <strong>Raça:</strong> {text.split(",")[1]}
        </p>
        <button className="card-button">Saiba mais</button>
      </div>
    </div>
  );
};

export default PetCard;
