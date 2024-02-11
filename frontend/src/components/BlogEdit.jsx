import React, { useState, useEffect } from "react";
import BlogFormMap from "./BlogFormMap";
import "../styles/BlogForm.scss";
import { ThemeProvider } from '@mui/material/styles'; 
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, } from "@mui/material";

const BlogEdit = (props) => {
  const { mushrooms, setBlogUpdate, existingBlog, setEditMode, setSelectedRoute, theme, handleClose, selectedRoute } = props;
  const [disableAddMushroom, setDisableAddMushroom] = useState(true);

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

  const [formData, setFormData] = useState({
    title: existingBlog.title || "",
    content: existingBlog.content || "",
    latitude: existingBlog.latitude || 1,
    longitude: existingBlog.longitude || 1,
    user_id: existingBlog.user_id || 1,
    mushrooms: existingBlog.mushrooms || [{}],
    privacy: existingBlog.privacy || true,
  });

  useEffect(() => {
    // Set initial form data when existingBlog changes
    setFormData({
      title: existingBlog.title || "",
      content: existingBlog.content || "",
      latitude: existingBlog.latitude || 1,
      longitude: existingBlog.longitude || 1,
      user_id: existingBlog.user_id || 1,
      mushrooms: existingBlog.mushrooms || [{}],
      privacy: existingBlog.privacy || true,
    });
  }, [existingBlog]);

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
    setDisableAddMushroom(false);
  };

  const handleAddMushroom = () => {
    setFormData((prevData) => ({
      ...prevData,
      mushrooms: [...prevData.mushrooms, { mushroom_id: "" }],
    }));
    setDisableAddMushroom(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const filteredMushrooms = formData.mushrooms.filter(mushroom => mushroom.mushroom_id);
    const mushroomIds = filteredMushrooms.map((mushroom) => mushroom.mushroom_id);
    try {
      // Put request to update the existing blog
      const blogResponse = await fetch(`http://localhost:8001/api/blogs/${existingBlog.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          latitude: formData.latitude,
          longitude: formData.longitude,
          user_id: formData.user_id,
          mushrooms: mushroomIds,
          privacy: formData.privacy
        }),
      });
  
      if (!blogResponse.ok) {
        throw new Error(`Failed to update blog. Status: ${blogResponse.status}`);
      }
  
      const updatedBlogData = await blogResponse.json();
      console.log("Blog updated:", updatedBlogData);
  
      // Reset the form after submission
      setFormData({
        title: "",
        content: "",
        latitude: null,
        longitude: null,
        user_id: 1,
        mushrooms: [],
        privacy: true,
      });
  
      setBlogUpdate(true);
      setEditMode(false); // Exit edit mode after submitting
      window.location.reload();
      setSelectedRoute("FIELDJOUNRAL");
    } catch (error) {
      console.error("Error when updating:", error.message);
    }
    handleClose()
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

export default BlogEdit;