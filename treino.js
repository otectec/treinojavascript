
const {treinoSemanal} = require ('./treinoData'); 
const {menu} = require ('./interacoes');

menu ();

function obterDiaSemana() {
    const dias = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
    const hoje = new Date();
    const diaSemana = hoje.getDay(); 
    return dias[diaSemana];
}

function mostrarTreinoDia(dia) {
    const treino = treinoSemanal[dia];
    if (treino.length === 0) {
        console.log(`Hoje é dia de descanso!`);
    } else {
        console.log(`Treino de ${dia.charAt(0).toUpperCase() + dia.slice(1)}:`);
        treino.forEach(item => {
            console.log(`- ${item.exercicio}: ${item.series} séries de ${item.repeticoes} repetições`);
        });
    }
}

function treinoHoje() {
    const diaAtual = obterDiaSemana();
    mostrarTreinoDia(diaAtual);
}

treinoHoje();
