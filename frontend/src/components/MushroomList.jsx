import MushroomListItem from "./MushroomListItem";
import "../styles/MushroomList.scss";

const MushroomList = (props) => {
  const { mushrooms, setSelectedRoute, setMushroomSelected } = props;
  return (
    <main>
      <ul className="mushroom-list">
        {mushrooms.map((mushroom) => (
          <MushroomListItem className="mushroom-list" key={mushroom.id} mushroom={mushroom} setSelectedRoute={setSelectedRoute} setMushroomSelected={setMushroomSelected} />
        ))}
      </ul>
    </main>
  );
};

export default MushroomList;