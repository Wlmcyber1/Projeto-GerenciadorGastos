import "./home.css";
import { useForm } from "react-hook-form";
function EsqueceuSenha({ onVoltar }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const emailDigitado = data.email;

    const emailDoUser =
      JSON.parse(localStorage.getItem("usuarios_cadastrados")) || [];

    
    const emailEncontrado = emailDoUser.find((user)=>user.email===emailDigitado)

    if (emailEncontrado) {
      alert(`Instruções de recuperação enviadas para: ${emailDigitado}`);
      onVoltar();
    } else {
      alert("Este e-mail não está cadastrado no sistema.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <header className="auth-header">
          <div className="brand-logo">M</div>
          <h1>Maglo.</h1>
          <p className="auth-subtitle">Recuperação de Conta</p>
        </header>

        <p className="instructions-text">
          Insira o e-mail associado à sua conta. Enviaremos as instruções para
          redefinir a sua palavra-passe.
        </p>

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <label htmlFor="email">E-mail Cadastrado</label>
            <input
              {...register("email", {
                required: "Por favor, digite seu e-mail",
              })}
            />
          </div>

          <button type="submit" className="btn-primary">
            Enviar Instruções
          </button>
        </form>

        <footer className="auth-footer">
          {/* Executa a volta para o Login */}
          <button type="button" className="btn-link" onClick={onVoltar}>
            ❮ Voltar para o Login
          </button>
        </footer>
      </div>
    </div>
  );
}

export default EsqueceuSenha;
