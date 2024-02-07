import MushroomListItem from "./MushroomListItem";
import "../styles/MushroomList.scss";
import Stack from '@mui/material/Stack';
import MushroomCard from "./MushroomCard";

const MushroomList = (props) => {
  const { mushrooms, users, setSelectedRoute, setMushroomSelected } = props;
  return (
    <main>
      <div class='card'style={{ display: 'flex', marginLeft: '10%', marginTop: '1%', position: 'sticky', top: '0'}}>
      <MushroomCard 
        fullname={users.fullname} 
        email={users.email} 
        profilePhoto={users.profilePhoto} 
      />
      </div>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        marginTop="-14%"
      >
        {mushrooms.map((mushroom) => (
          <MushroomListItem className="mushroom-list" key={mushroom.id} mushroom={mushroom} setSelectedRoute={setSelectedRoute} setMushroomSelected={setMushroomSelected} />
        ))}
      </Stack>
    </main>
  );
};

export default MushroomList;