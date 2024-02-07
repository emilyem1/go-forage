import FieldJournalItem from "./FieldJournalItem";
import BlogForm from "./BlogForm";
import { useState, useEffect } from "react";
import { Box, Modal } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles'; 
import EditIcon from '@mui/icons-material/Edit';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';

const FieldJournal = (props) => {
  const { email, setBlogSelected, setSelectedRoute, mushrooms, onBookmarkClick, bookmarkedBlogs, userData, setBlogUpdate, theme } = props;
  const [blogs, setBlogs] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    console.log('Current email:', email);
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8001/api/journal?email=${email}`);
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };
    fetchData();
  }, [email]);

  return (
    <ThemeProvider theme={theme}>
    <main>
    <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1, display: 'flex', marginLeft: '1%', marginTop: '1%', position: 'sticky', top: '0' }}>
      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: 'absolute', bottom: -100, right: 100 }}
        icon={<SpeedDialIcon openIcon={<EditIcon />} onClick={handleOpen} />}
      >
      </SpeedDial>
    </Box>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <BlogForm mushrooms={mushrooms} setBlogUpdate={setBlogUpdate} handleClose={handleClose} setOpen={setOpen} />
        </Box>
      </Modal>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent:"center",
          flexWrap: "wrap",
          padding:"10px",
          gap: "2rem",
        }}
      >
        {blogs.map((blog) => (
          <FieldJournalItem
          mushrooms={mushrooms}
          className="mushroom-list"
          key={blog.id}
          blog={blog}
          setBlogSelected={setBlogSelected}
          setSelectedRoute={setSelectedRoute}
          bookmarkedBlogs={bookmarkedBlogs}
          userData={userData}
          onBookmarkClick={onBookmarkClick}
          />
        ))}
      </Box>
    </main>
    </ThemeProvider>
  );
};

export default FieldJournal;