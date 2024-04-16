import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { jwtDecode } from "jwt-decode";
import DailyInformationData from "../interfaces/DailyInformation";
import {
    TableContainer,
    Paper,
    Box,
    Typography,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { convertToDate } from "../../utils/convertDate";
const GET_DAILY_INFORMATION = gql`
    query DailyInformationByPatient($patientId: ID) {
        dailyInformationByPatient(patientId: $patientId) {
            bloodPressure
            id
            pulseRate
            respiratoryRate
            temperature
            updatedAt
            weight
        }
    }
`;
const DELETE_DAILY_INFORMATION = gql`
    mutation Mutation($deleteDailyInformationId: ID) {
        deleteDailyInformation(id: $deleteDailyInformationId) {
            id
            patientId
        }
    }
`;
const DailyInformation = () => {
    const navigate = useNavigate();
    const { userId: patientId } = jwtDecode(
        localStorage.getItem("token") as string
    ) as { userId: string };
    const { data } = useQuery<{
        dailyInformationByPatient: DailyInformationData[];
    }>(GET_DAILY_INFORMATION, {
        variables: { patientId },
    });
    const [deleteMutation] = useMutation(DELETE_DAILY_INFORMATION);
    const client = useApolloClient();
    return (
        <>
            <TableContainer
                sx={{ padding: 1, width: "95%", margin: "auto", marginTop: 2 }}
                component={Paper}
            >
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography
                        component={"h1"}
                        fontSize={26}
                        fontWeight={"bold"}
                    >
                        Daily Information
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
                            <TableCell align="left">Pulse Rate</TableCell>
                            <TableCell align="left">Weight</TableCell>
                            <TableCell align="left">Respiratory Rate</TableCell>
                            <TableCell align="left">Update Time</TableCell>
                            <TableCell align="left">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.dailyInformationByPatient.map((dailyInfo) => (
                            <TableRow
                                key={dailyInfo.id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                    cursor: "pointer",
                                }}
                                hover={true}
                            >
                                <TableCell component="th" scope="row">
                                    {dailyInfo.bloodPressure}
                                </TableCell>
                                <TableCell align="left">
                                    {dailyInfo.temperature}
                                </TableCell>
                                <TableCell align="left">
                                    {dailyInfo.pulseRate}
                                </TableCell>
                                <TableCell align="left">
                                    {dailyInfo.weight}
                                </TableCell>
                                <TableCell align="left">
                                    {dailyInfo.respiratoryRate}
                                </TableCell>
                                <TableCell align="left">
                                    {convertToDate(dailyInfo.updatedAt)}
                                </TableCell>
                                <TableCell align="left">
                                    <Button
                                        onClick={() => {
                                            navigate(`edit/${dailyInfo.id}`);
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        color="error"
                                        onClick={async () => {
                                            const response =
                                                await deleteMutation({
                                                    variables: {
                                                        deleteDailyInformationId:
                                                            dailyInfo.id,
                                                    },
                                                });
                                            if (
                                                response.data?.deleteVitalSign
                                                    .id
                                            ) {
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
        </>
    );
};

export default DailyInformation;
