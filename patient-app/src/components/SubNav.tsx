import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const SubNav = () => {
    return (
        <Box display={"flex"} padding={2} gap={1}>
            <Button to={"/"} variant={"outlined"} component={Link}>
                Symptoms
            </Button>
            <Button to={"fitnessGames"} variant="outlined" component={Link}>
                Fitness Games
            </Button>
        </Box>
    );
};

export default SubNav;
