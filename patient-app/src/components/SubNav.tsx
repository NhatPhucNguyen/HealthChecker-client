import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import { useModalContext } from "../context/ModalContext";
const SubNav = () => {
    const { openModal } = useModalContext();
    return (
        <Box display={"flex"} padding={2} gap={1}>
            <Button
                variant="contained"
                color="error"
                onClick={() => {
                    openModal(
                        {
                            title: "Send Alert",
                            content: "Please enter the alert message",
                        },
                        true
                    );
                }}
            >
                Send Alert <AddAlertIcon />
            </Button>
            <Button to={"/"} variant={"outlined"} component={Link}>
                Symptoms
            </Button>
            <Button
                to={"dailyInformation"}
                variant={"outlined"}
                component={Link}
            >
                Daily Information
            </Button>
            <Button to={"fitnessGames"} variant="outlined" component={Link}>
                Fitness Games
            </Button>
        </Box>
    );
};

export default SubNav;
