const readline = require('readline'); // Módulo para ler entradas no terminal
const { treinoSemanal } = require('./treinoData'); // Importando os dados do treino
const fs = require('fs'); // Módulo para escrever no arquivo

// Configurando o readline para interagir com o usuário
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Função para salvar os dados atualizados de volta em treinoData.js
function salvarTreino() {
    const treinoJson = JSON.stringify(treinoSemanal, null, 2); // Converte para JSON formatado
    fs.writeFileSync('./treinoData.js', `module.exports = { treinoSemanal: ${treinoJson} };`); // Salva no arquivo
}

// Função para exibir os treinos da semana
function exibirTreinos() {
    console.log("\nTreino Semanal:");
    for (const dia in treinoSemanal) {
        console.log(`\n${dia.charAt(0).toUpperCase() + dia.slice(1)}:`);
        if (treinoSemanal[dia].length === 0) {
            console.log("  Dia de descanso!");
        } else {
            treinoSemanal[dia].forEach((item, index) => {
                console.log(`  ${index + 1}. ${item.exercicio} - ${item.series} séries de ${item.repeticoes} repetições`);
            });
        }
    }
}

function deletarTreino() {
    rl.question("\nQual dia da semana você gostaria de deletar o treino? (ex: segunda, terca, etc.): ", (dia) => {
        if (dia.toLowerCase() === 'cancelar') {
            console.log("Operação cancelada. Voltando ao menu...");
            return menu(); // Volta ao menu se o usuário digitar "cancelar"
        }

        if (treinoSemanal[dia]) {
            rl.question(`Tem certeza que deseja deletar o treino de ${dia}? (sim/não): `, (confirmacao) => {
                if (confirmacao.toLowerCase() === 'sim') {
                    treinoSemanal[dia] = []; // Deleta todos os exercícios do dia
                    console.log(`Treino de ${dia} deletado com sucesso!`);
                    salvarTreino();
                } else {
                    console.log("Operação cancelada. Voltando ao menu...");
                }
                menu(); // Volta ao menu após a operação (seja deletando ou cancelando)
            });
        } else {
            console.log("Dia não encontrado. Tente novamente.");
            menu(); // Volta ao menu caso o dia não exista
        }
    });
}

// Função para adicionar ou atualizar um exercício no treino de um dia específico
function atualizarTreino() {
    rl.question("\nQual dia da semana você gostaria de atualizar o treino? (ex: segunda, terca, etc.): ", (dia) => {
        if (dia.toLowerCase() === 'cancelar') {
            console.log("Operação cancelada. Voltando ao menu...");
            return menu(); // Volta ao menu se o usuário digitar "cancelar"
        }

        if (treinoSemanal[dia]) {
            // Exibe os treinos já cadastrados para o dia
            console.log(`\nTreinos já cadastrados para ${dia.charAt(0).toUpperCase() + dia.slice(1)}:`);
            treinoSemanal[dia].forEach((item, index) => {
                console.log(`${index + 1}. ${item.exercicio} - ${item.series} séries de ${item.repeticoes} repetições`);
            });

            // Pergunta qual exercício o usuário quer atualizar
            rl.question("\nDigite o número do exercício que você deseja atualizar ou digite 'cancelar' para voltar ao menu: ", (numero) => {
                if (numero.toLowerCase() === 'cancelar') {
                    console.log("Operação cancelada. Voltando ao menu...");
                    return menu(); // Volta ao menu se o usuário digitar "cancelar"
                }

                const indexExercicio = parseInt(numero) - 1; // Converte o número para índice

                if (indexExercicio >= 0 && indexExercicio < treinoSemanal[dia].length) {
                    const exercicioAtual = treinoSemanal[dia][indexExercicio];
                    rl.question(`Você escolheu o exercício: ${exercicioAtual.exercicio}. Deseja atualizar esse exercício? (sim/não): `, (confirmacao) => {
                        if (confirmacao.toLowerCase() === 'sim') {
                            rl.question("Quantas séries? ", (series) => {
                                rl.question("Quantas repetições? ", (repeticoes) => {
                                    // Atualiza o exercício escolhido
                                    treinoSemanal[dia][indexExercicio].series = parseInt(series);
                                    treinoSemanal[dia][indexExercicio].repeticoes = parseInt(repeticoes);
                                    console.log(`Exercício ${exercicioAtual.exercicio} atualizado com sucesso!`);

                                    salvarTreino();
                                    menu(); // Retorna ao menu após a atualização
                                });
                            });
                        } else {
                            console.log("Operação cancelada. Voltando ao menu...");
                            menu(); // Retorna ao menu se o usuário não confirmar a atualização
                        }
                    });
                } else {
                    console.log("Número de exercício inválido. Tente novamente.");
                    menu(); // Retorna ao menu se o número estiver fora do intervalo válido
                }
            });
        } else {
            console.log("Dia não encontrado. Tente novamente.");
            menu(); // Volta ao menu caso o dia não exista
        }
    });
}

function menu() {
    rl.question("\nEscolha uma opção:\n1. Exibir treinos\n2. Deletar treino de um dia\n3. Atualizar treino\n4. Sair\nEscolha: ", (opcao) => {
        switch (opcao) {
            case '1':
                exibirTreinos();
                rl.close();
                break;
            case '2':
                deletarTreino();
                break;
            case '3':
                atualizarTreino();
                break;
            case '4':
                rl.close();
                console.log("Saindo...");
                break;
            default:
                console.log("Opção inválida. Tente novamente.");
                menu();
                break;
        }
    });
}

// Exportando as funções para serem usadas em outros arquivos
module.exports = {
    menu,
    exibirTreinos,
    deletarTreino,
    atualizarTreino
};
