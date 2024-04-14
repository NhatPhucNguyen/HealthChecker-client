import { gql, useQuery } from "@apollo/client";
import {
    Box,
    Checkbox,
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import isValidUrl from "../../utils/validateUrl";
import { useModalContext } from "../context/ModalContext";
import DailyTip from "../interfaces/DailyTip";
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
const FitnessGames = () => {
    const { openModal } = useModalContext();
    const { userId: patientId } = jwtDecode(
        localStorage.getItem("token") as string
    ) as { userId: string };
    const { data } = useQuery<{ dailyTipByPatient: DailyTip[] }>(
        GET_DAILY_TIPS,
        {
            variables: {
                patientId: patientId,
            },
        }
    );
    const [count, setCount] = useState(0);
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
                        Fitness Games
                    </Typography>
                </Box>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="left">Content</TableCell>
                            <TableCell align="left">Reference</TableCell>
                            <TableCell align="left">Complete</TableCell>
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
                                    <Checkbox
                                        color="success"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setCount((prev) => {
                                                    const newCount = prev + 1;
                                                    if (
                                                        newCount ===
                                                        data?.dailyTipByPatient
                                                            .length
                                                    ) {
                                                        openModal({
                                                            title: "Congratulations",
                                                            content:
                                                                "You have completed all the fitness games",
                                                        });
                                                    }
                                                    return newCount;
                                                });
                                            } else {
                                                setCount(
                                                    count === 0 ? 0 : count - 1
                                                );
                                            }
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default FitnessGames;
