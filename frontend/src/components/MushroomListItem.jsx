import "../styles/MushroomListItem.scss";

const MushroomListItem = (props) => {
  const { mushroom } = props;

  return (
    <section className="mushroom-list__item">
      <img
        className="mushroom-list__image"
        src={`images/${mushroom.image}`}
        alt={mushroom.name}
      />
      <p>Name: {mushroom.name}</p>
      <p>Info: {mushroom.info}</p>
      <p>Edible? {mushroom.edible ? "Yes" : "No"}</p>
    </section>
  );
};

export default MushroomListItem;