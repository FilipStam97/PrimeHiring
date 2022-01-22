import React from "react";
import { useState } from "react";
import {
  Backdrop,
  TextField,
  Box,
  Modal,
  Fade,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Tooltip,
} from "@mui/material";
import { createDeveloper, updateDeveloper } from "../../services/developersService";
import { v4 as uuidv4 } from 'uuid';

const styles = {
  boxStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  },
  formBoxStyle: {
    display: "flex",
    flexDirection: "column",
  },
  dualInputBoxWrapper: {
    display: "flex",
    marginTop: '2%'
  },
  dualInputBoxInputStyle: {
    marginLeft: "2%",
    marginRight: "2%",
  },
  descriptionInputStyle: {
    marginLeft: "2%",
    marginRight: "2%",
  },
  actionBoxStyles: {
    margin: "3%",
    display: "flex",
    justifyContent: "center",
  },
  buttonStyles: {
    marginLeft: "2%",
    marginRight: "2%",
  },
};

const initialDataState = {
  name: "",
  email: "",
  phoneNumber: "",
  location: "",
  profilePic: "",
  pricePerHour: "",
  technology: "",
  description: "",
  yearsOfExperience: "",
  nativeLanguage: "",
  linkedIn: "",
  id: "",
};

const initialErrorState = {
    errorCode: 0 , 
    errorMessage: ""
}

