import { gql, useMutation } from "@apollo/client";
import { Alert, Box, Button, Link, TextField, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
const LOGIN = gql`
    mutation Login($loginInput: LoginInput) {
        login(loginInput: $loginInput) {
            isSuccess
            message
            token
        }
    }
`;
type LoginInput = {
    username: string;
    password: string;
};
type LoginResponse = {
    data?: {
        login: {
            isSuccess: boolean;
            message: string;
            token: string;
        };
    };
};
const LoginForm = () => {
    const [loginMutation] = useMutation(LOGIN);
    const [loginInput, setLoginInput] = useState<LoginInput>({} as LoginInput);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const [alert, setAlert] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const { data } = (await loginMutation({
            variables: { loginInput },
        })) as LoginResponse;
        if (data && data.login.isSuccess) {
            localStorage.setItem("token", data.login.token);
            const decoded = jwtDecode(data.login.token) as {
                role?: "nurse" | "patient";
            };
            if (decoded.role) {
                navigate(`/${decoded.role}`);
            }
        } else {
            setAlert(data?.login.message || "Something went wrong !");
        }
    };
    return (
        <Box
            component={"form"}
            borderRadius={2}
            boxShadow={1}
            padding={2}
            width={500}
            margin={"auto"}
            marginTop={2}
            onSubmit={handleSubmit}
        >
            <Typography
                textAlign={"center"}
                fontSize={"1.5rem"}
                fontWeight={"bold"}
                marginBottom={1}
            >
                Login
            </Typography>
            {alert && (
                <Alert
                    severity="error"
                    sx={{ textAlign: "center", marginBottom: 2 }}
                >
                    {alert}
                </Alert>
            )}
            <TextField
                label={"Username"}
                fullWidth
                sx={{ marginBottom: 2 }}
                onChange={handleChange}
                value={loginInput.username || ""}
                name="username"
            />
            <TextField
                label={"Password"}
                type="password"
                fullWidth
                sx={{ marginBottom: 2 }}
                onChange={handleChange}
                value={loginInput.password || ""}
                name="password"
            />
            <Box textAlign={"center"} width={"100%"} marginBottom={2}>
                <Link href="/register">Don't have an account ?</Link>
            </Box>
            <Button
                sx={{ margin: "auto", display: "block" }}
                variant="contained"
                type="submit"
            >
                Login
            </Button>
        </Box>
    );
};

export default LoginForm;
