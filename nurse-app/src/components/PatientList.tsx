import { gql, useQuery } from "@apollo/client";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { Patient } from "../interfaces/Patient";
import { useNavigate } from "react-router-dom";
import { convertToDate } from "../utils/convertDate";
const PATIENTS = gql`
    query Patients {
        patients {
            id
            address
            city
            email
            fullName
            phoneNumber
            dateOfBirth
        }
    }
`;
const PatientList = () => {
    const navigate = useNavigate();
    const { data } = useQuery<{ patients: Patient[] }>(PATIENTS, {
        onError: () => {
            navigate("/");
        },
    });
    return (
        <TableContainer sx={{padding:1,width:"95%",margin:"auto",marginTop:2}} component={Paper}>
            <Typography component={"h1"} fontSize={26} fontWeight={"bold"}>Patient List</Typography>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Patient Name</TableCell>
                        <TableCell align="left">Date Of Birth</TableCell>
                        <TableCell align="left">Address</TableCell>
                        <TableCell align="left">City</TableCell>
                        <TableCell align="left">Phone Number</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="left">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.patients.map((patient) => (
                        <TableRow
                            key={patient.id}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                                cursor: "pointer",
                            }}
                            hover={true}
                        >
                            <TableCell component="th" scope="row">
                                {patient.fullName}
                            </TableCell>
                            <TableCell align="left">
                                {convertToDate(patient.dateOfBirth).toString()}
                            </TableCell>
                            <TableCell align="left">
                                {patient.address}
                            </TableCell>
                            <TableCell align="left">{patient.city}</TableCell>
                            <TableCell align="left">
                                {patient.phoneNumber}
                            </TableCell>
                            <TableCell align="left">{patient.email}</TableCell>
                            <TableCell align="left">
                                <Button onClick={()=>{
                                    navigate(`/${patient.id}`)
                                }}>View</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default PatientList;
