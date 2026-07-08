# 💰 Maglo. - Gestão de Finanças Pessoais

> ⚠️ **AVISO IMPORTANTE:** Este projeto encontra-se em **desenvolvimento ativo (Work in Progress)**. O código ainda passará por diversos ajustes, refatorações e melhorias estruturais. Por este motivo, **pode haver muitos erros, bugs ou comportamentos inesperados** durante o uso.

O **Maglo** é uma aplicação web de controle financeiro pessoal desenvolvida para ajudar utilizadores a monitorizar os seus saldos, depósitos e gastos mensais de forma simples e categorizada.

---

## 🚀 Funcionalidades Atuais

- **Cadastro e Validação de Utilizadores:** Criação de conta com validação de e-mails duplicados e confirmação de palavra-passe.
- **Sessão Ativa com LocalStorage:** Sistema de autenticação local (login/logout) baseado em "carimbos de sessão", garantindo que cada utilizador veja apenas os seus próprios dados.
- **Dashboard Financeiro:**
  - **Valor Total Guardado:** Soma de todos os depósitos do utilizador.
  - **Gastos Totais:** Monitorização em tempo real das saídas financeiras.
  - **Total Salvo:** Cálculo automático do balanço líquido (Saldo - Gastos).
- **Gráfico de Intensidade:** Integração visual para analisar a frequência de gastos ao longo do mês atual.

---

## 🛠️ Tecnologias Utilizadas

- **React.js** (Componentização e Hooks como `useState` e `useEffect`)
- **JavaScript (ES6+)** (Métodos de Array como `.find()`, `.filter()` e `.reduce()`)
- **CSS3** (Estilização e Layout Responsivo)
- **Web Storage API** (`localStorage` para persistência de dados local)

---

## 🧠 Arquitetura e Fluxo de Dados (Lógica de Sessão)

Para resolver o isolamento de dados entre múltiplas contas sem uma base de dados externa, a aplicação utiliza uma estratégia de **Chave de Sessão Ativa**:

1. **Validação no Login:** O componente `Home` utiliza o método `.find()` para verificar se as credenciais coincidem com o histórico de `usuarios_cadastrados`.
2. **Carimbo de Sessão:** Uma vez validado, o objeto do utilizador é guardado temporariamente na chave `usuario_logado_agora`.
3. **Filtragem Rigorosa:** O componente `PagInicio` consome esse ID ativo para filtrar os arrays globais de `historico_gastos` e `historico_saldoDeposito` via `.filter()`, isolando completamente a visão de cada conta.

---

## 🚧 Próximos Passos e Ajustes Previstos

 Corrigir bugs visuais na listagem estática do fluxo recente de saídas.
 Implementar a lógica real de cálculo de percentagem nas barras de distribuição por categorias.



---

## 🔧 Como Executar o Projeto

Se quiseres testar o projeto localmente (mesmo com os bugs conhecidos), segue os passos:

1. Clona o repositório:
   ```bash
   git clone https://github.com/Wlmcyber1/Projeto-GerenciadorGastos
   ```
2. Entra na pasta do projeto:
   ```bash
   cd Gerenciador
   ```
 3. Instala as dependências:
   ```bash
   npm install
   ```
 4. Instala as dependências:
   ```bash
   npm run dev
   ```
   
