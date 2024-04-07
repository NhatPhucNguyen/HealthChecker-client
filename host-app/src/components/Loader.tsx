import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
    return (
        <Box
            sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default Loader;
