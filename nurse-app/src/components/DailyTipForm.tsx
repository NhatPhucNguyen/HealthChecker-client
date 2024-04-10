import React, { useState } from "react";
import DailyTip from "../interfaces/DailyTip";
import { useNavigate, useParams } from "react-router-dom";
import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import {
    Alert,
    Box,
    Button,
    FormControl,
    FormLabel,
    TextField,
    Typography,
} from "@mui/material";
type DailyTipFormProps = {
    isUpdate?: boolean;
};
const ADD_DAILY_TIP = gql`
    mutation Mutation($dailyTipInput: DailyTipInput) {
        addDailyTip(dailyTipInput: $dailyTipInput) {
            id
            patient
        }
    }
`;
const UPDATE_DAILY_TIP = gql`
    mutation UpdateDailyTip(
        $updateDailyTipId: ID
        $dailyTipInput: DailyTipInput
    ) {
        updateDailyTip(id: $updateDailyTipId, dailyTipInput: $dailyTipInput) {
            id
            patient
        }
    }
`;
const DAILY_TIP = gql`
    query Query($dailyTipId: ID) {
        dailyTip(id: $dailyTipId) {
            content
            patient
            reference
            title
        }
    }
`;
const DailyTipForm = ({ isUpdate }: DailyTipFormProps) => {
    const { patientId } = useParams() as { patientId: string };
    const { dailyTipId } = useParams() as { dailyTipId: string };
    const [dailyTip, setDailyTip] = useState<DailyTip>({} as DailyTip);
    const navigate = useNavigate();
    const client = useApolloClient();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDailyTip({ ...dailyTip, [e.target.id]: e.target.value });
    };
    useQuery<{ dailyTip: DailyTip }>(DAILY_TIP, {
        variables: {
            dailyTipId: dailyTipId,
        },
        skip: !isUpdate,
        onCompleted: (data) => {
            setDailyTip(data.dailyTip);
        },
    });
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isUpdate) {
            const response = await addDailyTipMutation({
                variables: {
                    dailyTipInput: { ...dailyTip, patient: patientId },
                },
            });
            if (response.data) {
                client.refetchQueries({ include: "all" });
                navigate("../..");
            }
        }
        if (dailyTipId) {
            const response = await updateDailyTipMutation({
                variables: {
                    dailyTipInput: { ...dailyTip, patient: patientId },
                    updateDailyTipId: dailyTipId,
                },
            });
            if (response.data) {
                client.refetchQueries({ include: "all" });
                navigate("../..");
            }
        }
    };
    const [alert, setAlert] = useState("");
    const [addDailyTipMutation] = useMutation(ADD_DAILY_TIP, {
        onError: (error) => {
            setAlert(error.message);
        },
    });
    const [updateDailyTipMutation] = useMutation(UPDATE_DAILY_TIP, {
        onError: (error) => {
            setAlert(error.message);
        },
    });
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
                Add Daily Tip
            </Typography>
            {alert && <Alert severity="error">{alert}</Alert>}
            <FormControl fullWidth sx={{ marginTop: 1 }}>
                <FormLabel htmlFor="title">Title</FormLabel>
                <TextField
                    id="title"
                    type="text"
                    fullWidth
                    onChange={handleChange}
                    value={dailyTip.title || ""}
                />
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: 1 }}>
                <FormLabel htmlFor="content">Content</FormLabel>
                <TextField
                    id="content"
                    type="text"
                    fullWidth
                    onChange={handleChange}
                    value={dailyTip.content || ""}
                />
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: 1 }}>
                <FormLabel htmlFor="reference">Reference</FormLabel>
                <TextField
                    id="reference"
                    type="text"
                    fullWidth
                    onChange={handleChange}
                    value={dailyTip.reference || ""}
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

export default DailyTipForm;
