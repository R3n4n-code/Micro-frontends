import cardapio from "./data/cardapio.json";
import React, { useState } from "react";
import "./Grid.css";

export default function Grid() {
  const [itens, setItens] = useState(cardapio);
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
          <p id="preco">R$ {item.preco.toFixed(2)}</p>
          <button onClick={() => AdicionarAoCarrinho(item)}>Adicionar ao carrinho</button>
        </div>
      ))}
    </div>
  )
}

function AdicionarAoCarrinho(item) {
  window.dispatchEvent(new CustomEvent("adicionarAoCarrinho", { detail: item }));

}