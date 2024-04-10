import {
    Alert,
    Box,
    Button,
    FormControl,
    FormLabel,
    TextField,
    Typography,
} from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VitalSign } from "../interfaces/VitalSign";
import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
type FormProps = {
    isUpdate?: boolean;
};
const ADD_VITAL_SIGN = gql`
    mutation Mutation($vitalSignInput: VitalSignInput) {
        addVitalSign(vitalSignInput: $vitalSignInput) {
            id
            patient
        }
    }
`;
const UPDATE_VITAL_SIGN = gql`
    mutation UpdateVitalSign(
        $updateVitalSignId: ID
        $vitalSignInput: VitalSignInput
    ) {
        updateVitalSign(
            id: $updateVitalSignId
            vitalSignInput: $vitalSignInput
        ) {
            bloodPressure
            heartRate
            id
            oxygenSaturation
            patient
            respiratoryRate
            temperature
            updatedAt
        }
    }
`;
const GET_VITAL_SIGN = gql`
    query Query($vitalSignId: ID) {
        vitalSign(id: $vitalSignId) {
            bloodPressure
            heartRate
            oxygenSaturation
            respiratoryRate
            temperature
            patient
        }
    }
`;
const VitalSignForm = ({ isUpdate }: FormProps) => {
    const client = useApolloClient();
    const { patientId } = useParams() as { patientId: string };
    const { vitalSignId } = useParams() as { vitalSignId: string };
    const navigate = useNavigate();
    const [vitalSign, setVitalSign] = useState<VitalSign>({} as VitalSign);
    const [alert, setAlert] = useState("");
    const [addVitalSignMutation] = useMutation(ADD_VITAL_SIGN, {
        onError: (error) => {
            setAlert(error.message);
        },
    });
    const [updateVitalSignMutation] = useMutation(UPDATE_VITAL_SIGN, {
        onError: (error) => {
            setAlert(error.message);
        },
    });
    const { data } = useQuery<{ vitalSign: VitalSign }>(GET_VITAL_SIGN, {
        variables: { vitalSignId },
        skip: !isUpdate,
        onError: () => {
            navigate("..");
        },
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isUpdate) {
            const response = await addVitalSignMutation({
                variables: {
                    vitalSignInput: { ...vitalSign, patient: patientId },
                },
            });
            if (response.data) {
                client.refetchQueries({ include: "all" });
                navigate("../..");
            }
        }
        if (vitalSignId) {
            const response = await updateVitalSignMutation({
                variables: {
                    vitalSignInput: vitalSign,
                    updateVitalSignId: vitalSignId,
                },
            });
            if (response.data) {
                client.refetchQueries({ include: "all" });
                navigate("../..");
            }
        }
    };
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setVitalSign((prev) => ({
            ...prev,
            [e.target.id]: parseFloat(e.target.value),
        }));
    };
    useEffect(() => {
        if (data?.vitalSign) {
            console.log(data.vitalSign);
            setVitalSign(data.vitalSign);
        }
    }, [data?.vitalSign]);
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
                    value={vitalSign.bloodPressure || ""}
                />
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: 1 }}>
                <FormLabel htmlFor="temperature">Temperature</FormLabel>
                <TextField
                    id="temperature"
                    type="number"
                    fullWidth
                    onChange={handleChange}
                    value={vitalSign.temperature || ""}
                />
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: 1 }}>
                <FormLabel htmlFor="heartRate">Heart Rate</FormLabel>
                <TextField
                    id="heartRate"
                    type="number"
                    fullWidth
                    onChange={handleChange}
                    value={vitalSign.heartRate || ""}
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
                    value={vitalSign.respiratoryRate || ""}
                />
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: 1 }}>
                <FormLabel htmlFor="oxygenSaturation">
                    Oxygen Saturation
                </FormLabel>
                <TextField
                    id="oxygenSaturation"
                    type="number"
                    fullWidth
                    onChange={handleChange}
                    value={vitalSign.oxygenSaturation || ""}
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

export default VitalSignForm;
