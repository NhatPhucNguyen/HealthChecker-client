import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import DailyInformationData from "../interfaces/DailyInformation";
import {
    Box,
    Typography,
    Alert,
    FormControl,
    FormLabel,
    TextField,
    Button,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const ADD_DAILY_INFORMATION = gql`
    mutation CreateDailyInformation(
        $dailyInformationInput: DailyInformationInput
    ) {
        createDailyInformation(dailyInformationInput: $dailyInformationInput) {
            id
            patientId
            updatedAt
        }
    }
`;

const UPDATE_DAILY_INFORMATION = gql`
    mutation UpdateDailyInformation(
        $updateDailyInformationId: ID
        $dailyInformationInput: DailyInformationInput
    ) {
        updateDailyInformation(
            id: $updateDailyInformationId
            dailyInformationInput: $dailyInformationInput
        ) {
            id
            patientId
            updatedAt
        }
    }
`;
const GET_DAILY_INFORMATION = gql`
    query Query($dailyInformationId: ID) {
        dailyInformation(id: $dailyInformationId) {
            bloodPressure
            pulseRate
            respiratoryRate
            temperature
            weight
            patientId
        }
    }
`;
type DailyInformationFormProps = {
    isUpdate?: boolean;
};
const DailyInformationForm = ({ isUpdate }: DailyInformationFormProps) => {
    const navigate = useNavigate();
    const client = useApolloClient();
    const { userId: patientId } = jwtDecode(
        localStorage.getItem("token") as string
    ) as { userId: string };
    const { dailyInformationId } = useParams() as {
        dailyInformationId: string;
    };
    const [dailyInformation, setDailyInformation] =
        useState<DailyInformationData>({
            patientId: patientId,
        } as DailyInformationData);
    useQuery<{ dailyInformation: DailyInformationData }>(
        GET_DAILY_INFORMATION,
        {
            variables: {
                dailyInformationId,
            },
            skip: !isUpdate,
            onCompleted: (data) => {
                setDailyInformation(data.dailyInformation);
            },
        }
    );
    const [alert, setAlert] = useState("");
    const [addDailyInformation] = useMutation(ADD_DAILY_INFORMATION, {
        onError: (error) => {
            setAlert(error.message);
        }
    });
    const [updateDailyInformation] = useMutation(UPDATE_DAILY_INFORMATION, {
        onError: (error) => {
            setAlert(error.message);
        }
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDailyInformation({
            ...dailyInformation,
            [e.target.id]: parseFloat(e.target.value),
        });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isUpdate) {
            const response = await updateDailyInformation({
                variables: {
                    updateDailyInformationId: dailyInformationId,
                    dailyInformationInput: dailyInformation,
                },
            });
            if(response.data) {
                client.refetchQueries({ include: "all" });
                navigate("..");
            }
        } else {
            const response = await addDailyInformation({
                variables: {
                    dailyInformationInput: dailyInformation,
                },
            });
            if(response.data) {
                client.refetchQueries({ include: "all" });
                navigate("..");
            }
        }
    };
    return (
        <Box
            component={"form"}
            boxShadow={2}
            width={400}
            margin={"auto"}
            padding={1}
            onSubmit={handleSubmit}
        >
            <Typography
                component={"h2"}
                textAlign={"center"}
                fontSize={24}
                fontWeight={"bold"}
            >
                {isUpdate ? "Update Vital Sign" : "Add Vital Sign"}
            </Typography>
            {alert && <Alert severity="error">{alert}</Alert>}
            <FormControl fullWidth sx={{ marginTop: 1 }}>
                <FormLabel htmlFor="bloodPressure">Blood Pressure</FormLabel>
                <TextField
                    id="bloodPressure"
                    type="number"
                    fullWidth
                    onChange={handleChange}
                    value={dailyInformation.bloodPressure || ""}
                />
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: 1 }}>
                <FormLabel htmlFor="temperature">Temperature</FormLabel>
                <TextField
                    id="temperature"
                    type="number"
                    fullWidth
                    onChange={handleChange}
                    value={dailyInformation.temperature || ""}
                />
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: 1 }}>
                <FormLabel htmlFor="pulseRate">Pulse Rate</FormLabel>
                <TextField
                    id="pulseRate"
                    type="number"
                    fullWidth
                    onChange={handleChange}
                    value={dailyInformation.pulseRate || ""}
                />
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: 1 }}>
                <FormLabel htmlFor="respiratoryRate">
                    Respiratory Rate
                </FormLabel>
                <TextField
                    id="respiratoryRate"
                    type="number"
                    fullWidth
                    onChange={handleChange}
                    value={dailyInformation.respiratoryRate || ""}
                />
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: 1 }}>
                <FormLabel htmlFor="weight">Weight</FormLabel>
                <TextField
                    id="weight"
                    type="number"
                    fullWidth
                    onChange={handleChange}
                    value={dailyInformation.weight || ""}
                />
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: 2 }}>
                <Button
                    variant="contained"
                    sx={{ width: "50%", margin: "auto" }}
                    type="submit"
                >
                    Submit
                </Button>
            </FormControl>
        </Box>
    );
};

export default DailyInformationForm;
