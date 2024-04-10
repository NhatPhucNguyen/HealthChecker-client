import {
    Box,
    Button,
    FormControl,
    FormLabel,
    TextField,
    Typography,
} from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { VitalSign } from "../interfaces/VitalSign";
type FormProps = {
    isUpdate?: boolean;
};
const VitalSignForm = ({ isUpdate }: FormProps) => {
    const { patientId } = useParams() as { patientId: string };
    const [vitalSign, setVitalSign] = useState<VitalSign>({} as VitalSign);
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        vitalSign.patient = patientId;
    };
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setVitalSign((prev) => ({
            ...prev,
            [e.target.id]: parseFloat(e.target.value),
        }));
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
                Add Vital Sign
            </Typography>
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