const CreateEditDeveloperModal = (props) => {
  const defaultUserData = props.developerData;
  const [data, setData] = useState(props.edit ? defaultUserData : initialDataState);
  const [error, setError] = useState(initialErrorState);

  const validData = () => {
      if(data.name.length == 0)
        {
            setError({errorCode: 1 , errorMessage: "Name is a required field!"});
            return false;
        }
        else
        if(data.email.length == 0 || !data.email.includes("@") || data.email.includes(" "))
        {
            setError({errorCode: 2 , errorMessage: "A valid email is required!"});
            return false;
        }
        else
        if(data.phoneNumber.length == 0 || !/^\d+$/.test(data.phoneNumber))
        {
            setError({errorCode: 3 , errorMessage: "A valid phone number is required!"});
            return false;
        }
        else
        if(data.location.length == 0)
        {
            setError({errorCode: 4 , errorMessage: "Location is required!"});
            return false;
        }
        else
        if(data.pricePerHour.length == 0)
        {
            setError({errorCode: 5 , errorMessage: "Price per hour required!"});
            return false;
        }
        else
        if(data.technology.length == 0)
        {
            setError({errorCode: 6 , errorMessage: "Technology is a required field!"});
            return false;
        }
        else
        if(data.yearsOfExperience.length == 0)
        {
            setError({errorCode: 7 , errorMessage: "Years of experience is a required field!"});
            return false;
        }
        else
        if(data.nativeLanguage.length == 0)
        {
            setError({errorCode: 8 , errorMessage: "Native Language is a required field!"});
            return false;
        }
        else return true;
  }

  const handleCreateDeveloper = () => {
      let validSubmission = validData();
      if(validSubmission) {
          setData({...data, id: uuidv4()})
          createDeveloper(data)
          .then((res) => {
            console.log(res);
            props.handleClose();
            setData(initialDataState);
            props.setReloadGetDevelopers();
          })
          .catch(err => console.log(err))
      }
  }

  const handleUpdateDeveloper = () => {
    let validSubmission = validData();
    if(validSubmission) {
        updateDeveloper(data.id, data)
        .then((res) => {
          console.log(res);
          props.handleClose();
          //setData(initialDataState);
          props.setReloadGetDeveloperData();
        })
        .catch(err => console.log(err))
    }
}


  return (
    <Modal
      open={props.open}
      onClose={() => {
        props.handleClose();
        setError(initialErrorState)
        setData(props.edit ? defaultUserData : initialDataState);
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <Box sx={styles.boxStyle}>
          {!props.edit &&
          <Typography variant="h5" component="h2">
            Add a new developer
          </Typography>
          }
          {props.edit &&
          <Typography variant="h5" component="h2">
            Edit developers information
          </Typography>
          }
          <Box sx={styles.formBoxStyle}>
            <Box sx={styles.dualInputBoxWrapper}>
              <TextField
                error = {error.errorCode == 1 ? true : false}
                sx={styles.dualInputBoxInputStyle}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                value={data.name}
                required
                label="Name"
                variant="standard"
              />
              <TextField
                error = {error.errorCode == 2 ? true : false}
                sx={styles.dualInputBoxInputStyle}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                value={data.email}
                required
                label="Email"
                variant="standard"
              />
            </Box>
            <Box sx={styles.dualInputBoxWrapper}>
              <TextField
                error = {error.errorCode == 3 ? true : false}
                sx={styles.dualInputBoxInputStyle}
                onChange={(e) =>
                  setData({ ...data, phoneNumber: e.target.value })
                }
                value={data.phoneNumber}
                required
                label="Phone Number"
                variant="standard"
              />
              <TextField
                sx={styles.dualInputBoxInputStyle}
                error = {error.errorCode == 4 ? true : false}
                onChange={(e) => setData({ ...data, location: e.target.value })}
                value={data.location}
                required
                label="Location"
                variant="standard"
              />
            </Box>
            <Box sx={styles.dualInputBoxWrapper}>
              <TextField
                sx={styles.dualInputBoxInputStyle}
                onChange={(e) =>
                  setData({ ...data, profilePic: e.target.value })
                }
                value={data.profilePic}
                label="Profile Picture Link"
                variant="standard"
              />
              <TextField
                error = {error.errorCode == 5 ? true : false}
                sx={styles.dualInputBoxInputStyle}
                onChange={(e) =>
                  setData({ ...data, pricePerHour: e.target.value })
                }
                value={data.pricePerHour}
                required
                label="Price Per Hour"
                variant="standard"
                type="number"
              />
            </Box>
            <Box sx={styles.dualInputBoxWrapper}>
              <FormControl
                error = {error.errorCode == 6 ? true : false}
                required
                variant="standard"
                sx={{ m: 1, minWidth: 120 }}
              >
                <InputLabel id="technology-label">Technology</InputLabel>
                <Select
                  onChange={(e) =>
                    setData({ ...data, technology: e.target.value })
                  }
                  value={data.technology}
                  labelId="technology-label"
                  id="technology"
                  //value={age}
                  //onChange={handleChange}
                  label="Technology"
                >
                  <MenuItem value={"Javascript"}>Javascript</MenuItem>
                  <MenuItem value={"Java"}>Java</MenuItem>
                  <MenuItem value={".NET"}>.NET</MenuItem>
                  <MenuItem value={"Flutter"}>Flutter</MenuItem>
                  <MenuItem value={"Python"}>Python</MenuItem>
                  <MenuItem value={"PHP"}>PHP</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <TextField
              sx={styles.descriptionInputStyle}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              value={data.description}
              label="Description"
              multiline
              rows={3}
              variant="standard"
            />
            <Box sx={styles.dualInputBoxWrapper}>
              <TextField
                error = {error.errorCode == 7 ? true : false}
                sx={styles.dualInputBoxInputStyle}
                onChange={(e) =>
                  setData({ ...data, yearsOfExperience: e.target.value })
                }
                value={data.yearsOfExperience}
                required
                label="Years Of Expereience"
                variant="standard"
                type="number"
              />
              <TextField
                sx={styles.dualInputBoxInputStyle}
                onChange={(e) => setData({ ...data, linkedIn: e.target.value })}
                value={data.linkedIn}
                label="LinkedIn Profile"
                variant="standard"
              />
            </Box>
            <Box sx={styles.dualInputBoxWrapper}>
              <FormControl
                error = {error.errorCode == 8 ? true : false}
                required
                variant="standard"
                sx={{ m: 1, minWidth: 120 }}
              >
                <InputLabel id="language-label">Native Language</InputLabel>
                <Select
                  onChange={(e) =>
                    setData({ ...data, nativeLanguage: e.target.value })
                  }
                  value={data.nativeLanguage}
                  labelId="language-label"
                  id="language"
                  //value={age}
                  //onChange={handleChange}
                  label="Native Language"
                >
                  <MenuItem value={"English"}>English</MenuItem>
                  <MenuItem value={"Serbian"}>Serbian</MenuItem>
                  <MenuItem value={"Bulgarian"}>Bulgarian</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {error.errorCode !== 0 &&
                <Typography variant="subtitle1" sx={{textAlign: 'center', color: 'red'}}>{error.errorMessage}</Typography>
            }
            <Box sx={styles.actionBoxStyles}>
              {!props.edit &&
              <Tooltip title="Add a new developer!">
                <Button onClick={() => handleCreateDeveloper()} sx={styles.buttonStyles} variant="contained">
                  Add
                </Button>
              </Tooltip>
              }
              {props.edit &&
              <Tooltip title="Edit developers information!">
                <Button onClick={() => handleUpdateDeveloper()} sx={styles.buttonStyles} variant="contained">
                  Edit
                </Button>
              </Tooltip>
              }
              <Tooltip title="Cancel">
                <Button
                  onClick={() => {
                    props.handleClose();
                    setError(initialErrorState)
                    setData(props.edit ? defaultUserData : initialDataState);
                  }}
                  sx={styles.buttonStyles}
                  variant="outlined"
                >
                  Cancel
                </Button>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CreateEditDeveloperModal;
