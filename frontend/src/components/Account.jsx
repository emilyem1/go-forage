import MushroomCard from "./MushroomCard";
import {
  Card,
  CardContent,
} from "@mui/material";

const Account = (props) => {
  const { users } = props;
  return (
    <main style={{ display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column' }}>
      <Card
        sx={{
          width: '60vw',
          margin: '2% 0 0 0',
          backgroundColor: '#4D6A66',
          color: 'white'
        }}
      >
        <CardContent>
        <h1 style={{fontFamily: 'Roboto', marginLeft: '30%'}}>Forager Account</h1>
        </CardContent>
      </Card>
      <section style={{ display:'flex', width:'60vw', marginBottom:'3%', marginTop:'-1%'}}>
        <MushroomCard 
          fullname={users.fullname} 
          email={users.email} 
          profilePhoto={users.profilePhoto}
        />
        <Card
          sx={{
            width:'44vw'
          }}
        >
          <CardContent>
            Following will go here ~
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default Account;