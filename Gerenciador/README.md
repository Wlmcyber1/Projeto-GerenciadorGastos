o que está acontecendo no código? 
import { useEffect, useState } from "react";
import axios, { Axios } from "axios"; // importamos o axios para nos ajudar na requisão de api externas. ele facilita tudo 
import "./App.css";

function App() {
  const [input, setInput] = useState(); aqui eu criei um state de input e botao para eu seguir com jaja uma atualizacao no código 
  const [botao, setBotao] = useState();
  const [dadosPokemon, setDadosPokemon] = useState([]);
  async function getpokemons() { // criamos uma function assicrona getpokemon, onde ela retorna uma promessa de resposta. guardamos em uma variavel response e usamos 
  o await justamente por ser uma função assicrona. o axios.get retorna o objeto 
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
    return response.data.results;  estou filtrando aqui para retornar somente o results. pois como o return é muito longo, mais tarde teriamos que usar mais código 
  }
como toda e qualquer coisa no react, precisamos do useeffect para monitorar a api. 

como funciona? 
Uma requisição de API é uma Promise (Promessa). Ela leva tempo para ir até o servidor e voltar. O JavaScript não espera sentado; ele continua rodando o resto do código.

Para lidar com isso, temos duas opções:

Opção antiga/tradicional (.then()): Você diz para o JavaScript: "Faça a requisição. ENTÃO (then), quando ela voltar com sucesso, pegue esse resultado (data) e faça isso com ele."

Opção moderna (async/await): Você avisa que a função é assíncrona (async) e diz: "AGUARDE (await) essa requisição terminar antes de ir para a próxima linha de código."

Na sua função getpokemons, você usou await. Portanto, ela já resolveu a promessa ali dentro! Não fazia sentido usar .then() logo depois dentro do useEffect.
  useEffect(() => {

    getpokemons()
    .then((data) => 
      setDadosPokemon
    (data.map(d=> d.name)));
  }, []);
 // return (
    //<>
     <div className="container">
        <p>Bem vindo a busca de pokemon </p>
        <div className="input-button">
          <input
            onChange={(evento) => {
              setInput(evento.target.value);
            }}
            type="text"
            placeholder="Digite a cidade que deseja verificar"
          />

          <button> Buscar </button>
          {dadosPokemon.map(pokemon=> <p>{pokemon}</p>)} // aqui dentro mapeamos a variavel dadospokemon (quando ela ja foi alterada) mapeamos novamente e mostramos o nome do pokemon
        </div>
      </div>
    </>
  );
}
export default App;


O seu nó na cabeça aconteceu porque você misturou duas formas diferentes de resolver Promises (promessas): o async/await e o .then(). É como tentar dirigir um carro usando o volante e o controle remoto ao mesmo tempo.

1. O mistério do .then() desvendado
Uma requisição de API é uma Promise (Promessa). Ela leva tempo para ir até o servidor e voltar. O JavaScript não espera sentado; ele continua rodando o resto do código.

Para lidar com isso, temos duas opções:

Opção antiga/tradicional (.then()): Você diz para o JavaScript: "Faça a requisição. ENTÃO (then), quando ela voltar com sucesso, pegue esse resultado (data) e faça isso com ele."

Opção moderna (async/await): Você avisa que a função é assíncrona (async) e diz: "AGUARDE (await) essa requisição terminar antes de ir para a próxima linha de código."

Na sua função getpokemons, você usou await. Portanto, ela já resolveu a promessa ali dentro! Não fazia sentido usar .then() logo depois dentro do useEffect.

2. O real papel do useEffect
Você escreveu que o useEffect serve para "monitorar a API". Na verdade, o useEffect serve para sincronizar seu componente com efeitos colaterais (coisas fora do controle do React, como buscar dados de uma API externa, configurar um timer, etc.).

Com a lista vazia no final [] (o array de dependências), você está dizendo ao React: "Execute esse código apenas UMA VEZ, logo após o componente aparecer na tela."


import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import "./App.css";

function App() {
  const [input, setInput] = useState();
  const [botao, setBotao] = useState();
  const [dadosPrevisao, setDadosPrevisao] = useState("");

  // api para encontrar lon e lat
  async function localizarLonLat() {
    if (!input) {
      alert("Digite o nome da cidade");
      return;
    }
    const responseLocal = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=38b7c42bef128f83cb5eaa09531486e3`,
    );
    //console.log(responseLocal.data);
    //setDadosPrevisao(responseLocal.data);
    const latitude = responseLocal.data[0].lat;
    const longitude = responseLocal.data[0].lon;
    console.log(longitude, latitude);
  }
  //async function previsaoTempo() {
  // const coordenadas = await localizarLonLat();

  //if (!coordenadas) {
  // return;
  //}
  // const responsePrevisao = await axios.get(
  //`https://api.openweathermap.org/data/4.0/onecall/current?lat=${coordenadas.latitude}&lon=${coordenadas.longitude}&appid=38b7c42bef128f83cb5eaa09531486e3`,
  //);

  //console.log(responsePrevisao.data);
  //}

  return (
    <div>
      <h2>Previsão do tempo</h2>
      <input
        type="text"
        placeholder="Digite o nome da cidade "
        onChange={(evento) => {
          setInput(evento.target.value);
        }}
      />

      <button onClick={localizarLonLat}>Buscar</button>
    </div>
  );
}
export default App;
