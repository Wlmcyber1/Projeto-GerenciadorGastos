import { useState } from "react";
import Home from "./Home";
import { List } from "lucide-react";

function CriarConta() {
  
  const [acessarConta, setAcessarConta] = useState(false);
  const [erro, setErro] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confimarSenha, setConfirmarSenha] = useState("");
  const handleVerificarUser = (e) => {
    const idGerado = Date.now().toString(); 
    
    e.preventDefault();

    const todosOsCadastrados =
      JSON.parse(localStorage.getItem("usuarios_cadastrados")) || [];

    const emailExiste = todosOsCadastrados.some(
      (usuario) => usuario.email === email, 
    );
    if (emailExiste) {
      alert("O email já existe!");
    }
    
    else if (senha !== confimarSenha) {
      alert("As senhas não coincidem!");
    }
    else if(email.trim() !==''){
      const novoUsuario = {
      nome: nome,
      idUsuario: idGerado,
      email: email,
      senha: senha,
    };
    localStorage.setItem("usuario_logado_agora", JSON.stringify(novoUsuario));

    todosOsCadastrados.push(novoUsuario);

    localStorage.setItem(
      "usuarios_cadastrados",
      JSON.stringify(todosOsCadastrados),
    );

    alert("Usuário cadastrado com sucesso!");

    setNome("");
    setEmail("");
    }
    
  };
  
  const handleAcessarConta = () => {
    setAcessarConta(true);
  };
  if (acessarConta) {
    return <Home />;
  }

  const onSubmit = ()=>{
    console.log(dados)
  }
  return (
    <div className="page-container">
      <nav className="navbar">
        <div className="m">
          <p>M</p>
        </div>
        <p className="maglo">Maglo.</p>
      </nav>

      <main className="login-card">
        <div className="login-header">
          <h2>Crie sua conta</h2>
          <p>Por favor, preencha os campos abaixo para se cadastrar</p>
        </div>

        <form className="login-form" onSubmit={handleVerificarUser}>
          <div className="input-group">
            <label htmlFor="nome">Nome Completo</label>
            <input
              id="nome"
              type="text"
              placeholder="Digite seu nome completo"
              onChange={(e) => {
                setNome(e.target.value);
              }}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="Entre com seu e-mail"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input
              onChange={(e) => setSenha(e.target.value)}
              id="password"
              type="password"
              placeholder="Crie uma senha forte"
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Repita a senha criada"
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ marginTop: "10px" }}
          >
            Cadastrar
          </button>
        </form>

        <div className="signup-link">
          <p>
            Já tem uma conta?{" "}
            <span onClick={handleAcessarConta}>Faça login</span>
          </p>
        </div>
      </main>
    </div>
  );
}

export default CriarConta;
