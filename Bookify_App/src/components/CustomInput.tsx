import {TextField, TextFieldProps} from "@mui/material";

const CustomInput = ({InputProps, ...props}: TextFieldProps) => (
    <TextField
        variant="standard"
        InputProps={{
            ...InputProps,
            disableUnderline: true,
            startAdornment: InputProps?.startAdornment,
            sx: {
                borderRadius: "999px",
                backgroundColor: "white",
                height: 40,
                px: 2,
                display: "flex",
                alignItems: "center",
            },
        }}
        inputProps={{
            ...props.inputProps,
            style: {
                padding: 0,
                height: "100%",
                display: "flex",
                alignItems: "center",
            },
        }}
        {...props}
    />
);

export default CustomInput;