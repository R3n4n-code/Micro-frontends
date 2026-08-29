import React from "react";
import { createRoot } from "react-dom/client";
import Pedido from "./Pedido.jsx";

function App() {
    return (
        <div>
            <Pedido />
        </div>
    );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);