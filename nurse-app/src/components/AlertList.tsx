import { gql, useQuery } from "@apollo/client";
import { Alert, Box, Typography } from "@mui/material";
import AlertMessage from "../interfaces/Alert";
import { useParams } from "react-router-dom";

const ALERTS = gql`
    query AlertsByPatient($patientId: ID) {
        alertsByPatient(patientId: $patientId) {
            status
            message
            createdAt
        }
    }
`;

const AlertList = () => {
    const { patientId } = useParams() as { patientId: string };
    const { data } = useQuery<{ alertsByPatient: AlertMessage[] }>(ALERTS, {
        variables: {
            patientId: patientId,
        },
    });
    return (
        <Box marginTop={2}>
            <Typography
                component={"h2"}
                fontSize={26}
                fontWeight={"bold"}
                textAlign={"center"}
            >
                Alerts
            </Typography>
            <Box width={500} margin={"auto"}>
                {data?.alertsByPatient.map((alert) => {
                    return <Alert severity="error">{alert.message}</Alert>;
                })}
            </Box>
        </Box>
    );
};

export default AlertList;
