import React from "react";
import { createRoot } from "react-dom/client";
import Grid from "./Grid.jsx";


function App() {
    return (
        <div>
            <Grid />
        </div>
    );
}

const root = createRoot(document.getElementById("root"));

root.render(<App />);