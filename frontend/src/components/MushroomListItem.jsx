import Collapse from '@mui/material/Collapse';
import { useState } from "react";
import { Box, Tooltip, tooltipClasses, styled, Card } from "@mui/material";

const MushroomListItem = (props) => {
  const { mushroom, setMushroomSelected, setSelectedRoute } = props;
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  // will implement this in a 'read more'
  const handleClick = () => {
    setMushroomSelected(mushroom)
    setSelectedRoute("MUSHROOMDETAILS");
  };
  const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#4D6A66",
      color: "#e6e6dd",
      boxShadow: theme.shadows[1],
      fontSize: 30,
      fontFamily: "DM Sans",
      fontWeight: "bold"
    },
  }));

  return (
    <Box
      sx={{          
        '& > :not(style)': {
        width: 550,
        marginBottom: 1
      },}}
      onClick={handleChange}
    >
      <div>
        <Collapse 
          in={checked} 
          collapsedSize={250} 
        >
          <div>
          <CustomTooltip 
            disableFocusListener 
            disableTouchListener 
            title={mushroom.name}
            placement="right-start"
            >
            <img
              style={{width: '100%', height: 'auto', objectFit: 'cover'}}
              src={`images/${mushroom.image}`}
              alt={mushroom.name}
            />
          </CustomTooltip>
          <Card sx={{}}>
            <h1 style={{ backgroundColor: '#4D6A66', padding:'1%', color:'#e6e6dd', marginTop:'0', fontFamily: "DM Sans"}}>{mushroom.name}</h1>
            <div style={{fontFamily: "DM Sans", fontSize: '1em', padding: '0 5%'}}>
              <p>{mushroom.info}</p>
              <p>Edible: {mushroom.edible ? "Yes" : "No"}</p>
              <img
                style={{ width: '22px' }}
                className="mushroom-list__image"
                src={`images/${mushroom.icon}`}
              />
            </div>
          </Card>
         </div>
        </Collapse>
      </div>
    </Box>
  );
};

export default MushroomListItem;