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
    <Card>
    <CardActionArea>
      <CardMedia
            component="img"
            height="90"
            image={profilePhoto}
            alt="profile photo"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {fullname}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <ul>
            {icons.map((icon) => (
              <img
              style={{ width: '22px' }}
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