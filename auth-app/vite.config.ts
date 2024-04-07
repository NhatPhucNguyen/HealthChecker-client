import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";
export default defineConfig({
    plugins: [
        react(),
        federation({
            name: "auth",
            filename: "remoteEntry.js",
            exposes: {
                "./AuthApp": "./src/AuthApp",
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
        port: 5170,
        strictPort: true,
    },
    preview: {
        port: 5170,
        strictPort: true,
    },
    build: {
        modulePreload: false,
        target: "esnext",
        minify: false,
        cssCodeSplit: false,
    },
});
