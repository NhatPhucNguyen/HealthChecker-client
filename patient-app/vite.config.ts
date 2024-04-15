import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        federation({
            name: "patient",
            filename: "remoteEntry.js",
            exposes: {
                "./PatientApp": "./src/PatientApp",
            },
            shared: [
                "@apollo/client",
                "@emotion/react",
                "@emotion/styled",
                "@fontsource/roboto",
                "@mui/icons-material",
                "@mui/material",
                "@mui/x-date-pickers",
                "graphql",
                "react",
                "react-dom",
                "react-router-dom",
                "jwt-decode",
            ],
        }),
    ],
    server: {
        port: 5172,
        strictPort: true,
    },
    preview: {
        port: 5172,
        strictPort: true,
    },
    build: {
        modulePreload: false,
        target: "esnext",
        minify: false,
        cssCodeSplit: false,
    },
});
