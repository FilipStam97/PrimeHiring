import { Box , Tooltip, IconButton, Typography, CircularProgress, Button} from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getDeveloper } from "../../services/developersService";
import LetterAvatar from "lettered-avatar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DeleteDeveloperModal from "../DeleteDeveloperModal/DeleteDeveloperModal";
import CreateEditDeveloperModal from "../CreateEditDevelperModal/CreateEditDeveloperModal";
import HireDeveloperModal from "../HireDeveloperModal/HireDeveloperModal";

const styles = {

    actionButtonsBox: {
        display: 'flex',
        marginTop: '10%'
    },
    actionButtonStyle: {
        marginRight: '5%'
    },
    labelAndDataWrapperBox: {
      marginTop: '2%'
    },
    linkedInButton: {
      padding: '0px',
      marginTop: '4%',
      "&:hover": {
        color: '#0e76a8'
      },
    },
    labelStyle: {
      color: "rgba(0,0,0,.7)"
    }

}

const DeveloperPage = () => {
    let {state} = useLocation();
    let {id} = state;
    const history = useHistory();
    const [progress, setProgress] = useState(true);
    const [developer,setDeveloper] = useState(null);
    const [reloadGetDeveloper, setReloadGetDeveloper] = useState(false);
    


    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openHireModal, setOpenHireModal] = useState(false);


    const handleOpenDeleteModal = () => setOpenDeleteModal(true);
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);

    const handleOpenEditModal = () => setOpenEditModal(true);
    const handleCloseEditModal = () => setOpenEditModal(false);

    const handleOpenHireModal = () => setOpenHireModal(true);
    const handleCloseHireModal = () => setOpenHireModal(false);

    useEffect(() => {
        getDeveloper(id)
        .then((res) => {
            setDeveloper(res);
        })
        .catch(err => console.log(err))
        .finally(() => setProgress(false))
    },[reloadGetDeveloper]);

    return ( 
    <Box sx={{marginTop: '1%'}}>
            <Box sx={{marginBottom: '1%'}}>
              <Tooltip title="Back">
                <IconButton onClick={() => history.goBack()} >
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Box sx={{display: 'flex'}}>
                {progress &&
                     <CircularProgress />
                }
                {!progress &&
                <>
            <Box sx={styles.avatarWrapperBox}>
            <LetterAvatar
                name={developer.name}
                imgSrc={
                  developer.profilePic
                    ? developer.profilePic
                    : null
                }
                options={{
                  twoLetter: true,
                  size: 200,
                  shape: 'square'
                }}
              />
            </Box>
            <Box sx={{marginLeft: '2%'}}>
            <Box>
            <Typography  variant="h4">{developer.name}</Typography>
            {developer.description.length > 0 &&
              <Typography  variant="body1">{developer.description}</Typography>
            }
            </Box>
            <Box sx={styles.labelAndDataWrapperBox}>
            <Typography sx={styles.labelStyle}  variant="caption">Email</Typography>
            <Typography  variant="body1">{developer.email}</Typography>
            </Box>
            <Box sx={styles.labelAndDataWrapperBox}>
            <Typography sx={styles.labelStyle} variant="caption">Phone Number</Typography>
            <Typography variant="subtitle1">{developer.phoneNumber}</Typography>
            </Box>
            <Box sx={styles.labelAndDataWrapperBox}>
            <Typography sx={styles.labelStyle} variant="caption">Location</Typography>
            <Typography variant="subtitle1">{developer.location}</Typography>
            </Box>
            <Box sx={styles.labelAndDataWrapperBox}>
            <Typography sx={styles.labelStyle} variant="caption">Technology</Typography>
            <Typography variant="subtitle1">{developer.technology}</Typography>
            </Box>
            <Box sx={styles.labelAndDataWrapperBox}>
            <Typography sx={styles.labelStyle} variant="caption">Price Per Hour</Typography>
            <Typography variant="subtitle1">{developer.pricePerHour} euro/hour</Typography>
            </Box>
            <Box sx={styles.labelAndDataWrapperBox}>
            <Typography sx={styles.labelStyle} variant="caption">Years Of Experience</Typography>
            <Typography  variant="subtitle1">{developer.yearsOfExperience}</Typography>
            </Box>
            <Box sx={styles.labelAndDataWrapperBox}>
            <Typography sx={styles.labelStyle} variant="caption">Native Language</Typography>
            <Typography  variant="subtitle1">{developer.nativeLanguage}</Typography>
            </Box>
            {developer.linkedIn.length > 0 &&
           <IconButton sx={styles.linkedInButton} onClick={() => window.open(developer.linkedIn, '_blank')}>
           <LinkedInIcon sx={{width: '32px', height: '32px'}}/>
           </IconButton>
            }
            
            

            <Box sx={styles.actionButtonsBox}>
                <Tooltip title="Hire this developer!">
                <Button onClick={handleOpenHireModal} sx={styles.actionButtonStyle} size="small" variant="contained">Hire</Button>
                </Tooltip>
                <Tooltip title="Update developer info">
                <Button onClick={handleOpenEditModal} sx={styles.actionButtonStyle}  size="small" variant="contained">Edit</Button>
                </Tooltip>
                <Tooltip title="Remove this developer">
                <Button onClick={handleOpenDeleteModal} sx={styles.actionButtonStyle}  size="small" variant="contained">Delete</Button>
                </Tooltip>
            </Box>
            </Box>
            </>
            }
            </Box>
            <DeleteDeveloperModal developerName={developer ? developer.name : ""} developerID={developer ? developer.id : ""} open={openDeleteModal} handleClose={handleCloseDeleteModal}/>
            {developer &&
            <CreateEditDeveloperModal setReloadGetDeveloperData={() => setReloadGetDeveloper(!reloadGetDeveloper)} developerData={developer} edit={true} open={openEditModal} handleClose={handleCloseEditModal} />
            }
            {developer &&
            <HireDeveloperModal multiple={false} developerData={developer} open={openHireModal} handleClose={handleCloseHireModal} />
            }
    </Box> );
}
 
export default DeveloperPage;