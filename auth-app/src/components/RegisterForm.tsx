import { gql, useMutation } from "@apollo/client";
import {
    Alert,
    Box,
    Button,
    FormControl,
    InputLabel,
    Link,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
const REGISTER = gql`
    mutation Register($registerInput: RegisterInput) {
        register(registerInput: $registerInput) {
            isSuccess
            message
            token
        }
    }
`;
type RegisterInput = {
    username: string;
    password: string;
    role: "nurse" | "patient";
    dateOfBirth: string;
    address: string;
    city: string;
    phoneNumber: string;
    email: string;
};

const RegisterForm = () => {
    const [registerInput, setRegisterInput] = useState<RegisterInput>({
        role: "nurse",
    } as RegisterInput);
    const navigate = useNavigate();
    const [alert, setAlert] = useState("");
    const [registerMutation] = useMutation(REGISTER);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRegisterInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await registerMutation({
            variables: { registerInput },
        });
        if (response.data.register.isSuccess) {
            navigate("/");
        } else {
            setAlert(response.data.register.message);
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
            marginBottom={2}
            onSubmit={handleSubmit}
        >
            <Typography
                textAlign={"center"}
                fontSize={"1.5rem"}
                fontWeight={"bold"}
                marginBottom={1}
            >
                Register
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
                name="username"
                onChange={handleChange}
                value={registerInput.username}
            />
            <TextField
                label={"Password"}
                type="password"
                fullWidth
                sx={{ marginBottom: 2 }}
                name="password"
                onChange={handleChange}
                value={registerInput.password}
            />
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Role"
                    onChange={(e) => {
                        setRegisterInput((prev) => ({
                            ...prev,
                            role: e.target.value as "nurse" | "patient",
                        }));
                    }}
                    value={registerInput.role}
                    defaultValue="nurse"
                >
                    <MenuItem value={"nurse"}>Nurse</MenuItem>
                    <MenuItem value={"patient"}>Patient</MenuItem>
                </Select>
            </FormControl>
            <DatePicker
                label="Date Of Birth"
                sx={{ width: "100%", marginBottom: 2 }}
                onChange={(date) => {
                    setRegisterInput((prev) => ({
                        ...prev,
                        dateOfBirth: date?.toISOString() || "",
                    }));
                }}
            />
            <TextField
                label={"Address"}
                fullWidth
                sx={{ marginBottom: 2 }}
                name="address"
                onChange={handleChange}
                value={registerInput.address || ""}
            />
            <TextField
                label={"City"}
                fullWidth
                sx={{ marginBottom: 2 }}
                name="city"
                onChange={handleChange}
                value={registerInput.city || ""}
            />
            <TextField
                label={"Phone Number"}
                fullWidth
                sx={{ marginBottom: 2 }}
                name="phoneNumber"
                onChange={handleChange}
                value={registerInput.phoneNumber || ""}
            />
            <TextField
                label={"Email"}
                type="email"
                fullWidth
                sx={{ marginBottom: 2 }}
                name="email"
                onChange={handleChange}
                value={registerInput.email || ""}
            />
            <Box textAlign={"center"} width={"100%"} marginBottom={2}>
                <Link href="/">Already have an account ?</Link>
            </Box>
            <Button
                variant="contained"
                sx={{ display: "block", margin: "auto" }}
                type="submit"
            >
                Register
            </Button>
        </Box>
    );
};

export default RegisterForm;
