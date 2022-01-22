
import  React, { useEffect } from 'react';
import { useState } from 'react';
import { Tooltip, Backdrop, Box, Modal, Fade, Button, Typography , TextField} from '@mui/material';
import { deleteDeveloper } from '../../services/developersService';
import { useHistory } from 'react-router-dom';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { createHiringRecord, getRecordsByDeveloperID, getRecordsOfSelectedDevelopers, createMultipleHiringRecords } from '../../services/hiringService';


const styles = {
    boxStyle: {

        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
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
      datePickerWrapperBox: {
          display: 'flex',
          marginTop: '4%',
          marginBottom: '4%',
          justifyContent: 'center'

      },
      singleDatePickerBoxStyles: {
        marginRight: '2%',
        width: '200px'
      }
  };



const HireDeveloperModal = (props) => {

    const [hiringList, setHiringList] = useState(null);
    const [error,setError] = useState(null);
    const [startDate, setStartDate] = useState(moment().add(1,'days'));
    const [endDate, setEndDate] = useState(moment().add(2,'days'));
    const [reloadGetRecords, setReloadGetRecords] = useState(false);

    const resetState = () => {
        setStartDate(moment().add(1,'days'));
        setEndDate(moment().add(2,'days'));
        setError(null);
    }

    const handleChangeStartDate = (newValue) => {
        setStartDate(newValue);
    };

    const handleChangeEndDate = (newValue) => {
        setEndDate(newValue);
      };

    const overlapTest = (startDate, endDate) => {
        let result = false;
        hiringList.forEach((record) => {
            let overlap = startDate < moment(record.endDate).toDate() && moment(record.startDate).toDate() < endDate;
            if(overlap){
                result = true;
            }
        });
        return result;
    }

    const handleHireMultipleDevelopers = ()=> {
      if(!(startDate > endDate)) {
      if(props.developerList.length > 0)
      {
      let newRecordsArray = [];
      props.developerList.forEach(developer => {
        let newRecord = {
          id: uuidv4(),
          developer: developer,
          startDate: startDate.set({'hour': 0, 'minute': 0, 'second': 0}).format("YYYY-MMM-D HH:mm:ss"),
          endDate: endDate.set({'hour': 0, 'minute': 0, 'second': 0}).format("YYYY-MMM-D HH:mm:ss")
        }
        newRecordsArray.push(newRecord);
      });
       
        if(!overlapTest(moment(newRecordsArray[0].startDate).toDate(),moment(newRecordsArray[0].endDate).toDate()))
        {
          createMultipleHiringRecords(newRecordsArray).
          then(res => {
              console.log(res);
              resetState();
              setReloadGetRecords(!reloadGetRecords);
              props.handleClose();
          })
          .catch(err => console.log(err));
        }
        else setError("One or more developers are not avilable for this time frame!")
      }
      else setError("You must select at least one developer!")
    }
    else setError("Invalid time frame!")
  }

    const handleHireDeveloper = ()=> {
      if(!(startDate > endDate)) {
      let newRecord = {
          id: uuidv4(),
          developer: props.developerData,
          startDate: startDate.set({'hour': 0, 'minute': 0, 'second': 0}).format("YYYY-MMM-D HH:mm:ss"),
          endDate: endDate.set({'hour': 0, 'minute': 0, 'second': 0}).format("YYYY-MMM-D HH:mm:ss")
      }
     
      if(!overlapTest(moment(newRecord.startDate).toDate(),moment(newRecord.endDate).toDate()))
      {
          createHiringRecord(newRecord).
          then(res => {
              console.log(res);
              resetState();
              setReloadGetRecords(!reloadGetRecords);
              props.handleClose();
          })
          .catch(err => console.log(err));
      }
      else setError("Selected date range is not available!")
    }
    else setError("Invalid time frame!")
  }


    useEffect(() => {
      if(!props.multiple){
        getRecordsByDeveloperID(props.developerData.id)
        .then(res => setHiringList(res))
        .catch(err => console.log(err));
      }
      else {
        getRecordsOfSelectedDevelopers(props.developerList)
        .then(res => setHiringList(res))
        .catch(err => console.log(err));
      }
        
    },[reloadGetRecords, props.developerList])

    return ( 
        <Modal
        open={props.open}
        onClose={() => {
            resetState();
            props.handleClose();
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Box sx={styles.boxStyle}>
            {!props.multiple &&
            <Typography sx={styles.headingStyle} variant="h6" >
              Hire {props.developerData.name}?
            </Typography>
            }
            {props.multiple &&
            <Typography sx={styles.headingStyle} variant="h6" >
              Hire selected developers?
            </Typography>
            }
            <LocalizationProvider dateAdapter={DateAdapter}>
                <Box sx={styles.datePickerWrapperBox}>
                <Box sx={styles.singleDatePickerBoxStyles}>
                <DesktopDatePicker
                minDate={moment().add(1,'days')}
                label="Start date"
                value={startDate}
                onChange={handleChangeStartDate}
                renderInput={(params) => <TextField {...params} />}
                />
                </Box>
                <Box sx={styles.singleDatePickerBoxStyles}>
                <DesktopDatePicker
                minDate={moment(startDate).add(1,'days')}
                label="End date"
                value={endDate}
                onChange={handleChangeEndDate}
                renderInput={(params) => <TextField {...params} />}
                />
                </Box>
                </Box>
            </LocalizationProvider>
            {error &&
                <Typography variant="subtitle1" sx={{textAlign: 'center', color: 'red'}}>{error}</Typography>
            }
            <Box sx={styles.actionBoxStyles}>
              <Tooltip title={props.multiple ? "Hire these developers!" : "Hire this developer!"}>
                <Button
                  onClick={() => {
                    if(props.multiple){
                      handleHireMultipleDevelopers();
                    }
                    else {
                      handleHireDeveloper();
                    }
                    // props.handleClose();
                    // history.goBack();
                  }}
                  sx={styles.buttonStyles}
                  variant="contained"
                >
                  Hire
                </Button>
              </Tooltip>
              <Tooltip title="Cancel">
                <Button
                  onClick={() => {
                    resetState();
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
 
export default HireDeveloperModal;