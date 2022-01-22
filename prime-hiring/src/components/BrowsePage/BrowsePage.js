import React from 'react'
import { Box, Divider, Tooltip, Button, FormControlLabel, Switch, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllDevelopers } from "../../services/developersService";
import DeveloperCard from "../DeveloperCard/DeveloperCard";
import CreateEditDeveloperModal from '../CreateEditDevelperModal/CreateEditDeveloperModal';
import HireDeveloperModal from '../HireDeveloperModal/HireDeveloperModal';


const styles = {
    developerWrapper: {
        marginTop: '2%'
    },
    buttonBoxStylesSwitchOff: {
        display: 'flex',
        justifyContent: 'end'
    },
    buttonBoxStylesSwitchOn: {
        display: 'flex',
        justifyContent: 'space-between'
    }

}

const BrowsePage = () => {
    const [progress, setProgress] = useState(true);
    const [switchChecked, setSwitchChecked] = useState(false);
    const [developerList, setDeveloperList] = useState(null);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [reloadGetDevelopers, setReloadGetDevelopers] = useState(false);
    const [multipleDevelopersList, setMultipleDevelopersList] = useState([]);
    const [openHireModal, setOpenHireModal] = useState(false);

    useEffect(() =>{
        getAllDevelopers()
        .then((res) => {
            setDeveloperList(res);
        })
        .catch(err => console.log(err))
        .finally(() => setProgress(false))
    },[reloadGetDevelopers]);

    const handleSwitchChange = (event) => setSwitchChecked(event.target.checked);
    const handleOpenCreateModal = () => setOpenCreateModal(true);
    const handleCloseCreateModal = () => setOpenCreateModal(false);
    const handleOpenHireModal = () => setOpenHireModal(true);
    const handleCloseHireModal = () => setOpenHireModal(false);


    const addDeveloper = (developer) => {
        setMultipleDevelopersList([...multipleDevelopersList, developer]);
    }

    const removeDeveloper = (developerID) => {
        if(multipleDevelopersList.length > 0)
            setMultipleDevelopersList([...multipleDevelopersList.filter(developer => developer.id != developerID)]);
    }

    return ( 
        <Box sx={{marginTop: '2%'}}>
            <Box sx={switchChecked ? styles.buttonBoxStylesSwitchOn : styles.buttonBoxStylesSwitchOff}>
                {switchChecked &&
                    <Tooltip title="Hire selected developers!">
                    <Button onClick={handleOpenHireModal} sx={{marginLeft: '2%'}} size="small" variant="contained">Hire</Button>
                    </Tooltip>
                }
            <Box sx={{display: 'flex'}}>
            <FormControlLabel control={<Switch checked={switchChecked} onChange={handleSwitchChange} />} label="Select multiple" />
              <Tooltip title="Add a new developer">
                <Button onClick={handleOpenCreateModal} size="small" variant="contained">Create</Button>
              </Tooltip>
              </Box>
            </Box>
            {progress &&
                <CircularProgress />
            }
            {!progress &&
            <Box sx={styles.developerWrapper}>
            {developerList && developerList.map((dev, index) => {
                return (
                <React.Fragment key={index}>
                {index != 0 &&
                    <Divider sx={{maxWidth: '800px'}} />
                }
                <DeveloperCard addDeveloper={(developer) => addDeveloper(developer)} removeDeveloper={(id) => removeDeveloper(id)} switchChecked = {switchChecked} key={dev.name} developer={dev}/> 
                </React.Fragment>
            )})
            }
            </Box>
            }
            <CreateEditDeveloperModal setReloadGetDevelopers={() => setReloadGetDevelopers(!reloadGetDevelopers)} edit={false} open={openCreateModal} handleClose={handleCloseCreateModal}/>
            {developerList &&
            <HireDeveloperModal multiple={true} developerList={multipleDevelopersList} open={openHireModal} handleClose={handleCloseHireModal} />
            }
        </Box>
     );
}
 
export default BrowsePage;