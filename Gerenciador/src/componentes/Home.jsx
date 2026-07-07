import { useState } from "react";
import "./home.css";
import PagInicio from "./PagInicio";
import CriarConta from "./CriarConta";
import EsqueceuSenha from "./EsqueceuSenha";
import { useForm } from "react-hook-form";
function Home() {
 
  const [mostrarComponente, setMostrarComponente] = useState(false);
  const [criarConta, setCriarConta] = useState(false);
  const [erro, setErro] = useState(false);
  const [telaRecuperacao, setTelaRecuperacao] = useState(false);

  const { register, handleSubmit } = useForm();

  const handleEntrar = (data) => {
    const emailDigitado = data.email;
    const senhaDigitada = data.senha; 
    const todosOsCadastrados =
      JSON.parse(localStorage.getItem("usuarios_cadastrados")) || [];

    const contaExiste = todosOsCadastrados.find(
      (usuario) => usuario.email === emailDigitado && usuario.senha === senhaDigitada,
    );

    if (emailDigitado === "" || senhaDigitada === "") {
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

  const handleEsqueceuSenha = (e) => {
    e.preventDefault();
    setTelaRecuperacao(true); // Ativa a tela
  };

  // Condicional com o novo nome do estado
  if (telaRecuperacao) {
    return <EsqueceuSenha onVoltar={() => setTelaRecuperacao(false)} />;
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

        <form className="login-form" onSubmit={handleSubmit(handleEntrar)}>
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input {...register("email")} />
          </div>

          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input
              {...register("senha")}
            />
          </div>

          <div className="esqueceusenha">
            <a href="#" onClick={handleEsqueceuSenha}>
              Esqueceu sua senha?
            </a>
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
