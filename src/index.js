import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {ChakraProvider} from "@chakra-ui/react";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <BrowserRouter>
        <ChakraProvider>
            <App />
        </ChakraProvider>
    </BrowserRouter>
);

serviceWorker.unregister();
