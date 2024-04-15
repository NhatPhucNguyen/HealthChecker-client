import { gql, useApolloClient, useQuery } from "@apollo/client";
import HealingIcon from "@mui/icons-material/Healing";
import {
    Alert,
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Grid,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import AlertMessage from "../interfaces/Alert";
import { useState } from "react";
import { convertToDate } from "../utils/convertDate";
const ALERTS = gql`
    query AlertsByPatient($patientId: ID) {
        alertsByPatient(patientId: $patientId) {
            status
            message
            createdAt
        }
    }
`;

const SYMPTOMS_BY_PATIENT = gql`
    query Query($patientId: ID) {
        symptomsByPatient(patientId: $patientId) {
            symptoms {
                label
                value
            }
        }
    }
`;
const PREDICT = gql`
    query Predict($symptoms: [String]!) {
        predict(symptoms: $symptoms) {
            description
            disease
        }
    }
`;
type Symptom = {
    label: string;
    value: string;
};
type Disease = {
    description: string;
    disease: string;
};
const AlertList = () => {
    const client = useApolloClient();
    const { patientId } = useParams() as { patientId: string };
    const { data } = useQuery<{ alertsByPatient: AlertMessage[] }>(ALERTS, {
        variables: {
            patientId: patientId,
        },
    });
    const { data: symptomsData } = useQuery<{
        symptomsByPatient: { symptoms: Symptom[] };
    }>(SYMPTOMS_BY_PATIENT, {
        variables: {
            patientId: patientId,
        },
    });
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [diseases, setDiseases] = useState<Disease[]>([]);
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Grid container spacing={1} columns={2}>
                <Grid item xs={1}>
                    <Box>
                        <Typography
                            component={"h2"}
                            fontSize={26}
                            fontWeight={"bold"}
                            textAlign={"center"}
                        >
                            Alerts
                        </Typography>
                        <Box width={"80%"} margin={"auto"}>
                            {data?.alertsByPatient.map((alert) => {
                                return (
                                    <Alert severity="error">
                                        {alert.message} -{" "}
                                        {convertToDate(alert.createdAt)}
                                    </Alert>
                                );
                            })}
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={1}>
                    <Box sx={{ backgroundColor: "#f6ffde", padding: 1 }}>
                        <Typography
                            component={"h2"}
                            fontSize={26}
                            fontWeight={"bold"}
                            textAlign={"center"}
                        >
                            Symptoms
                        </Typography>
                        <Box width={"100%"} margin={"auto"}>
                            <List disablePadding>
                                {symptomsData?.symptomsByPatient.symptoms.map(
                                    (symptom) => {
                                        return (
                                            <ListItemButton key={symptom.value}>
                                                <ListItemIcon>
                                                    <HealingIcon />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={symptom.label}
                                                />
                                            </ListItemButton>
                                        );
                                    }
                                )}
                            </List>
                            <Button
                                variant="contained"
                                sx={{
                                    margin: "auto",
                                    display: "block",
                                    marginTop: 1,
                                }}
                                onClick={async () => {
                                    setOpen(true);
                                    setLoading(true);
                                    const symptoms =
                                        symptomsData?.symptomsByPatient.symptoms.map(
                                            (symptom) => symptom.value
                                        );
                                    const response = await client.query({
                                        query: PREDICT,
                                        variables: {
                                            symptoms: symptoms,
                                        },
                                        fetchPolicy: "no-cache",
                                    });
                                    if (response.data) {
                                        console.log(response.data);
                                        setDiseases(
                                            response.data.predict as Disease[]
                                        );
                                        setLoading(false);
                                    }
                                }}
                            >
                                Predict
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                }}
                open={open}
            >
                {loading ? (
                    <CircularProgress color="inherit" />
                ) : diseases.length > 0 ? (
                    diseases.map((disease) => {
                        return (
                            <Alert severity="info" sx={{ width: "80%" }}>
                                {disease.disease} - {disease.description}
                            </Alert>
                        );
                    })
                ) : (
                    <Alert severity="warning">
                        {"No diseases predicted. Please try again later."}
                    </Alert>
                )}

                <Button
                    sx={{ display: "block" }}
                    onClick={handleClose}
                    variant="contained"
                    color="warning"
                >
                    Cancel
                </Button>
            </Backdrop>
        </>
    );
};

export default AlertList;
