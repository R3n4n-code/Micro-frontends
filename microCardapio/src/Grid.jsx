import cardapio from "./data/cardapio.json";
import React, { useState } from "react";
import "./Grid.css";

export default function Grid() {
  const ProdutosComID = cardapio.map((item) => ({...item, id: crypto.randomUUID()}))
  const [itens, setItens] = useState(ProdutosComID);
  
  return (
    <div className="grid">
      {itens.map((item) => (

        <div key={item.id} className="card">
          <div className="div">
            <img src={item.imagem} alt={item.nome} />
            <div className="div2">
              <h2>{item.nome}</h2>
              <p>{item.descricao}</p>
            </div>
          </div>
          <div className="div3">
          <button onClick={() => AdicionarAoCarrinho(item)}>Adicionar ao carrinho</button>
          <p id="preco">R$ {item.preco.toFixed(2)}</p>
        </div>
        </div>
      ))}
    </div>
  )
}

function AdicionarAoCarrinho(item) {
  window.dispatchEvent(new CustomEvent("adicionarAoCarrinho", { detail: item }));

}