import React from 'react';
import { Box, Divider, CircularProgress } from '@mui/material';
import { useEffect, useState } from "react";
import { getRecords } from "../../services/hiringService";
import RecordCard from "../RecordCard/RecordCard";

const styles = {
    wrapperBox: {
        marginTop: '2%'
    },
}


const MyHirings = () => {
    const [progress, setProgress] = useState(true);
    const [recordList, setRecordList] = useState(null);

    useEffect(() => {
        getRecords()
        .then(res => {
            setRecordList(res);
        })
        .catch(err => console.log(err))
        .finally(() => setProgress(false));
    },[])

    return ( 
        <Box sx={styles.wrapperBox}>
            {progress && <CircularProgress />

            }
            {!progress &&
            <>
            {recordList && recordList.map((record, index) => {
                return (
                <React.Fragment key={index}>
                {index !== 0 &&
                    <Divider sx={{maxWidth: '600px'}} />
                }
                <RecordCard record={record}/>
                </React.Fragment>
            )})
            }
            </>
            }
            </Box>
      );
}
 
export default MyHirings;