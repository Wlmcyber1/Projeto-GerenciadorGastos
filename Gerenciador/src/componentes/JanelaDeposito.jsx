import { useState } from "react";

const JanelaDeposito = ({ onClose, onClick }) => {
  const [valorDeposito, setValordeposito] = useState("");
  const [origemValor, setOrigemValor] = useState("Trabalho");

  const handleSubmit = (evento) => {
    evento.preventDefault();
    if (!valorDeposito || Number(valorDeposito) <= 0) return;
    
   //depositando valor 
    onClick({valor:valorDeposito, origem: origemValor});
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
       
        <div className="modal-header">
          <h2>Depositar Valor</h2>
          <button type="button" className="btn-close" onClick={onClose}>
            ✕
          </button>
        </div>

        
        <form className="modal-form" onSubmit={handleSubmit}>
          
         
          <div className="modal-input-group">
            <label htmlFor="origem">De onde vem este valor?</label>
            <select
              id="origem"
              value={origemValor}
              onChange={(e) => setOrigemValor(e.target.value)}
              className="modal-select"
            >
              <option value="Trabalho">Trabalho / Salário</option>
              <option value="Freelance">Freelance</option>
              <option value="Investimentos">Investimentos</option>
              <option value="Outros">Outros</option>
            </select>
          </div>

          <div className="modal-input-group">
            <label htmlFor="valor">Qual valor deseja depositar?</label>
            <div className="currency-input-wrapper">
              <span className="currency-symbol">R$</span>
              <input
                id="valor"
                type="number"
                placeholder="0.00"
                step="0.01"
                min="0.01"
                required
                value={valorDeposito}
                onChange={(valor) => {
                  setValordeposito(valor.target.value);
                }}
              />
            </div>
          </div>

       
          <div className="modal-actions">
            <button
              type="button"
              className="btn-cancelar"
              onClose={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-confirmar"
              
            >
              Confirmar Depósito
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JanelaDeposito;