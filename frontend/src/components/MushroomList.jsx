import MushroomListItem from "./MushroomListItem";
import "../styles/MushroomList.scss";

const MushroomList = (props) => {
  const { mushrooms } = props;
  return (
    <main>
      <ul className="mushroom-list">
        {mushrooms.map((mushroom) => (
          <MushroomListItem className="mushroom-list" key={mushroom.id} mushroom={mushroom} />
        ))}
      </ul>
    </main>
  );
};

export default MushroomList;