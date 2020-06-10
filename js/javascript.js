// -------------------------------------------------------- FUNÇÕES AUXILIARES --------------------------------------------------------
function novaMatriz(tamanhoMatriz) {
	var matriz = new Array(tamanhoMatriz);

	for(var i = 0; i < tamanhoMatriz; i++) {
		matriz[i] = new Array(tamanhoMatriz);
	}

	return matriz;
}

function calcularDeterminante(matrizChave) {
	var ordemMatriz = matrizChave.length;
	var determinanteMatriz = 0;

	if (ordemMatriz == 1) {
		return matrizChave[0][0];
	} else if (ordemMatriz == 2) {
		return matrizChave[0][0] * matrizChave[1][1] - matrizChave[0][1] * matrizChave[1][0];
	}

	for (var j = 0; j < ordemMatriz; j++) {
		determinanteMatriz += matrizChave[0][j] * calcularCofator(matrizChave, j);
	}

	return determinanteMatriz;
}

function calcularCofator(matrizChave, coluna) {
	var ordemMatriz = matrizChave.length;
	var matrizAuxiliar = [];
	var auxiliar = 0;

	for (var i = 1; i < ordemMatriz; i++) {
		matrizAuxiliar[auxiliar] = [];

		for (var j = 0; j < ordemMatriz; j++) {
			if (j != coluna) {
				matrizAuxiliar[auxiliar].push(matrizChave[i][j]);
			}
		}

		auxiliar++;
	}

	return Math.pow(-1, coluna) * calcularDeterminante(matrizAuxiliar);
}

function calcularMatrizCofatores(matrizChave) {
	var matriz = novaMatriz(matrizChave.length);

	for(var i = 0; i < matrizChave.length; i++) {
		for(var j = 0; j < matrizChave.length; j++) {
			var determinante = novaMatriz(matrizChave.length - 1);
			var valorDeterminante;
			for(var i2 = 0; i2 < matrizChave.length; i2++) {
				if(i2 != i) {
					for(var j2 = 0; j2 < matrizChave.length; j2++) {
						if(j2 != j) {
							var indice1 = i2 < i ? i2 : i2 - 1;
							var indice2 = j2 < j ? j2 : j2 - 1;
							determinante[indice1][indice2] = matrizChave[i2][j2];
						}
					}
				}
			}

			valorDeterminante = calcularDeterminante(determinante);
			matriz[i][j] = valorDeterminante * Math.pow(-1, i + j + 2);
		}
	}

	return matriz;
}

function calcularMatrizTransposta(matrizCofator) {
	var matriz = novaMatriz(matrizCofator.length);

	for(var i = 0; i < matrizCofator.length; i++) {
		for(var j = 0; j < matrizCofator.length; j++) {
			matriz[i][j] = matrizCofator[j][i];
		}
	}

	return matriz;
}
 
function calcularMatrizAdjunta(matrizChave) {
	return calcularMatrizTransposta(calcularMatrizCofatores(matrizChave));
}
// -------------------------------------------------------- FUNÇÕES AUXILIARES --------------------------------------------------------


function validarMultiplicacaoMensagemCriptografadaChave(mensagemCriptografadaCaracteres, chaveCaracteres) {
	//console.log("VALIDAR A SE A MULTIPLICAÇÃO PODE OCORRER, PARA ISSO A MENSAGEM E A CHAVE DEVEM POSSUIR A MESMA QUANTIDADE DE CARACTERES (PARA FORMAREM UMA MATRIZ DE ORDENS IGUAIS ENTRE SI)");

	if (mensagemCriptografadaCaracteres == "" || chaveCaracteres == "") {
		return false;
	} else {
		if (mensagemCriptografadaCaracteres.slice(-1) == " ") {
			mensagemCriptografadaCaracteres = mensagemCriptografadaCaracteres.slice(0, - 1);
		}

		if (chaveCaracteres.slice(-1) == " ") {
			chaveCaracteres = chaveCaracteres.slice(0, - 1);
		}

		if ((Math.sqrt(mensagemCriptografadaCaracteres.split(" ").length) % 1 == 0) &&  Math.sqrt(mensagemCriptografadaCaracteres.split(" ").length) == Math.sqrt(chaveCaracteres.split(" ").length)) {
			return true;
		} else {
			return false;
		}
	}
}

