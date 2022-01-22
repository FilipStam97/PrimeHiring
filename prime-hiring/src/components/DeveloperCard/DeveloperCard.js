import { Box, Typography, IconButton, Tooltip, Checkbox, FormControlLabel} from "@mui/material";
import { useState } from "react";
import LetterAvatar from "lettered-avatar";
import LaunchIcon from "@mui/icons-material/Launch";
import { useHistory } from "react-router-dom";

const styles = {
    cardContainerStyle: {
        display: 'flex',
        paddingLeft: '2%',
        paddingRight: '10%',
        paddingTop: '1%',
        paddingBottom: '1%',
        justifyContent: 'space-between',
        maxWidth: '1000px'

    },
    avatarWrapperBox: {
     
    },
    avatarAndContentWrapperBox: {
      display: 'flex',
      "&:hover": {
        cursor: 'pointer'
      }
    },
    cardContetntBoxStyle: {
        marginLeft: '1%',
        minWidth: '650px'
    },
    buttonBoxStyles: {
        paddingTop: '2%',
        display: 'flex',
    }
}

const DeveloperCard = (props) => {

    const [checked, setChecked] = useState(false);
    const history = useHistory();

    const handleChecked = (e) => {
      setChecked(e.target.checked);
      if(e.target.checked) {
        props.addDeveloper(props.developer);
      }
      else {
        props.removeDeveloper(props.developer.id);
      }
    }; 

    return ( 
        <Box sx={styles.cardContainerStyle}>
           <Box onClick={() => history.push(
                {
                  pathname: `/developer/${props.developer.id}`,
                  state: {
                    id: props.developer.id,
                  }
                }
                )} 
                sx={styles.avatarAndContentWrapperBox}>
            <Box sx={styles.avatarWrapperBox}>
            <LetterAvatar
                name={props.developer.name}
                imgSrc={
                  props.developer.profilePic
                    ? props.developer.profilePic
                    : null
                }
                options={{
                  twoLetter: true,
                  size: 100,
                  shape: 'square'
                }}
              />
            </Box>
            <Box sx={styles.cardContetntBoxStyle}>
                <Typography variant="h5" > {props.developer.name}</Typography>
                {props.developer.description &&
                    <Typography variant="subtitle1" > {props.developer.description}</Typography>

                }
                <Typography variant="subtitle2" > Technology: {props.developer.technology}</Typography>
                <Typography variant="subtitle2" > Price Per Hour: {props.developer.pricePerHour}</Typography>

            </Box>
            </Box>
          
            <Box sx={styles.buttonBoxStyles}>
            <Box>
              <Tooltip title="View profile">
                <IconButton onClick={() => history.push(
                {
                  pathname: `/developer/${props.developer.id}`,
                  state: {
                    id: props.developer.id,
                  }
                }
                )} >
                  <LaunchIcon />
                </IconButton>
              </Tooltip>
            </Box>
            {props.switchChecked &&
              <Box>
                <FormControlLabel control={<Checkbox checked={checked} onChange={handleChecked}  />} label="Select" />
              </Box>
            }
            
            </Box>
        </Box>
     );
}
 
export default DeveloperCard;