import BlogFormMap from "./BlogFormMap";
import "../styles/BlogForm.scss";
import { useState } from "react";
import { ThemeProvider } from '@mui/material/styles';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const BlogForm = (props) => {
  const { mushrooms, setBlogUpdate, handleClose, theme } = props;
  const [disableAddMushroom, setDisableAddMushroom] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    latitude: 1,
    longitude: 1,
    user_id: 1,
    mushrooms: [{}],
    privacy: true,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMushroomSelection = (event, index) => {
    const selectedMushroomId = event.target.value;
    setFormData((prevData) => {
      const updatedMushrooms = [...prevData.mushrooms];
      updatedMushrooms[index] = { mushroom_id: selectedMushroomId };
      return {
        ...prevData,
        mushrooms: updatedMushrooms,
      };
    });
    setDisableAddMushroom(false)
  };

  const handleAddMushroom = () => {
    setFormData((prevData) => ({
      ...prevData,
      mushrooms: [...prevData.mushrooms, { mushroom_id: "" }],
    }));
    setDisableAddMushroom(true)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      //post to blog api
      const blogResponse = await fetch("http://localhost:8001/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          latitude: formData.latitude,
          longitude: formData.longitude,
          user_id: formData.user_id,
          privacy: formData.privacy,
        }),
      });

      if (!blogResponse.ok) {
        throw new Error(`Failed to post blog. Status: ${blogResponse.status}`);
      }

      const blogData = await blogResponse.json();
      console.log("Blog posted:", blogData);

      // post to MUSHROOM_POST api for each selected mushroom
      for (const mushroom of formData.mushrooms) {
        const mushroomPostResponse = await fetch(
          "http://localhost:8001/api/mushroom-posts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              blog_id: blogData.id,
              mushroom_id: mushroom.mushroom_id,
            }),
          }
        );

        if (!mushroomPostResponse.ok) {
          throw new Error(
            `Failed to post mushroom post. Status: ${mushroomPostResponse.status}`
          );
        }

        const mushroomPostData = await mushroomPostResponse.json();
        console.log("Mushroom post created:", mushroomPostData);
      }
      setBlogUpdate(true);
      // Reset the form after submission
      setFormData({
        title: "",
        content: "",
        latitude: null,
        longitude: null,
        user_id: "1",
        mushrooms: [],
      });
    } catch (error) {
      console.error("Error when posting:", error.message);
    }
    handleClose()
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    maxHeight: '90%',
    overflowY: 'scroll',
    overflowX: 'hidden'
  };

  return (
    <ThemeProvider theme={theme}>
      <form className="blog-form" style={style}>
        <BlogFormMap setFormData={setFormData} />
      <div className="form-content" 
        style={{ display:"flex", justifyContent:"center", padding:"1%"}}
      >
        <section id="small-inputs" style={{width:"28%", marginTop:"1%"}}>
          <TextField
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter Blog Title"
            variant="filled"
            fullWidth
            sx={{marginBottom:"3%"}}
          />
            <FormControl fullWidth variant="filled">
              <InputLabel id="select-label">Select Privacy</InputLabel>
                <Select
                  name="privacy"
                  value={formData.privacy}
                  onChange={handleChange}
                  sx={{marginBottom:"3%"}}
                >
                  <MenuItem value={true}>Public</MenuItem>
                  <MenuItem value={false}>Private</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth variant="filled">
              <InputLabel id="select-label">Select Mushroom</InputLabel>
                {formData.mushrooms.map((mushroom, index) => (
                  <Select
                    key={index}
                    name={`mushroom_id_${index}`}
                    value={mushroom.mushroom_id}
                    label="Age"
                    onChange={(event) => handleMushroomSelection(event, index)}
                      sx={{marginBottom:"3%"}}
                  >
                    {mushrooms.map((mushroomOption) => (
                      <MenuItem key={mushroomOption.id} value={mushroomOption.id}>
                        {mushroomOption.name}
                      </MenuItem>
                    ))}
                  </Select>
                ))}
                {formData.mushrooms.length < 4 && (
                  <Button type="button" onClick={handleAddMushroom} disabled={disableAddMushroom}>
                    Add Mushroom
                  </Button>
                )}
          </FormControl>
        </section>
        <section id="content" style={{width:"70%", margin:"1%"}}>
          <TextField
            type="text"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Enter Blog Content"
            variant="filled"
            fullWidth
            multiline
            rows={6.5}
            inputProps={{ style: { width: '100%' } }}
          />
        </section>
      </div>
      <Button color="primary" variant="contained" onClick={handleSubmit} sx={{margin:"1% 40%"}} >
          Submit
      </Button>
    </form>
  </ThemeProvider>
  );
};

export default BlogForm;
