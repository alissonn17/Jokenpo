const jogar = document.getElementById("jogar");
const resultadoElement = document.getElementById("resultado");
const jogador = document.getElementById("jogador");
const computador = document.getElementById("computador");

// Habilitar e desabilitar checkboxes
function permitirUmaEscolhaPorGrupo(nomeGrupo) {
    const checkboxes = document.querySelectorAll(`input[name="${nomeGrupo}"]`);

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            checkboxes.forEach((outroCheckbox) => {
                if (outroCheckbox !== checkbox) {
                    outroCheckbox.disabled = checkbox.checked;
                }
            });
        });
    });
}

permitirUmaEscolhaPorGrupo("jogada");

// Regras do Jogo
function regrasJogo(obj1, obj2) {
    let vencedor = "";

    if ((obj1 === "pedra" && obj2 === "tesoura") || (obj1 === "tesoura" && obj2 === "pedra")) {
        vencedor = "pedra";
    } else if ((obj1 === "tesoura" && obj2 === "papel") || (obj1 === "papel" && obj2 === "tesoura")) {
        vencedor = "tesoura";
    } else if ((obj1 === "papel" && obj2 === "pedra") || (obj1 === "pedra" && obj2 === "papel")) {
        vencedor = "papel";
    }

    return vencedor;
}

// Implementação das regras do jogo
function resultadoJogo(escolhaUsuario, robo) {
    if (escolhaUsuario === robo) {
        return "Empate!";
    }

    const jogadaVencedora = regrasJogo(escolhaUsuario, robo);
    return jogadaVencedora === escolhaUsuario
        ? "Você venceu!"
        : "O computador venceu!";
}

jogar.addEventListener("click", () => {
    jogar.disabled = true; // Desabilitar o botão de jogar após o clique
    jogar.style.backgroundColor = "gray"; // Resetar a cor de fundo do botão

    const escolhaUsuario = document.querySelector('input[name="jogada"]:checked');

    if (!escolhaUsuario) {
        alert("Por favor, selecione uma opção antes de jogar.");
        return;
    }

    const opcoes = ["pedra", "papel", "tesoura"];
    const robo = opcoes[Math.floor(Math.random() * opcoes.length)];

    jogador.textContent = `Você escolheu: ${escolhaUsuario.value}`;
    computador.textContent = `Computador escolheu: ${robo}`;

    const mensagemResultado = resultadoJogo(escolhaUsuario.value, robo);
    resultadoElement.textContent = mensagemResultado;
});

reiniciar.addEventListener("click", () => {
    jogar.disabled = false; // Habilitar o botão de jogar novamente
    jogar.style.backgroundColor = ""; // Resetar a cor de fundo do botão

    // Limpar seleção do usuário
    const checkboxes = document.querySelectorAll('input[name="jogada"]');  

    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
        checkbox.disabled = false;
    });


    resultadoElement.textContent = "";
    jogador.textContent = "";
    computador.textContent = "";
});