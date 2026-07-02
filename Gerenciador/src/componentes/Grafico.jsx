import React from "react";

function Grafico({ data }) {
  // 1. Se não houver dados, exibe a mensagem amigável
  if (!data || data.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', color: '#6b7280', fontSize: '14px' }}>
        Nenhum gasto registrado neste mês.
      </div>
    );
  }

  // 2. 🚀 O PULO DO GATO: Agrupar gastos com a mesma categoria!
  const gastosAgrupados = data.reduce((acumulador, gastoAtual) => {
    const cat = gastoAtual.categoria;
    // Se a categoria já existe no nosso objeto, soma o valor. Se não, cria ela.
    if (acumulador[cat]) {
      acumulador[cat] += gastoAtual.valor;
    } else {
      acumulador[cat] = gastoAtual.valor;
    }
    return acumulador;
  }, {});

  // Transforma o objeto agrupado de volta em uma lista (Array) de objetos para o .map
  const dadosFormatados = Object.keys(gastosAgrupados).map((chaveCategoria) => ({
    categoria: chaveCategoria,
    valor: gastosAgrupados[chaveCategoria]
  }));

  // 3. Encontra o maior valor acumulado para equilibrar a altura proporcional das barras
  const maiorValor = Math.max(...dadosFormatados.map(gasto => gasto.valor), 1);

  // Mapeamento de emojis e nomes amigáveis para exibir embaixo das barras
  const formatarLegenda = (categoria) => {
    const legendas = {
      Alimentacao: "🛒 Alimentação",
      Transporte: "🚗 Transporte",
      Lazer: "🍿 Lazer",
      Contas: "💡 Contas",
      Outros: "📦 Outros"
    };
    return legendas[categoria] || categoria;
  };

  return (
    <div
      style={{
        width: "100%",
        background: "#ffffff33",
        padding: "25px 15px 15px 15px",
        borderRadius: "8px",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-around",
        height: "220px",
        borderBottom: "2px solid #eaeaea",
        gap: "15px"
      }}
    >
      {/* 4. Usamos os dados jÁ agrupados e somados aqui 👇 */}
      {dadosFormatados.map((gasto, index) => {
        const alturaPorcentagem = (gasto.valor / maiorValor) * 100;

        return (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: 1,
              height: "100%",
              justifyContent: "flex-end",
            }}
          >
            {/* Valor total acumulado acima da barra */}
            <span style={{ fontSize: "12px", fontWeight: "700", color: "#d2d1e7", marginBottom: "6px" }}>
              R$ {gasto.valor.toFixed(2)}
            </span>

            {/* Barra customizada estilosa */}
            <div
              style={{
                width: "100%",
                maxWidth: "45px",
                height: `${alturaPorcentagem}%`,
                backgroundColor: "#7c7cf3",
                borderRadius: "6px 6px 0 0",
                boxShadow: "0px 4px 10px rgba(79, 70, 229, 0.15)",
                transition: "height 0.4s ease-out",
              }}
            />

            {/* Categoria com emoji */}
            <span
              style={{
                fontSize: "11px",
                fontWeight: "500",
                color: "#e4e4e4",
                marginTop: "10px",
                textAlign: "center",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%"
              }}
            >
              {formatarLegenda(gasto.categoria)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default Grafico;