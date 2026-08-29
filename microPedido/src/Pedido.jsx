import React, { useState, useEffect } from "react";
import "./Pedido.css";


export default function Pedido() {
    const [Carrinho, setCarrinho] = useState([]);
    const [precoTotal, setPrecoTotal] = useState(0);
    useEffect(() => {

        function ReceberPedido(evento) {
            const produto = evento.detail;
            setCarrinho((carrinho) => [...carrinho, produto]);
            setPrecoTotal((precoTotal) => precoTotal + produto.preco);
            console.log(`Item adicionado ao carrinho: ${produto.nome}`);

        }

        window.addEventListener("adicionarAoCarrinho", ReceberPedido);


        return () => {
            window.removeEventListener("adicionarAoCarrinho", ReceberPedido);
        };

    }, []);
    if (Carrinho.length === 0) {
        return (
            <>

                <h1>Carrinho</h1>
                <p>R$ {precoTotal.toFixed(2)}</p>

                <p>Seu carrinho está vazio.</p>

            </>
        )
    }

    return (
        <>
            <div>
                <h1>Carrinho</h1>
                <p>Preço total: R$ {precoTotal.toFixed(2)}</p>
            </div>
            <div className="grid-pedido">

                {Carrinho.map((item) => (
                    <div key={item.id} className="card-pedido">
                        <h2>{item.nome}</h2>
                        <img src={item.imagem} alt={item.nome} />
                        <p>R$ {item.preco.toFixed(2)}</p>
                        <button onClick={() => {
                            setCarrinho((carrinho) => carrinho.filter((produto) => produto.id !== item.id));
                            setPrecoTotal((precoTotal) => precoTotal - item.preco);
                        }}>Remover do carrinho</button>
                    </div>
                ))}

            </div>
        </>
    );

};
