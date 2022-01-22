import * as React from 'react';
import { Tooltip, Backdrop, Box, Modal, Fade, Button, Typography } from '@mui/material';
import { deleteDeveloper } from '../../services/developersService';
import { useHistory } from 'react-router-dom';


const styles = {
    boxStyle: {

        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    },
    headingStyle: {
        textAlign: 'center'
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



const DeleteDeveloperModal = (props) => {
    const history = useHistory();

    const handleDelete = () => {
        deleteDeveloper(props.developerID)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    return ( 
        <Modal
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Box sx={styles.boxStyle}>
            <Typography sx={styles.headingStyle} variant="h6" >
              Are you sure that you want to delete user {props.developerName}?
            </Typography>
            <Box sx={styles.actionBoxStyles}>
              <Tooltip title="Delete this user!">
                <Button
                  onClick={() => {
                    handleDelete()
                    props.handleClose();
                    history.goBack();
                  }}
                  sx={styles.buttonStyles}
                  variant="contained"
                >
                  Delete
                </Button>
              </Tooltip>
              <Tooltip title="Cancel">
                <Button
                  onClick={() => {
                    props.handleClose();
                  }}
                  sx={styles.buttonStyles}
                  variant="outlined"
                >
                  Cancel
                </Button>
              </Tooltip>
            </Box>
          </Box>
        </Fade>
      </Modal>
     );
}
 
export default DeleteDeveloperModal;