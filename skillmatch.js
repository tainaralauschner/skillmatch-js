// ======================================================
// SkillMatch JS
// Simulador de Compatibilidade com Vaga Front-End Júnior
// Mini-Projeto Avaliativo - Módulo 01 - Semana 06
// ======================================================

console.clear();

// Objeto que representa a pessoa candidata
const candidato = {
  nome: "Tainara",
  area: "Front-End",
  habilidades: ["JavaScript", "GitHub", "Kanban"],
  experienciaMeses: 3,
};
// Classe principal que representa uma vaga
class Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade) {
    this.id = id;
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos;
    this.salario = salario;
    this.modalidade = modalidade;
  }

  // Método que usa this para acessar os dados da própria vaga
  exibirResumo() {
    return `${this.cargo} na empresa ${this.empresa}`;
  }
}
// Classe filha que herda características da classe Vaga
class VagaFrontEnd extends Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade, nivel) {
    super(id, empresa, cargo, requisitos, salario, modalidade);
    this.nivel = nivel;
  }

  exibirNivel() {
    return `Nível da vaga: ${this.nivel}`;
  }
}
// Array com vagas fictícias
const vagas = [
  new VagaFrontEnd(
    1,
    "TechStart",
    "Desenvolvedora Front-End Júnior",
    ["JavaScript", "GitHub", "Lógica de Programação"],
    2800,
    "Remoto",
    "Júnior",
  ),

  new VagaFrontEnd(
    2,
    "CodeLab",
    "Estágio Front-End",
    ["JavaScript", "Kanban", "GitHub"],
    1800,
    "Híbrido",
    "Estágio",
  ),

  new VagaFrontEnd(
    3,
    "WebSolutions",
    "Programadora JavaScript Júnior",
    ["JavaScript", "Arrays", "Objetos", "Funções"],
    3000,
    "Presencial",
    "Júnior",
  ),

  new VagaFrontEnd(
    4,
    "DevFuture",
    "Desenvolvedora Front-End Trainee",
    ["JavaScript", "HTML", "CSS", "GitHub", "React"],
    2500,
    "Remoto",
    "Trainee",
  ),
];
// Função que encontra quais requisitos da vaga o candidato possui
const encontrarHabilidadesAtendidas = (vaga) => {
  return vaga.requisitos.filter((requisito) => {
    return candidato.habilidades.includes(requisito);
  });
};
// Função que encontra quais requisitos da vaga o candidato ainda não possui
const encontrarHabilidadesFaltantes = (vaga) => {
  return vaga.requisitos.filter((requisito) => {
    return !candidato.habilidades.includes(requisito);
  });
};
// Função que calcula o percentual de compatibilidade com a vaga
const calcularCompatibilidade = (vaga) => {
  const habilidadesAtendidas = encontrarHabilidadesAtendidas(vaga);

  const compatibilidade =
    (habilidadesAtendidas.length / vaga.requisitos.length) * 100;

  return Math.round(compatibilidade);
};
// Função que classifica a compatibilidade usando if, else if e else
const classificarCompatibilidade = (percentual) => {
  if (percentual >= 80) {
    return "Alta compatibilidade";
  } else if (percentual >= 50) {
    return "Média compatibilidade";
  } else {
    return "Baixa compatibilidade";
  }
};
// Função que analisa uma vaga e retorna um objeto com o resultado
const analisarVaga = (vaga) => {
  let habilidadesAtendidas = encontrarHabilidadesAtendidas(vaga);
  let habilidadesFaltantes = encontrarHabilidadesFaltantes(vaga);
  let compatibilidade = calcularCompatibilidade(vaga);
  let classificacao = classificarCompatibilidade(compatibilidade);

  return {
    empresa: vaga.empresa,
    cargo: vaga.cargo,
    modalidade: vaga.modalidade,
    salario: vaga.salario,
    nivel: vaga.nivel,
    compatibilidade: compatibilidade,
    classificacao: classificacao,
    habilidadesAtendidas: habilidadesAtendidas,
    habilidadesFaltantes: habilidadesFaltantes,
  };
};
// O map cria um novo array com a análise de todas as vagas
const resultados = vagas.map((vaga) => {
  return analisarVaga(vaga);
});
// Função responsável por mostrar no console a análise de cada vaga
const exibirResultados = () => {
  console.log("===== RESULTADO DA ANÁLISE DE VAGAS =====");

  for (let i = 0; i < resultados.length; i++) {
    console.log("----------------------------------------");
    console.log(`Empresa: ${resultados[i].empresa}`);
    console.log(`Cargo: ${resultados[i].cargo}`);
    console.log(`Modalidade: ${resultados[i].modalidade}`);
    console.log(`Salário: R$ ${resultados[i].salario}`);
    console.log(`Compatibilidade: ${resultados[i].compatibilidade}%`);
    console.log(`Classificação: ${resultados[i].classificacao}`);
    console.log(
      `Habilidades encontradas: ${resultados[i].habilidadesAtendidas.join(", ")}`,
    );
    console.log(
      `Habilidades faltantes: ${
        resultados[i].habilidadesFaltantes.length > 0
          ? resultados[i].habilidadesFaltantes.join(", ")
          : "Nenhuma"
      }`,
    );
  }
};
// O reduce compara os resultados e retorna a vaga com maior compatibilidade
const encontrarMelhorVaga = () => {
  return resultados.reduce((melhorVaga, vagaAtual) => {
    if (vagaAtual.compatibilidade > melhorVaga.compatibilidade) {
      return vagaAtual;
    }

    return melhorVaga;
  });
};
// Função que mostra no console a vaga mais compatível
const exibirMelhorVaga = () => {
  const melhorVaga = encontrarMelhorVaga();

  console.log("----------------------------------------");
  console.log("===== VAGA MAIS COMPATÍVEL =====");
  console.log(`${melhorVaga.empresa} - ${melhorVaga.cargo}`);
  console.log(`Compatibilidade: ${melhorVaga.compatibilidade}%`);
};
// Função que gera uma recomendação com base nas habilidades faltantes
const gerarRecomendacaoDeEstudo = () => {
  const todasHabilidadesFaltantes = resultados.reduce((acumulador, vaga) => {
    return acumulador.concat(vaga.habilidadesFaltantes);
  }, []);

  const habilidadesUnicas = todasHabilidadesFaltantes.filter(
    (habilidade, indice, array) => {
      return array.indexOf(habilidade) === indice;
    },
  );

  if (habilidadesUnicas.length === 0) {
    return "Você atende a todos os requisitos das vagas analisadas.";
  }

  return `Priorize estudar: ${habilidadesUnicas.join(", ")}.`;
};
// Função que exibe a recomendação de estudo
const exibirRecomendacaoDeEstudo = () => {
  console.log("----------------------------------------");
  console.log("===== RECOMENDAÇÃO DE ESTUDO =====");
  console.log(gerarRecomendacaoDeEstudo());
};
// O find busca a primeira vaga que tenha modalidade remota
const encontrarVagaRemota = () => {
  return vagas.find((vaga) => {
    return vaga.modalidade === "Remoto";
  });
};
// O every verifica se o candidato possui todos os requisitos de uma vaga
const verificarTodosRequisitos = (vaga) => {
  return vaga.requisitos.every((requisito) => {
    return candidato.habilidades.includes(requisito);
  });
};
// Função para demonstrar o uso do find e do every
const exibirExemplosDeMetodos = () => {
  let vagaRemota = encontrarVagaRemota();

  console.log("----------------------------------------");
  console.log("===== EXEMPLOS DE FIND E EVERY =====");

  console.log(`Primeira vaga remota encontrada: ${vagaRemota.exibirResumo()}`);

  let atendeTodosRequisitos = verificarTodosRequisitos(vagaRemota);

  console.log(
    `A candidata atende todos os requisitos dessa vaga? ${atendeTodosRequisitos}`,
  );
};
// Função que recebe outra função como parâmetro
const finalizarAnalise = (nomeCandidato, callback) => {
  console.log("----------------------------------------");
  console.log("===== CALLBACK =====");
  console.log("Análise finalizada.");

  callback(nomeCandidato);
};

// Função que será enviada como callback
const exibirMensagemFinal = (nome) => {
  console.log(
    `${nome}, revise suas habilidades faltantes e atualize seu plano de estudos.`,
  );
};
// Closure: função que mantém acesso ao valor interno total
const criarContadorDeAnalises = () => {
  let total = 0;

  return () => {
    total++;
    return total;
  };
};

const contadorDeAnalises = criarContadorDeAnalises();
// Promise simulando carregamento de vagas como se viessem de um servidor
const buscarVagasSimuladas = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(vagas);
    }, 1000);
  });
};
// Função principal do sistema usando async/await
const iniciarSistema = async () => {
  console.log("Carregando vagas...");

  let vagasCarregadas = await buscarVagasSimuladas();

  console.log("Vagas carregadas com sucesso!");
  console.log(`Total de vagas carregadas: ${vagasCarregadas.length}`);

  console.log(`Total de análises executadas: ${contadorDeAnalises()}`);

  exibirResultados();
  exibirMelhorVaga();
  exibirRecomendacaoDeEstudo();
  exibirExemplosDeMetodos();

  finalizarAnalise(candidato.nome, exibirMensagemFinal);
};
// Chamada da função principal para iniciar o sistema
iniciarSistema();
