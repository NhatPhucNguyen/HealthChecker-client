import { gql, useMutation, useQuery } from "@apollo/client";
import { Box, Button, Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useModalContext } from "../context/ModalContext";

const GET_SYMPTOMS = gql`
    query Symptoms {
        symptoms {
            label
            value
        }
    }
`;
const SEND_SYMPTOMS = gql`
    mutation Mutation($symptomInput: SymptomInput) {
        createSymptom(symptomInput: $symptomInput) {
            patientId
            symptoms {
                label
                value
            }
        }
    }
`;
type Symptom = {
    label: string;
    value: string;
};
const SymptomsList = () => {
    const { userId: patientId } = jwtDecode(
        localStorage.getItem("token") as string
    ) as { userId: string };
    const { data } = useQuery<{ symptoms: Symptom[] }>(GET_SYMPTOMS);
    const [sendSymptoms] = useMutation(SEND_SYMPTOMS);
    const [symptoms, setSymptoms] = useState<Symptom[]>([]);
    const { openModal } = useModalContext();
    return (
        <Box padding={1}>
            <Typography variant="h2" fontSize={24} fontWeight={"bold"}>Please select at least 5 symptoms:</Typography>
            <Grid container columns={3}>
                {data?.symptoms.slice(0, 30).map((symptom) => {
                    return (
                        <Grid item xs={1} key={symptom.value}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name={symptom.value}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSymptoms([
                                                    ...symptoms,
                                                    {
                                                        label: symptom.label,
                                                        value: symptom.value,
                                                    },
                                                ]);
                                            } else {
                                                setSymptoms(
                                                    symptoms.filter(
                                                        (s) =>
                                                            s.value !==
                                                            symptom.value
                                                    )
                                                );
                                            }
                                        }}
                                    />
                                }
                                label={symptom.label}
                                sx={{
                                    display: "block",
                                    marginTop: 1,
                                }}
                            />
                        </Grid>
                    );
                })}
            </Grid>
            <Button
                variant="contained"
                sx={{ width: 250, marginTop: 2 }}
                onClick={async () => {
                    if (symptoms.length < 5) {
                        openModal({
                            title: "Symptoms not sent",
                            content: "Please select at least 5 symptoms.",
                            color: "red",
                        });
                        return;
                    }
                    const response = await sendSymptoms({
                        variables: { symptomInput: { patientId, symptoms } },
                    });
                    if (response.data) {
                        openModal({
                            title: "Symptoms sent successfully",
                            content: "Please wait for the nurse to respond.",
                        });
                    }
                }}
            >
                Send
            </Button>
        </Box>
    );
};

export default SymptomsList;
