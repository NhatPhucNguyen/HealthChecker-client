import { gql, useMutation } from "@apollo/client";
import {
    Box,
    Button,
    FormControl,
    Modal,
    TextField,
    Typography,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState } from "react";
type ModalContent = {
    title: string;
    content: string;
    color?: string;
};
type ModalContextValues = {
    openModal: (modalContent: ModalContent, isAlert?: boolean) => void;
    closeModal: () => void;
};
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};
const ModalContext = createContext<ModalContextValues | null>(null);
const SEND_ALERT = gql`
    mutation Mutation($alertInput: AlertInput) {
        createAlert(alertInput: $alertInput) {
            id
            patientId
        }
    }
`;
const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [content, setContent] = useState<ModalContent>({} as ModalContent);
    const [open, setOpen] = useState(false);
    const [sendAlert, setSendAlert] = useState(false);
    const [message, setMessage] = useState("");
    const { userId: patientId } = jwtDecode(
        localStorage.getItem("token") as string
    ) as { userId: string };
    const openModal = (modalContent: ModalContent, isAlert?: boolean) => {
        if (isAlert) {
            setSendAlert(isAlert);
        }
        setContent(modalContent);
        setOpen(true);
    };
    const closeModal = () => {
        setContent({} as ModalContent);
        setSendAlert(false);
        setOpen(false);
    };
    const [sendAlertMutation] = useMutation(SEND_ALERT);
    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            <Modal
                open={open}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        color={content.color || "green"}
                    >
                        {content.title}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {content.content}
                    </Typography>
                    {sendAlert && (
                        <Box
                            component={"form"}
                            width={"100%"}
                            sx={{ margin: "auto", marginTop: 2 }}
                            onSubmit={async (e) => {
                                e.preventDefault();
                                const response = await sendAlertMutation({
                                    variables: {
                                        alertInput: {
                                            message: message,
                                            patientId: patientId,
                                        },
                                    },
                                });
                                if (response.data) {
                                    closeModal();
                                }
                            }}
                        >
                            <FormControl fullWidth>
                                <TextField
                                    label="Message"
                                    fullWidth
                                    onChange={(e) => {
                                        setMessage(e.target.value);
                                    }}
                                />
                            </FormControl>
                            <Button
                                variant="contained"
                                sx={{ marginTop: 2 }}
                                type="submit"
                            >
                                Send
                            </Button>
                        </Box>
                    )}
                </Box>
            </Modal>
        </ModalContext.Provider>
    );
};
export const useModalContext = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModalContext must be used within ModalProvider");
    }
    return context;
};
export default ModalProvider;
