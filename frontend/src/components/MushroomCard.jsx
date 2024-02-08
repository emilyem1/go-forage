import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const MushroomCard = (props) => {
  const { fullname, profilePhoto, email } = props;
  const [icons, setIcons] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8001/api/icons?email=${email}`);
        const data = await response.json();
        setIcons(data);
      } catch (error) {
        console.error('Error fetching icon data:', error);
      }
    };
    fetchData();
  }, [email]);

  return (
  <Card sx={{ display: "inline-block" , padding: "1%", backgroundColor: '#4D6A66'}}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="210"
        image={profilePhoto}
        alt="profile photo"
      />
      <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding:'5% 0 0 0'}}>
        <p style={{ fontFamily: 'Roboto', fontWeight: '600', fontSize: '2.4em', margin: '0', color: 'white'}}>STAMPS</p>
        <Typography variant="body2" color="text.secondary" style={{ padding: '1%', width: '80%' }}>
          <ul style={{ paddingLeft: "0"}}>
            {icons.map((icon) => (
              <img
              style={{ width:"2em", backgroundColor:"white", marginLeft:"3%", padding:"5%", borderRadius:"35%" }}
              src={`images/${icon.icon}`}
              />
            ))}
          </ul>
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
  );
};

export default MushroomCard;