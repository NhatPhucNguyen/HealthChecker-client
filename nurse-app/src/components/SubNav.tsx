import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const SubNav = () => {
    return (
        <Box display={"flex"} padding={2} gap={1}>
            <Button to={"/"} variant={"outlined"} color="warning" component={Link}>
                Back to patients
            </Button>
            <Button to={"vitalSigns"} variant={"outlined"} component={Link}>
                Vital Signs
            </Button>
            <Button to={"dailyTips"} variant="outlined" component={Link}>
                Daily Tips
            </Button>
            <Button to={"alerts"} variant="outlined" component={Link}>
                Alerts
            </Button>
        </Box>
    );
};

export default SubNav;
