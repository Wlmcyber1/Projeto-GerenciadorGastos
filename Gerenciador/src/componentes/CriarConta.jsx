import { useState } from "react";
import Home from "./Home";
import { List } from "lucide-react";
import { useForm } from "react-hook-form";

function CriarConta() {
  const [acessarConta, setAcessarConta] = useState(false);
  const [erro, setErro] = useState(false);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const idGerado = Date.now().toString();
    const nomeDigitado = data.nome;
    const senhaDigitada = data.senha;
    const emailDigitado = data.email;
    const confirmarSenha = data.confirmarsenha;

    const todosOsCadastrados =
      JSON.parse(localStorage.getItem("usuarios_cadastrados")) || [];

    const emailExiste = todosOsCadastrados.some(
      (usuario) => usuario.email === emailDigitado,
    );
    if (emailExiste) {
      alert("O email já existe!");
      return;
    }

    if (senhaDigitada !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    if (emailDigitado.trim() !== "") {
      const novoUsuario = {
        nome: nomeDigitado,
        idUsuario: idGerado,
        email: emailDigitado,
        senha: senhaDigitada,
      };
      localStorage.setItem("usuario_logado_agora", JSON.stringify(novoUsuario));

      todosOsCadastrados.push(novoUsuario);

      localStorage.setItem(
        "usuarios_cadastrados",
        JSON.stringify(todosOsCadastrados),
      );

      alert("Usuário cadastrado com sucesso!");

      setAcessarConta(true);
    }
  };

  if (acessarConta) {
    return <Home />;
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

        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <label htmlFor="nome">Nome Completo</label>
            <input
              id="nome"
              type="text"
              placeholder="Digite seu nome completo"
              {...register("nome")}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="Entre com seu e-mail"
              {...register("email")}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input
              {...register("senha")}
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
              {...register("confirmarsenha")}
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
            <span onClick={() => setAcessarConta(true)}>Faça login</span>
          </p>
        </div>
      </main>
    </div>
  );
}

export default CriarConta;
