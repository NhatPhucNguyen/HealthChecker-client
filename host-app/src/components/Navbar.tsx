import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";
import { useLocation } from "react-router-dom";

const Navbar = () => {
    const token = localStorage.getItem("token");
    const location = useLocation();
    return (
        <AppBar key={location.pathname}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    GroupProject
                </IconButton>
                <Box sx={{ flexGrow: 1 }}>
                    <Button type="button" href="/" color="inherit">
                        Home
                    </Button>
                </Box>
                {token ? (
                    <Button
                        color="warning"
                        variant="contained"
                        onClick={() => {
                            localStorage.removeItem("token");
                            window.location.href = "/";
                        }}
                    >
                        Logout
                    </Button>
                ) : (
                    <Button
                        color="success"
                        variant="contained"
                        onClick={() => {
                            window.location.href = "/";
                        }}
                    >
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
