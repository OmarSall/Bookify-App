import styles from "./ContactDetails.module.css";
import { Avatar, Typography } from "@mui/material";

type ContactDetailsProps = {
    name: string;
    contact: {
        phone: string;
        email: string;
    };
};

const ContactDetails = ({ name, contact }: ContactDetailsProps) => {
    return (
        <div className={styles.contact}>
            <Avatar
                src="https://i.pravatar.cc/150?img=12"
                alt={`Host ${name}`}
                className={styles.avatar}
            />
            <div className={styles.info}>
                <Typography variant="subtitle1">Hosted by {name}</Typography>
                <Typography variant="body2" color="textSecondary">
                    Response time: within 1 hour
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Contact: {contact.email}
                </Typography>
            </div>
        </div>
    );
};

export default ContactDetails;