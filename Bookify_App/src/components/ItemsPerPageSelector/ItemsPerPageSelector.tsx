import {useState} from "react";
import {Button, Menu, MenuItem} from "@mui/material";

type Props = {
    value: number;
    options: number[];
    onChange: (newVal: number) => void;
};

const ItemsPerPageSelector = ({value, options, onChange}: Props) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (newVal?: number) => {
        setAnchorEl(null);
        if (newVal !== undefined && newVal !== value) {
            onChange(newVal);
        }
    };

    return (
        <div style={{display: "flex", alignItems: "center", gap: "0.4rem"}}>
            <span>show</span>
            <Button variant="outlined" size="small" onClick={handleClick}>
                {value}
            </Button>
            <span>on the page</span>

            <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose()}>
                {options.map((option) => (
                    <MenuItem key={option} onClick={() => handleClose(option)}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default ItemsPerPageSelector;