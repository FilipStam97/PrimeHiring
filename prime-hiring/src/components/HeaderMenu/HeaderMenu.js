import {AppBar , Box , Toolbar , Typography , Button  } from '@mui/material';
import { useHistory } from 'react-router-dom';


const styles = {
    navLinkStyle: {
        marginRight: '2%',
        textDecoration: 'none',
        fontSize: '15px'
    },
    contentContainerBox: {
        paddingRight: '16.5%', 
        paddingLeft: '16.5%'
    },
    logoStyle: {
      "&:hover":{
        cursor: 'pointer'
      }
    }
}


const HeaderMenu = (props) => {
  let history = useHistory();
    return ( 
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{paddingRight: '15%', paddingLeft: '15%'}}>
          <Toolbar >
            <Typography sx={styles.logoStyle} onClick ={() => history.push('/')} variant="h4" component="div" sx={{ flexGrow: 1 }}>
              PrimeHiring
            </Typography>
            <Button  sx={styles.navLinkStyle} onClick ={() => history.push('/')} color="inherit">My Hirings</Button>
            <Button  sx={styles.navLinkStyle} onClick ={() => history.push('/browse')} color="inherit">Browse</Button>
          
          </Toolbar>
        </AppBar>
        <Box sx={styles.contentContainerBox}>
        {props.childernComponents}
        </Box>
      </Box>
     );
}
 
export default HeaderMenu;