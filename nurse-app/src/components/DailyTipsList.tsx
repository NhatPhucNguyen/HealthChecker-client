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
    Link,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";
import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import DailyTip from "../interfaces/DailyTip";
import isValidUrl from "../utils/validateUrl";
const GET_DAILY_TIPS = gql`
    query DailyTipByPatient($patientId: ID) {
        dailyTipByPatient(patientId: $patientId) {
            content
            id
            patient
            reference
            title
        }
    }
`;
const DELETE_DAILY_TIP = gql`
    mutation Mutation($deleteDailyTipId: ID) {
        deleteDailyTip(id: $deleteDailyTipId) {
            id
        }
    }
`;
const DailyTipsList = () => {
    const navigate = useNavigate();
    const client = useApolloClient();
    const { patientId } = useParams() as { patientId: string };
    const { data } = useQuery<{ dailyTipByPatient: DailyTip[] }>(
        GET_DAILY_TIPS,
        {
            variables: {
                patientId: patientId,
            },
        }
    );
    const [deleteMutation] = useMutation(DELETE_DAILY_TIP);
    return (
        <>
            <TableContainer
                sx={{
                    padding: 1,
                    width: "95%",
                    margin: "auto",
                    marginTop: 2,
                    backgroundColor: "#e4f7f9",
                }}
                component={Paper}
            >
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography
                        component={"h1"}
                        fontSize={26}
                        fontWeight={"bold"}
                    >
                        Daily Tips
                    </Typography>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                            navigate("dailyTips/add");
                        }}
                    >
                        Add <AddIcon />
                    </Button>
                </Box>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="left">Content</TableCell>
                            <TableCell align="left">Reference</TableCell>
                            <TableCell align="left">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.dailyTipByPatient.map((dailyTip) => (
                            <TableRow
                                key={dailyTip.id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                    cursor: "pointer",
                                }}
                                hover={true}
                            >
                                <TableCell component="th" scope="row">
                                    {dailyTip.title}
                                </TableCell>
                                <TableCell align="left">
                                    {dailyTip.content}
                                </TableCell>
                                <TableCell align="left">
                                    {isValidUrl(dailyTip.reference) ? (
                                        <Link
                                            href={dailyTip.reference}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {dailyTip.reference.length > 20
                                                ? "Link"
                                                : dailyTip.reference}
                                        </Link>
                                    ) : (
                                        "No Reference"
                                    )}
                                </TableCell>
                                <TableCell align="left">
                                    <Button
                                        onClick={() => {
                                            navigate(
                                                `dailyTips/edit/${dailyTip.id}`
                                            );
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
                                                        deleteDailyTipId:
                                                            dailyTip.id,
                                                    },
                                                });
                                            if (
                                                response.data?.deleteDailyTip.id
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

export default DailyTipsList;
