import Collapse from '@mui/material/Collapse';
import { useState } from "react";
import { Box, Tooltip, tooltipClasses, styled, Card, Button } from "@mui/material";

const MushroomListItem = (props) => {
  const { mushroom, setMushroomSelected, setSelectedRoute } = props;
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  const handleClick = () => {
    setMushroomSelected(mushroom)
    setSelectedRoute("MUSHROOMDETAILS");
  };
  const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#e6e6dd",
      color: "#4D6A66",
      boxShadow: theme.shadows[1],
      fontSize: 15,
      fontFamily: "DM Sans",
      fontWeight: "bold"
    },
  }));

  return (
    <Box
      sx={{          
        '& > :not(style)': {
        width: 550,
        margin: 2
      },}}
      onClick={handleChange}
    >
      <div>
        <h1 style={{ backgroundColor: '#4D6A66', padding:'1%', color:'#e6e6dd', margin:'0', fontFamily: "DM Sans"}}>{mushroom.name}               
          <img
            style={{ width: '22px', paddingLeft:'2%' }}
            className="mushroom-list__image"
            src={`images/${mushroom.icon}`}
          />
        </h1>
        <Collapse 
          in={checked} 
          collapsedSize={170} 
        >
          <CustomTooltip 
            disableFocusListener 
            disableTouchListener 
            title="Click to expand"
            placement="right-start"
            >
            <div>
              <img
                style={{ width: '100%', height: '50%'}}
                src={`images/${mushroom.image}`}
                alt={mushroom.name}
              />
            </div>
          </CustomTooltip>
          <Card>
            <div style={{fontFamily: "DM Sans", fontSize: '1em', padding: '0 5%'}}>
              <p>{mushroom.info}</p>
              <p>Edible: {mushroom.edible ? "Yes" : "No"}</p>
              <Button size="small" variant="filled" onClick={handleClick}> Read more</Button>
            </div>
          </Card>
        </Collapse>
      </div>
    </Box>
  );
};

export default MushroomListItem;