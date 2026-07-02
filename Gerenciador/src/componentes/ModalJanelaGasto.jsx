import { useState } from "react";

function ModalJanelaGasto({ onClose, aoSalvarGasto }) {
  //valor do gasto
  const [inputValorGasto, setInputValorGasto] = useState("");
  //onde o usuario gastou
  const [opcaoOndeGastou, setopcaoOndeGastou] = useState("");

  const handleValorOpcao = (event) => {
    const valorEscolhido = event.target.value;

    setopcaoOndeGastou(valorEscolhido);
  };
  return (
    <div>
      <div className="modal-overlay">
        <div className="modal-content">
          {/* Cabeçalho do Modal */}
          <div className="modal-header">
            <h2>Adicionar Novo Gasto</h2>
            <button type="button" className="btn-close" onClick={onClose}>
              ✕
            </button>
          </div>

          {/* Corpo do Formulário */}
          <form className="modal-form">
            {/* Campo 2: Categoria do Gasto */}
            <div className="modal-input-group">
              <label htmlFor="categoriaGasto">
                Selecione a categoria do gasto
              </label>
              <select
                id="categoriaGasto"
                className="modal-select"
                required
                value={opcaoOndeGastou}
                onChange={handleValorOpcao}
              >
                <option value="Alimentacao">🛒 Alimentação e Mercado</option>
                <option value="Transporte">🚗 Transporte / Apps</option>
                <option value="Lazer">🍿 Lazer e Streaming</option>
                <option value="Contas">💡 Assinaturas e Contas</option>
                <option value="Outros">📦 Outros</option>
              </select>
            </div>

            {/* Campo 3: Valor do Gasto */}
            <div className="modal-input-group">
              <label htmlFor="valorGasto">Qual o valor cobrado?</label>
              <div className="currency-input-wrapper">
                <span className="currency-symbol">R$</span>
                <input
                  id="valorGasto"
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  min="0.01"
                  required
                  onChange={(e) => {
                    setInputValorGasto(e.target.value);
                  }}
                />
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="modal-actions">
              <button type="button" className="btn-cancelar" onClick={onClose}>
                Cancelar
              </button>
              <button
                type="submit"
                className="btn-confirmar"
                style={{
                  backgroundColor: "#ef4444",
                  color: "#ffffff",
                }}
                onClick={(event) => {
                  event.preventDefault(); // 

                
                  aoSalvarGasto({
                    valor: inputValorGasto,
                    categoria: opcaoOndeGastou,
                  });

                  onClose(); 
                }}
              >
                Confirmar Gasto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalJanelaGasto;
