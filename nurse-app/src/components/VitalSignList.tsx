import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import {
    TableContainer,
    Paper,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Box,
} from "@mui/material";
import { VitalSign } from "../interfaces/VitalSign";
import { useNavigate, useParams } from "react-router-dom";
import { convertToDate } from "../utils/convertDate";
import AddIcon from "@mui/icons-material/Add";
const VITAL_SIGNS = gql`
    query VitalSignByPatient($patientId: ID) {
        vitalSignByPatient(patientId: $patientId) {
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
const DELETE_VITAL_SIGN = gql`
    mutation Mutation($deleteVitalSignId: ID) {
        deleteVitalSign(id: $deleteVitalSignId) {
            id
        }
    }
`;
const VitalSignList = () => {
    const { patientId } = useParams() as { patientId: string };
    const navigate = useNavigate();
    const { data } = useQuery<{ vitalSignByPatient: VitalSign[] }>(
        VITAL_SIGNS,
        {
            variables: {
                patientId: patientId,
            },
            onError: () => {
                navigate("/");
            },
        }
    );
    const [deleteMutation] = useMutation(DELETE_VITAL_SIGN);
    const client = useApolloClient();
    return (
        <TableContainer
            sx={{ padding: 1, width: "95%", margin: "auto", marginTop: 2 }}
            component={Paper}
        >
            <Box display={"flex"} justifyContent={"space-between"}>
                <Typography component={"h1"} fontSize={26} fontWeight={"bold"}>
                    Vital Signs List
                </Typography>
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                        navigate("add");
                    }}
                >
                    Add <AddIcon />
                </Button>
            </Box>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Blood Pressure</TableCell>
                        <TableCell align="left">Temperature</TableCell>
                        <TableCell align="left">Heart Rate</TableCell>
                        <TableCell align="left">Oxygen Saturation</TableCell>
                        <TableCell align="left">Respiratory Rate</TableCell>
                        <TableCell align="left">Update Time</TableCell>
                        <TableCell align="left">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.vitalSignByPatient.map((vitalSign) => (
                        <TableRow
                            key={vitalSign.id}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                                cursor: "pointer",
                            }}
                            hover={true}
                        >
                            <TableCell component="th" scope="row">
                                {vitalSign.bloodPressure}
                            </TableCell>
                            <TableCell align="left">
                                {vitalSign.temperature}
                            </TableCell>
                            <TableCell align="left">
                                {vitalSign.heartRate}
                            </TableCell>
                            <TableCell align="left">
                                {vitalSign.oxygenSaturation}
                            </TableCell>
                            <TableCell align="left">
                                {vitalSign.respiratoryRate}
                            </TableCell>
                            <TableCell align="left">
                                {convertToDate(vitalSign.updatedAt)}
                            </TableCell>
                            <TableCell align="left">
                                <Button>Edit</Button>
                                <Button
                                    color="error"
                                    onClick={async () => {
                                        const response = await deleteMutation({
                                            variables: {
                                                deleteVitalSignId: vitalSign.id,
                                            },
                                        });
                                        if (response.data?.deleteVitalSign.id) {
                                            client.refetchQueries({
                                                include: "all",
                                            });
                                            navigate(0);
                                        }
                                    }}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default VitalSignList;
