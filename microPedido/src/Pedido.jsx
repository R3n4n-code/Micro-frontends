import React, { useState, useEffect } from "react";
import "./Pedido.css";


export default function Pedido() {
    const [Carrinho, setCarrinho] = useState([]);
    const [precoTotal, setPrecoTotal] = useState(0);
    useEffect(() => {

        function ReceberPedido(evento) {
            const produto = evento.detail;

            setCarrinho((carrinho) => {
                const produtoExistente = carrinho.find(
                    (item) => item.id === produto.id
                );

                if (produtoExistente) {
                    return carrinho.map((item) =>
                        item.id === produto.id
                            ? {
                                ...item,
                                quantidade: item.quantidade + 1
                            }
                            : item
                    );
                }

                return [
                    ...carrinho,
                    {
                        ...produto,

                    }
                ];
            });

            setPrecoTotal((precoTotal) =>
                precoTotal + produto.preco
            );

            console.log(
                `Item adicionado: ${produto.nome} ${produto.quantidade}`
            );
        }

        window.addEventListener("adicionarAoCarrinho", ReceberPedido);

        return () => window.removeEventListener("adicionarAoCarrinho", ReceberPedido);

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
                            setPrecoTotal((precoTotal) => precoTotal - item.preco * item.quantidade);
                        }}>Remover do carrinho</button>
                        <div className="div-Pedido">
                        <button onClick={() => {
                            setCarrinho((carrinho) => carrinho.map((produto) => produto.id === item.id ? { ...produto, quantidade: item.quantidade + 1 } : produto))
                            setPrecoTotal((precoTotal) => precoTotal + item.preco);
                            console.log(`"quantidade" ${Carrinho.quantidade}`)
                        }}>+</button>
                        <p>{item.quantidade}</p>
                        <button onClick={() => {
                            if (item.quantidade > 1) {
                                setCarrinho((carrinho) => carrinho.map((produto) => produto.id === item.id ? { ...produto, quantidade: item.quantidade - 1 } : produto))
                                setPrecoTotal((precoTotal) => precoTotal - item.preco);
                            }
                            if (item.quantidade === 1) {
                                setCarrinho((carrinho) => carrinho.filter((produto) => produto.id !== item.id));
                                setPrecoTotal((precoTotal) => precoTotal - item.preco);
                            }
                        }}>-</button>
                        </div>
                    </div>
                ))}

            </div>
        </>
    );

};
