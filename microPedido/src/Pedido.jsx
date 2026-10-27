import { useState, useEffect } from "react";
import "./Pedido.css";

export default function Pedido() {
   // criamos os nossos estados que vão ser muito utilizados durante essa parte do projeto
    const [Carrinho, setCarrinho] = useState([]);
    const [precoTotal, setPrecoTotal] = useState(0);

    // Esse useEffect roda apenas uma vez quando a tela carrega
    useEffect(() => {

        // Função que escuta um evento global para receber um novo produto enviado de outro lugar do app
        function ReceberPedido(evento) {
            // Pega os dados do produto que vieram de dentro do evento personalizado
            const produto = evento.detail;

            // Atualiza o estado do carrinho usando a versão anterior dele
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

                // Se o produto for novo, mantém os que já estavam e adiciona o novo objeto no final do array
                return [
                    ...carrinho,
                    {
                        ...produto,
                    }
                ];
            });

            // Pega o valor total atual e soma o preço do produto que acabou de entrar
            setPrecoTotal((precoTotal) =>
                precoTotal + produto.preco
            );

            // Log apenas para debugar e ver no console o que foi adicionado
            console.log(
                `Item adicionado: ${produto.nome} ${produto.quantidade}`
            );
        }

        // Cria um ouvinte na janela (window) para disparar a função toda vez que o evento "adicionarAoCarrinho" acontecer
        window.addEventListener("adicionarAoCarrinho", ReceberPedido);

        // Função de limpeza (cleanup): remove o ouvinte se o componente for desmontado da tela para evitar vazamento de memória
        return () => window.removeEventListener("adicionarAoCarrinho", ReceberPedido);

    }, []);

    // Aqui aplico uma condição para que apareça "carrinho vazio" se não tiver nada nele
    if (Carrinho.length === 0) {
        return (
            <>
                <h1>Carrinho</h1>
                <p>R$ {precoTotal.toFixed(2)}</p>
                <p>Seu carrinho está vazio.</p>
            </>
        )
    }

    // Se houver itens no carrinho, renderiza a lista completa
    return (
        <>
            <div>
                <h1>Carrinho</h1>
                {/* Exibe o preço total formatado com duas casas decimais */}
                <p>Preço total: R$ {precoTotal.toFixed(2)}</p>
            </div>
            <div className="grid-pedido">

                {/* Percorre a lista de produtos do carrinho para gerar o visual de cada um na tela */}
                {Carrinho.map((item) => (
                    <div key={item.id} className="card-pedido">
                        <h2>{item.nome}</h2>
                        <img src={item.imagem} alt={item.nome} />
                        <p>R$ {item.preco.toFixed(2)}</p>
                        
                        {/* Botão para apagar totalmente o produto do carrinho */}
                        <button onClick={() => {
                            // Filtra o array removendo o item que tem o ID igual ao deste card
                            setCarrinho((carrinho) => carrinho.filter((produto) => produto.id !== item.id));
                            // Subtrai do preço total o valor do produto multiplicado pela quantidade que tinha dele
                            setPrecoTotal((precoTotal) => precoTotal - item.preco * item.quantidade);
                        }}>Remover do carrinho</button>

                        <div className="div-Pedido">
                            {/* Botão de "+" para aumentar a quantidade */}
                            <button onClick={() => {
                                // Mapeia o carrinho e soma +1 na quantidade do item deste card
                                setCarrinho((carrinho) => carrinho.map((produto) => produto.id === item.id ? { ...produto, quantidade: item.quantidade + 1 } : produto))
                                // Soma o valor de uma unidade deste produto ao preço total
                                setPrecoTotal((precoTotal) => precoTotal + item.preco);
                                
                            }}>+</button>

                            {/* Mostra a quantidade atual deste produto na tela */}
                            <p>{item.quantidade}</p>

                            {/* Botão de "-" para diminuir a quantidade */}
                            <button onClick={() => {
                                // Se o usuário tiver mais de 1 unidade no carrinho...
                                if (item.quantidade > 1) {
                                    // Apenas diminui 1 da quantidade mantendo o produto lá
                                    setCarrinho((carrinho) => carrinho.map((produto) => produto.id === item.id ? { ...produto, quantidade: item.quantidade - 1 } : produto))
                                    // Deduz o preço de uma unidade do valor total
                                    setPrecoTotal((precoTotal) => precoTotal - item.preco);
                                }
                                // Se só tiver exatamente 1 unidade no carrinho e o usuário clicar em menos remove o produto direto da lista usando o filtro
                                if (item.quantidade === 1) {
                                    
                                    setCarrinho((carrinho) => carrinho.filter((produto) => produto.id !== item.id));
                                    // subtração do valor
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