function conversaoMensagemMatriz(mensagemCriptografadaCaracteres) {
	//console.log("RECEBER A MENSAGEM CODIFICADA EM UM VETOR DE CARACTERES E CONVERTÊ-LO EM UM ARRAY BIDIMENSIONAL: 2x2 = 4 caracteres / Matriz 3x3 = 9 caracteres / Matriz 4x4 = 16 caracteres / Matriz 5x5 = 25 caracteres");

	if (mensagemCriptografadaCaracteres.slice(-1) == " ") {
		mensagemCriptografadaCaracteres = mensagemCriptografadaCaracteres.slice(0, - 1);
	}

	var vetorMensagemCriptografada;
	var tamanhoVetor;
	var ordemMatriz;
	var matrizMensagemCriptografada;

	vetorMensagemCriptografada = mensagemCriptografadaCaracteres.split(" ");
	tamanhoVetor = vetorMensagemCriptografada.length;
	ordemMatriz = Math.sqrt(tamanhoVetor);
	matrizMensagemCriptografada = novaMatriz(ordemMatriz);

	var auxiliar1 = 0;
	var auxiliar2 = 0;
	for (var i = 0; i < tamanhoVetor; i = i + ordemMatriz) {
		matrizMensagemCriptografada[auxiliar1] = vetorMensagemCriptografada.slice(i, auxiliar2 += ordemMatriz);
		auxiliar1++;
	}

	return matrizMensagemCriptografada;
}

function conversaoChaveMatriz(chaveCaracteres) {
	//console.log("RECEBER A CHAVE EM UM VETOR DE CARACTERES E CONVERTÊ-LO EM UM ARRAY BIDIMENSIONAL: 2x2 = 4 caracteres / Matriz 3x3 = 9 caracteres / Matriz 4x4 = 16 caracteres / Matriz 5x5 = 25 caracteres");

	if (chaveCaracteres.slice(-1) == " ") {
		chaveCaracteres = chaveCaracteres.slice(0, - 1);
	}

	var vetorChave;
	var tamanhoVetor;
	var ordemMatriz;
	var matrizChave;

	vetorChave = chaveCaracteres.split(" ");
	tamanhoVetor = vetorChave.length;
	ordemMatriz = Math.sqrt(tamanhoVetor);
	matrizChave = novaMatriz(ordemMatriz);

	var auxiliar1 = 0;
	var auxiliar2 = 0;
	for (var i = 0; i < tamanhoVetor; i = i + ordemMatriz) {
		matrizChave[auxiliar1] = vetorChave.slice(i, auxiliar2 += ordemMatriz);
		auxiliar1++;
	}

	return matrizChave;
}

function calcularChaveInversa(matrizChave) {
	//console.log("CALCULAR A INVERSA DA MATRIZ CHAVE");

	var matrizChaveInversa;
	var matrizAdjunta;
	var ordemMatriz;
	var determinanteMatriz;
	var mensagemErro = "";

	ordemMatriz = matrizChave.length;
	matrizChaveInversa = novaMatriz(ordemMatriz);
	determinanteMatriz = calcularDeterminante(matrizChave);

	if (determinanteMatriz != 0) {
		matrizAdjunta = calcularMatrizAdjunta(matrizChave);

		for (var i = 0; i < ordemMatriz; i++) {
			for (var j = 0; j < ordemMatriz; j++) {
				matrizChaveInversa[i][j] = (1 / determinanteMatriz) * matrizAdjunta[i][j];

				if ((1 / determinanteMatriz) * matrizAdjunta[i][j] % 1 != 0) {
					return "Os elementos da matriz não podem resultar em números fracionários.";
				}
			}
		}
		
	} else {
		return "O determinante da matriz chave não pode ser 0.";
	}

	return matrizChaveInversa;
}

