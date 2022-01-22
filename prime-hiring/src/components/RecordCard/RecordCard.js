import { Box, Typography } from "@mui/material";
import LetterAvatar from "lettered-avatar";
import moment from "moment";

const styles = {
  cardContainerStyle: {
    paddingLeft: "2%",
    paddingRight: "10%",
    paddingTop: "1%",
    paddingBottom: "1%",
  },
  nameStyle: {
    paddingTop: '1%',
    fontWeight: 'bold',
    marginLeft: "1%",
  },
  avatarWrapperBox: {
    display: "flex",
  },
  cardContetntBoxStyle: {
    marginTop: "1%",
  },
};

const RecordCard = (props) => {
  return (
    <Box sx={styles.cardContainerStyle}>
      <Box sx={styles.avatarWrapperBox}>
        <LetterAvatar
          name={props.record.developer.name}
          imgSrc={
            props.record.developer.profilePic
              ? props.record.developer.profilePic
              : null
          }
          options={{
            twoLetter: true,
            size: 55,
            shape: "square",
          }}
        />
        <Typography sx={styles.nameStyle} variant="h5" >
          {props.record.developer.name}
        </Typography>
      </Box>
      <Box sx={styles.cardContetntBoxStyle}>
        <Typography variant="h6">
          Hired from{" "}
          {moment(props.record.startDate).format("MMM D YYYY").toString()} to{" "}
          {moment(props.record.endDate).format("MMM D YYYY").toString()} for{" "}
          {props.record.developer.pricePerHour} per hour.
        </Typography>
      </Box>
    </Box>
  );
};

export default RecordCard;
