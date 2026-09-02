import React from "react";
import {createRoot} from "react-dom/client";
import Grid from "microCardapio/Grid";
import Pedido from "microPedido/Pedido";
import "./global.css";

function App() {
    return (
        <div>
           <div className="header">
            <h1 className="h1">Ponto Sabor</h1>
           </div>
            <Grid />
            <Pedido />
        </div>
    );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);