import MushroomListItem from "./MushroomListItem";
import "../styles/MushroomList.scss";
import Stack from '@mui/material/Stack';
import MushroomCard from "./MushroomCard";

const MushroomList = (props) => {
  const { mushrooms, users, setSelectedRoute, setMushroomSelected } = props;
  return (
    <main>
      <div class='card'style={{ display: 'inline-block', marginLeft: '-70%', marginTop: '3%', position: 'sticky', top: '0', width: '20%'}}>
      <MushroomCard 
        fullname={users.fullname} 
        email={users.email} 
        profilePhoto={users.profilePhoto} 
        style={{ }}
      />
      </div>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        marginTop="-30.1%"
      >
        {mushrooms.map((mushroom) => (
          <MushroomListItem className="mushroom-list" key={mushroom.id} mushroom={mushroom} setSelectedRoute={setSelectedRoute} setMushroomSelected={setMushroomSelected} />
        ))}
      </Stack>
    </main>
  );
};

export default MushroomList;