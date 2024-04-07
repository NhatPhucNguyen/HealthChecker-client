import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        federation({
            name: "host-app",
            remotes: {
                authApp: "http://localhost:5170/assets/remoteEntry.js",
            },
            shared: [
                "@apollo/client",
                "@emotion/react",
                "@emotion/styled",
                "@fontsource/roboto",
                "@mui/icons-material",
                "@mui/material",
                "@mui/x-date-pickers",
                "dayjs",
                "graphql",
                "react",
                "react-dom",
                "react-router-dom",
            ],
        }),
    ],
    server: {
        port: 5173,
    },
    preview: {
        port: 5173,
    },
    build: {
        target: "ES2022",
    },
});
