import { useState } from "react";
import "./home.css";
import JanelaDeposito from "./JanelaDeposito";
import "./JanelaDeposito";

function PagInicio({ onClick }) {
  const [saldoTotal, setSaldoTotal] = useState(0);
  const [janeladepositar, setJanelaDepositar] = useState(false);
  const [valorGastado, setValorGastado] = useState(0)

  const handleJanelaDepositar = () => {
    setJanelaDepositar(true);
  };

  // Converte o saldo atual e o valor digitado para números reais antes de somar
  const somarSaldo = (valorDigitado) => {
    setSaldoTotal(Number(saldoTotal) + Number(valorDigitado));
  };

  return (
    <>
      <div className="dashboard-container">
        {/* CONTEÚDO PRINCIPAL (OCUPA A TELA INTEIRA AGORA) */}
        <main className="main-content">
          <header className="main-header">
            <div className="brand-header">
              <div className="logo-icon">M</div>
              <h1>Maglo.</h1>
            </div>
            <div className="header-actions">
              <button className="action-btn">Buscar</button>
              <button className="action-btn">Notificações</button>
              <div className="user-profile">
                <img src="https://via.placeholder.com/35" alt="User Profile" />
                <span>Mahfuzul Nabil</span>
                <span className="arrow">▼</span>
              </div>
            </div>
          </header>

          <div className="dashboard-grid">
            {/* COLUNA DO MEIO: CARDS, GRÁFICO E TRANSAÇÕES */}
            <div className="center-column">
              {/* Balance Cards */}
              <div className="balance-cards">
                <div className="card-summary dark">
                  <div className="summary-icon">R$</div>
                  <div>
                    <p>Valor total guardado</p>
                    <h3 style={{ color: 'white' }}>R$ {parseInt(saldoTotal)}</h3>
                    
                    <button
                      className="depositoValor"
                      onClick={handleJanelaDepositar}
                    >
                      Depositar valor
                    </button>

                    <div>
                      {janeladepositar && (
                        <JanelaDeposito
                          onClick={somarSaldo}
                          onClose={() => {
                            setJanelaDepositar(false);
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="card-summary light">
                  <div className="summary-icon">$</div>
                  <div>
                    <p>Gastos Totais</p>
                    <h3>R$ -{valorGastado}</h3>
                    <button>Adicionar gastos </button>
                  </div>
                </div>
                <div className="card-summary light">
                  <div className="summary-icon">$</div>
                  <div>
                    <p>Total salvo</p>
                    <h3>$550.25</h3>
                  </div>
                </div>
              </div>

              {/* Working Capital Chart Box */}
              <div className="content-box chart-box">
                <div className="box-header">
                  <h3>Capital de Giro</h3>
                  <div className="chart-legend">
                    <span className="legend-item income">Entradas</span>
                    <span className="legend-item expenses">Saídas</span>
                    <select className="chart-filter">
                      <option>Últimos 7 dias</option>
                    </select>
                  </div>
                </div>
                <div className="chart-placeholder">
                  <p style={{ color: "#aaa", fontSize: "0.9rem" }}>
                    Área do gráfico (linhas e eixos das datas)
                  </p>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="content-box">
                <div className="box-header">
                  <h3>Transações Recentes</h3>
                  <a href="#" className="view-all">
                    Ver tudo ❯
                  </a>
                </div>
                <table className="transactions-table">
                  <thead>
                    <tr>
                      <th>NOME/EMPRESA</th>
                      <th>TIPO</th>
                      <th>VALOR</th>
                      <th>DATA</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="table-item-info">
                          <div className="item-logo img-iphone">Ap</div>
                          <div>
                            <strong>Iphone 13 Pro MAX</strong>
                            <p>Apple. Inc</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="text-muted">Mobile</span>
                      </td>
                      <td>
                        <strong>$420.84</strong>
                      </td>
                      <td>
                        <span className="text-muted">14 Apr 2022</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="table-item-info">
                          <div className="item-logo img-netflix">Nf</div>
                          <div>
                            <strong>Netflix Subscription</strong>
                            <p>Netflix</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="text-muted">Entertainment</span>
                      </td>
                      <td>
                        <strong>$100.00</strong>
                      </td>
                      <td>
                        <span className="text-muted">05 Apr 2022</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="table-item-info">
                          <div className="item-logo img-figma">Fg</div>
                          <div>
                            <strong>Figma Subscription</strong>
                            <p>Figma. Inc</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="text-muted">Software</span>
                      </td>
                      <td>
                        <strong>$244.20</strong>
                      </td>
                      <td>
                        <span className="text-muted">02 Apr 2022</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

           
          </div>
        </main>
      </div>
    </>
  );
}

export default PagInicio;