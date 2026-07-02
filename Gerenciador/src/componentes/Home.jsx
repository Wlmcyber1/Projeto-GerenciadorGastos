import { useState } from "react";
import "./home.css";
import PagInicio from "./PagInicio";
import CriarConta from "./CriarConta";
function Home() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarComponente, setMostrarComponente] = useState(false);
  const [criarConta, setCriarConta] = useState(false);
  const [erro, setErro] = useState(false);
  const handleEntrar = (e) => {
    e.preventDefault();
    const todosOsCadastrados =
      JSON.parse(localStorage.getItem("usuarios_cadastrados")) || [];

    const contaExiste = todosOsCadastrados.find(
      (usuario) => usuario.email === email && usuario.senha === senha,
    );

    if (email === "" || senha === "") {
      setErro(true);
    } else if (contaExiste) {
      //se conta existe adicionamos a nova conta ao localStorage e abrimos o outro componente
      localStorage.setItem("usuario_logado_agora", JSON.stringify(contaExiste));
      setMostrarComponente(true);
    } else {
      setErro(true);
     
    }
  };

  if (mostrarComponente) {
    return <PagInicio />;
  }

  const handleCriarConta = () => {
    setCriarConta(true);
  };
  if (criarConta) {
    return <CriarConta />;
  }
  return (
    <div className="page-container">
      {erro && (
        <div className="mensagemErro">
          {" "}
          <p>Por favor, preencha todos os campos</p>
        </div>
      )}
      <nav className="navbar">
        <div className="m">
          <p>M</p>
        </div>
        <p className="maglo">Maglo.</p>
      </nav>

      <main className="login-card">
        <div className="login-header">
          <h2>Bem-vindo de volta</h2>
          <p>Por favor, digite as informações abaixo</p>
        </div>

        <form className="login-form" onSubmit={handleEntrar}>
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="Entre com seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              placeholder="Digite sua senha de 8 digitos"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <div className="esqueceusenha">
            <a href="#">Esqueceu sua senha?</a>
          </div>

          <button type="submit" className="btn-primary">
            Entrar
          </button>
        </form>

        <div className="divider">
          <span>ou</span>
        </div>

        <button className="btn-google">
          <img src="src/assets/icon google.png" alt="Google Icon" />
          Entrar com Google
        </button>

        <div className="signup-link">
          <p>
            Não tem conta? <span onClick={handleCriarConta}>Inscreva-se</span>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Home;
