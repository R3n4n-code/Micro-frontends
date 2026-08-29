import React from "react";
import {createRoot} from "react-dom/client";
import Grid from "microCardapio/Grid";
import Pedido from "microPedido/Pedido";

function App() {
    return (
        <div>
            <h1>Ponto Sabor</h1>
            <Grid />
            <Pedido />
        </div>
    );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);