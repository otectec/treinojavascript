
const treinoSemanal = {
    segunda: [
        { exercicio: 'Supino reto', series: 4, repeticoes: 10 },
        { exercicio: 'Agachamento', series: 4, repeticoes: 12 },
        { exercicio: 'Puxada na frente', series: 4, repeticoes: 10 }
    ],
    terca: [
        { exercicio: 'Remada curvada', series: 4, repeticoes: 10 },
        { exercicio: 'Cadeira extensora', series: 3, repeticoes: 12 },
        { exercicio: 'Rosca direta', series: 3, repeticoes: 12 }
    ],
    quarta: [
        { exercicio: 'Levantamento terra', series: 4, repeticoes: 8 },
        { exercicio: 'Abdômen', series: 3, repeticoes: 20 }
    ],
    quinta: [
        { exercicio: 'Supino inclinado', series: 4, repeticoes: 10 },
        { exercicio: 'Leg press', series: 4, repeticoes: 12 },
        { exercicio: 'Tríceps testa', series: 3, repeticoes: 12 }
    ],
    sexta: [
        { exercicio: 'Pull-up', series: 4, repeticoes: 8 },
        { exercicio: 'Agachamento com barra', series: 4, repeticoes: 10 },
        { exercicio: 'Crunch abdominal', series: 3, repeticoes: 20 }
    ],
    sabado: [
        { exercicio: 'Flexão de braço', series: 3, repeticoes: 15 },
        { exercicio: 'Panturrilha em pé', series: 4, repeticoes: 15 }
    ],
    domingo: [] 
};


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