function calcularMatrizMensagem(matrizMensagemCriptografada, matrizChaveInversa) {
	//console.log("CALCULAR A MATRIZ MENSAGEM");

	var matrizMensagemDescriptografada;
	var ordemMatriz;

	ordemMatriz = matrizMensagemCriptografada.length;
	matrizMensagemDescriptografada = novaMatriz(ordemMatriz);

	for (var i = 0; i < ordemMatriz; i++) {
		for (var j = 0; j < ordemMatriz; j++) {
			matrizMensagemDescriptografada[i][j] = 0;

			for (var aux = 0; aux < ordemMatriz; aux++) {
				matrizMensagemDescriptografada[i][j] += (matrizMensagemCriptografada[i][aux] * matrizChaveInversa[aux][j]);
			}
		}
	}

	return matrizMensagemDescriptografada;
}

function converterMatrizMensagem(matrizMensagemDescriptografada) {
	//console.log("CONVERTER A MATRIZ MENSAGEM DESCRIPTOGRAFADA NA MENSAGEM PARA EXIBIÇÃO");

	var matrizTabelaConversao;
	var ordemMatriz;
	var linhas;
	var colunas;
	var vetorMensagemConvertida;

	ordemMatriz = matrizMensagemDescriptografada.length;
	linhas = 2;
	colunas = 27;
	matrizTabelaConversao = new Array(linhas);
	vetorMensagemConvertida = "";
	matrizTabelaConversao = novaMatriz(ordemMatriz);

	for (var i = 0; i < linhas; i++) {
		for (var j = 0; j < colunas; j ++) {
			if (i == 0 && j == 0)
				matrizTabelaConversao[i][j] = "#";
			else if (i == 0 && j > 0)
				matrizTabelaConversao[i][j] = String.fromCharCode(65 + (j - 1));
			else if (i == 1)
				matrizTabelaConversao[i][j] = j;
		}
	}

	for (var i = 0; i < ordemMatriz; i++) {
		for (var j = 0; j < ordemMatriz; j++) {
			for (var aux = 0; aux < matrizTabelaConversao[0].length; aux++) {
				if (matrizMensagemDescriptografada[i][j] == aux) {
					vetorMensagemConvertida += matrizTabelaConversao[0][aux];
				}
			}
		}
	}

	return vetorMensagemConvertida;
}

function descriptografar(mensagemCriptografadaCaracteres, chaveCaracteres) {
	var validacao = validarMultiplicacaoMensagemCriptografadaChave(mensagemCriptografadaCaracteres, chaveCaracteres);

	if (validacao == true) {
		var matrizMensagemCriptografada = conversaoMensagemMatriz(mensagemCriptografadaCaracteres);
		var matrizChave = conversaoChaveMatriz(chaveCaracteres);
		var matrizChaveInversa = calcularChaveInversa(matrizChave);

		if (typeof matrizChaveInversa == 'string' || matrizChaveInversa instanceof String) {
			mostrarMensagem('alert alert-danger', matrizChaveInversa);
		} else {
			var matrizMensagemDescriptografada = calcularMatrizMensagem(matrizMensagemCriptografada, matrizChaveInversa);
			var vetorMensagemConvertida = converterMatrizMensagem(matrizMensagemDescriptografada);
			mostrarMensagem('alert alert-success', vetorMensagemConvertida);
		}
	} else {
		mostrarMensagem('alert alert-danger', 'A mensagem e a chave devem possuir o mesmo número de caracteres e devem estar separados por um espaço.');
	}

	console.log("Pode ocorrer a decodificação? " + validacao);
	console.log("Matriz mensagem criptografada: " + matrizMensagemCriptografada);
	console.log("Matriz chave: " + matrizChave);
	console.log("Matriz chave inversa: " + matrizChaveInversa);
	console.log("Matriz mensagem descriptografada: " + matrizMensagemDescriptografada);
	console.log("Mensagem convertida para caracteres: " + vetorMensagemConvertida);
}

function mostrarMensagem(tipo, mensagem) {
	var div = document.getElementById("div-resultado");

	document.getElementById('alert').className = tipo;
	document.getElementById('alert').style.display = "block";
	div.innerText = mensagem;
}