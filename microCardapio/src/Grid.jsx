import cardapio from "./data/cardapio.json";  // Importamos nossos dados mocados para utilizarmos na aplicação
import "./Grid.css";
import React, { useState } from "react"; 

const ProdutosComID = cardapio.map((item) => ({...item, id: crypto.randomUUID()})) // Damos um Id para cada item
export default function Grid() {
  
  const [itens, setitens] = useState(ProdutosComID)
  
  // Nosso grid usamos um map para renderizar todos nosso cardapio em cards
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

// Aqui disparamos um evento toda vez que essa função for chamada  
function AdicionarAoCarrinho(item) {
  window.dispatchEvent(new CustomEvent("adicionarAoCarrinho", { detail: item }));

}