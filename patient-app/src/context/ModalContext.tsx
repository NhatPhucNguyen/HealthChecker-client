import { Box, Modal, Typography } from "@mui/material";
import { createContext, useContext, useState } from "react";
type ModalContent = {
    title: string;
    content: string;
    color?: string;
};
type ModalContextValues = {
    openModal: (modalContent: ModalContent) => void;
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

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [content, setContent] = useState<ModalContent>({} as ModalContent);
    const [open, setOpen] = useState(false);
    const openModal = (modalContent: ModalContent) => {
        setContent(modalContent);
        setOpen(true);
    };
    const closeModal = () => {
        setContent({} as ModalContent);
        setOpen(false);
    };
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
