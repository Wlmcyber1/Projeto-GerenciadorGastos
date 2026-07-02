import { useEffect, useState } from "react";
import "./home.css";
import JanelaDeposito from "./JanelaDeposito";
import ModalJanelaGasto from "./ModalJanelaGasto";
import Grafico from "./Grafico";

function PagInicio({ onClick }) {

  const [saldoTotal, setSaldoTotal] = useState(0);
  const [valorGastado, setValorGastado] = useState(0);
  const [totalSalvo, setTotalSalvo] = useState(0); // total salvo: valor total - gastos
  const [janeladepositar, setJanelaDepositar] = useState(false); // estado da janela de deposito 
  const [janelaGasto, setJanelaGasto] = useState(false);

  
  const usuarioLogadoAgora = JSON.parse(localStorage.getItem("usuario_logado_agora"));
  const idDoUsuarioAtual = usuarioLogadoAgora ? String(usuarioLogadoAgora.idUsuario) : "anonimo";

 
  useEffect(() => {
    const gastodoStore = JSON.parse(localStorage.getItem("historico_gastos")) || [];
    
 
    const gastosFiltrados = gastodoStore.filter(
      (gasto) => String(gasto.idUsuario) === idDoUsuarioAtual
    );
    
    const totalInicial = gastosFiltrados.reduce((acumulador, gastoAtual) => {
      return acumulador + gastoAtual.valor;
    }, 0);
    
    setValorGastado(totalInicial);
  }, [idDoUsuarioAtual]);

  useEffect(() => {
    const historicoDepositos = JSON.parse(localStorage.getItem("historico_saldoDeposito")) || [];
    
   
    const depositosFiltrados = historicoDepositos.filter(
      (deposito) => String(deposito.idUsuario) === idDoUsuarioAtual
    );
    
    const somaSaldosIniciais = depositosFiltrados.reduce((acumulador, depositoAtual) => {
      return acumulador + depositoAtual.valor;
    }, 0);
    
    setSaldoTotal(somaSaldosIniciais);
  }, [idDoUsuarioAtual]);

 
  useEffect(() => {
    const resultado = Number(saldoTotal) - Number(valorGastado);
    setTotalSalvo(Math.max(resultado, 0));
  }, [saldoTotal, valorGastado]);
  
  
  const salvarGasto = (e) => {
    console.log("Valor recebido com sucesso:", e);
    const valoresantigosLocalStore = JSON.parse(localStorage.getItem("historico_gastos")) || [];
    const categoriaDefinida = e.categoria || "Alimentacao";

    const novoGasto = {
      idGasto: Date.now(),
      idUsuario: idDoUsuarioAtual, 
      valor: Number(e.valor), 
      categoria: categoriaDefinida,
    };

    valoresantigosLocalStore.push(novoGasto);

   
    const gastosDoUsuario = valoresantigosLocalStore.filter(
      (gasto) => String(gasto.idUsuario) === idDoUsuarioAtual
    );
    const totalGastado = gastosDoUsuario.reduce((acumulador, gastoAtual) => {
      return acumulador + gastoAtual.valor;
    }, 0);

    setValorGastado(totalGastado);
    localStorage.setItem("historico_gastos", JSON.stringify(valoresantigosLocalStore));
    setJanelaGasto(false); // Fecha o modal
    console.log("Gasto salvo e histórico atualizado com sucesso!");
  };

 
  const somarSaldo = (valorDigitado) => {
    console.log("Depósito recebido com sucesso:", valorDigitado);
    const historicoDepositos = JSON.parse(localStorage.getItem("historico_saldoDeposito")) || [];

    const novoDeposito = {
      valor: Number(valorDigitado.valor),
      idUsuario: idDoUsuarioAtual 
    };

    historicoDepositos.push(novoDeposito);
    localStorage.setItem("historico_saldoDeposito", JSON.stringify(historicoDepositos));

   
    const depositosDoUsuario = historicoDepositos.filter((deposito) => {
      return String(deposito.idUsuario) === idDoUsuarioAtual;
    });

    const totalAcumulado = depositosDoUsuario.reduce((acumulador, deposito) => {
      return acumulador + deposito.valor;
    }, 0);

    setSaldoTotal(totalAcumulado);
    setJanelaDepositar(false); // Fecha o modal
    console.log("Depósito salvo e saldo atualizado com sucesso!");
  };

  
  const handleJanelaDepositar = () => setJanelaDepositar(true);
  const handleJanelaGasto = () => setJanelaGasto(true);


  const gastodoStore = JSON.parse(localStorage.getItem("historico_gastos")) || [];
  const hoje = new Date();
  const mes = hoje.getMonth();
  const anoAtual = hoje.getFullYear();

  const dataDeGasto = gastodoStore.filter((gasto) => {
    const dataDogasto = new Date(gasto.idGasto);
    return (
      String(gasto.idUsuario) === idDoUsuarioAtual && 
      dataDogasto.getMonth() === mes && 
      dataDogasto.getFullYear() === anoAtual
    );
  });

  return (
    <>
      <div className="dashboard-container">
        <main className="main-content">
          <header className="main-header">
            <div className="brand-header">
              <div className="logo-icon">M</div>
              <h1>Maglo.</h1>
            </div>
            <div className="user-profile">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="#4f46e5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: "8px" }}
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
             
              <span>{usuarioLogadoAgora ? usuarioLogadoAgora.nome : "Letícia Rodrigues"}</span>
              <select>
                <option value="sair">Sair</option>
              </select>
            </div>
          </header>

          <div className="dashboard-grid">
            <section className="balance-cards">
              
              <div className="card-summary dark">
                <div>
                  <p>Valor total guardado</p> 
                  <h3 style={{ color: "white" }}>R$ {saldoTotal.toFixed(2)}</h3>
                  <button className="depositoValor" onClick={handleJanelaDepositar}>
                    Depositar valor
                  </button>
                </div>
                <div className="summary-icon">R$</div>
              </div>

              {/* Card 2: Gastos Totais */}
              <div className="card-summary light">
                <div>
                  <p>Gastos Totais</p>
                  <h3>R$ -{valorGastado.toFixed(2)}</h3>
                  <button
                    className="depositoValor"
                    style={{ backgroundColor: "#ef4444", color: "#fff", marginTop: "12px" }}
                    onClick={handleJanelaGasto}
                  >
                    Adicionar gastos
                  </button>
                </div>
                <div className="summary-icon expense">$</div>
              </div>

             
              <div className="card-summary light">
                <div>
                  <p>Total salvo</p>
                  <h3>R$ {totalSalvo.toFixed(2)}</h3>
                </div>
                <div className="summary-icon savings">$</div>
              </div>
            </section>

            
            <section className="content-box">
              <div className="box-header">
                <div>
                  <h3>Mapa de Intensidade de Gastos</h3>
                  <p className="box-subtitle">Frequência e volume de saídas nos últimos meses</p>
                </div>
              </div>
              <Grafico data={dataDeGasto} />
            </section>

            {/* CATEGORIAS E TRANSAÇÕES */}
            <div className="two-columns-layout">
              <div className="content-box">
                <div className="box-header">
                  <h3>Distribuição por Categorias</h3>
                </div>
                <div className="category-map-list">
                  <div className="category-item">
                    <div className="category-info">
                      <span className="category-name">🛒 Alimentação e Mercado</span>
                      <span className="category-percentage">45%</span>
                    </div>
                    <div className="progress-bar-container">
                      <div className="progress-bar fill-food" style={{ width: "45%" }}></div>
                    </div>
                  </div>
                  <div className="category-item">
                    <div className="category-info">
                      <span className="category-name">🚗 Transporte / Apps</span>
                      <span className="category-percentage">25%</span>
                    </div>
                    <div className="progress-bar-container">
                      <div className="progress-bar fill-transport" style={{ width: "25%" }}></div>
                    </div>
                  </div>
                  <div className="category-item">
                    <div className="category-info">
                      <span className="category-name">🍿 Lazer e Streaming</span>
                      <span className="category-percentage">20%</span>
                    </div>
                    <div className="progress-bar-container">
                      <div className="progress-bar fill-leisure" style={{ width: "20%" }}></div>
                    </div>
                  </div>
                  <div className="category-item">
                    <div className="category-info">
                      <span className="category-name">💡 Assinaturas e Contas</span>
                      <span className="category-percentage">10%</span>
                    </div>
                    <div className="progress-bar-container">
                      <div className="progress-bar fill-bills" style={{ width: "10%" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="content-box">
                <div className="box-header">
                  <h3>Fluxo Recente de Saídas</h3>
                  <a href="#" className="view-all">Ver tudo ❯</a>
                </div>
                <div className="timeline-flow">
                  <div className="timeline-item">
                    <div className="timeline-marker marker-expense"></div>
                    <div className="timeline-content">
                      <div className="timeline-details">
                        <h4>Iphone 13 Pro MAX</h4>
                        <p>Apple. Inc • 14 Apr 2022</p>
                      </div>
                      <span className="timeline-value negative">- $420.84</span>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-marker marker-expense"></div>
                    <div className="timeline-content">
                      <div className="timeline-details">
                        <h4>Netflix Subscription</h4>
                        <p>Entertainment • 05 Apr 2022</p>
                      </div>
                      <span className="timeline-value negative">- $100.00</span>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-marker marker-expense"></div>
                    <div className="timeline-content">
                      <div className="timeline-details">
                        <h4>Figma Subscription</h4>
                        <p>Software • 02 Apr 2022</p>
                      </div>
                      <span className="timeline-value negative">- $244.20</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {janeladepositar && (
        <JanelaDeposito
          onClick={somarSaldo}
          onClose={() => setJanelaDepositar(false)}
        />
      )}

      {janelaGasto && (
        <ModalJanelaGasto
          aoSalvarGasto={salvarGasto}
          onClose={() => setJanelaGasto(false)}
        />
      )}
    </>
  );
}

export default PagInicio;