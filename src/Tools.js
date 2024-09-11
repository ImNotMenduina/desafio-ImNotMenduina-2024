import animal_log from "./AnimalLog";

// retorna os detalhes do bioma caso existam
export function biomes_validation_obj(possibilities) {
  let resultado = {};
  if (available_biomes(possibilities)) {
    // garante ordenação dos biomas
    possibilities.sort(function (a, b) {
      if (a.get_number() > b.get_number()) return 1;
      return -1;
    });

    // push no array dos detalhes do bioma
    resultado.recintosViaveis = push_to_array(possibilities);
  } else {
    resultado.erro = "Não há recinto viável";
  }
  return resultado;
}

// retorna o detalhes de cada bioma caso a espécie seja inserida
export function push_to_array(possibilities) {
  let recintos = [];
  possibilities.forEach((bioma) => {
    recintos.push(bioma.biome_details());
  });
  return recintos;
}

// retorna true caso hajam biomas disponíveis para a espécie
export function available_biomes(recintosViaveis) {
  return recintosViaveis.length > 0;
}

// calculo da capacidade necessária para alocar o animal/grupo
export function calculate_required_capacity(animal, quantidade) {
  return animal_log[animal].size * quantidade;
}

// validação da quantidade informada
export function quantity_validation(quantidade) {
  if (quantidade <= 0) return true;
  return false;
}

// verifica se o valor é um número inteiro
export function is_number(quantidade) {
    return Number.isInteger(quantidade);
}
