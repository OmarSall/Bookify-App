import styles from "./ContactDetails.module.css";
import {Typography} from "@mui/material";
import {Phone, Email} from "@mui/icons-material";

type ContactDetailsProps = {
    contact: {
        phone: string;
        email: string;
    };
};

const ContactDetails = ({contact}: ContactDetailsProps) => {
    return (
        <div className={styles.wrapper}>
            <Typography variant="subtitle1" className={styles.heading}>
                Contact this venue
            </Typography>
            <hr className={styles.line}/>

            <div className={styles.row}>
                <Phone fontSize="small"/>
                <Typography variant="body2">{contact.phone}</Typography>
            </div>

            <div className={styles.row}>
                <Email fontSize="small"/>
                <Typography variant="body2">{contact.email}</Typography>
            </div>
        </div>
    );
};

export default ContactDetails;