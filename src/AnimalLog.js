const animal_log = {
  LEAO: { size: 3, carnivore: true, biome: ["SAVANA"] },
  LEOPARDO: { size: 2, carnivore: true, biome: ["SAVANA"] },
  CROCODILO: { size: 3, carnivore: true, biome: ["RIO"] },
  MACACO: { size: 1, carnivore: false, biome: ["SAVANA", "FLORESTA"] },
  GAZELA: { size: 2, carnivore: false, biome: ["SAVANA"] },
  HIPOPOTAMO: { size: 4, carnivore: false, biome: ["SAVANA", "RIO"] },
};

export function animals_available_biomes(biomes, animal, quantidade) {
  let possibilities = [];
  let resultado = {};
  let required_capacity = calculate_required_capacity(animal, quantidade);

  // biomas possíveis ao restante dos animais (LEAO, LEOPARDO, CROCODILO, GAZELA)
  possibilities = biomes.filter(
    (biome) =>
      biome.animal_likes_biome(animal_log[animal].biome) &&
      // adiciona espécie ao bioma, se possível
      biome.add_animals(required_capacity, animal)
  );

  resultado = biomes_validation_obj(possibilities);
  return resultado;
}

export function macaco_available_biomes(biomes, animal, quantidade) {
  let possibilities = [];
  let resultado = {};
  let required_capacity = calculate_required_capacity(animal, quantidade);

  // biomas possíveis para macacos
  possibilities = biomes.filter(
    (biome) =>
      // macaco gosta do bioma
      biome.animal_likes_biome(animal_log[animal].biome) &&
      // o bioma não está vazio || macacos juntos entram no bioma
      (biome.get_current_capacity() < biome.get_maximum_capacity() ||
        quantidade > 1) &&
      // adiciona espécie ao bioma, se possível
      biome.add_animals(required_capacity, animal)
  );

  resultado = biomes_validation_obj(possibilities);
  return resultado;
}

export function hipopotamo_available_biomes(biomes, animal, quantidade) {
  let possibilities_1 = [];
  let possibilities_2 = [];
  let possibilities = [];
  let resultado = {};
  let required_capacity = calculate_required_capacity(animal, quantidade);

  // biomas possíveis para hipopótamos
  possibilities_1 = biomes.filter(
    (biome) =>
      biome.animal_likes_biome(animal_log[animal].biome) &&
      // caso bioma esteja vazio
      (biome.is_empty() ||
        // ou tenha apenas hipopótamos
        (biome.is_species_inside("HIPOPOTAMO") &&
          biome.get_species_inside_length() == 1)) &&
      // adiciona espécie ao bioma, se possível
      biome.add_animals(required_capacity, animal)
  );

  possibilities_2 = biomes.filter(
    (biome) =>
      (biome.animal_likes_biome(animal_log[animal].biome) ==
        animal_log[animal].biome.length) &&
      biome.add_animals(required_capacity, animal)
  );

  possibilities = [...possibilities_1, ...possibilities_2];

  resultado = biomes_validation_obj(possibilities);
  return resultado;
}

function biomes_validation_obj(possibilities) {
  let resultado = {};
  if (available_biomes(possibilities)) {
    
    possibilities.sort(function(a, b) {
      if (a.get_number() > b.get_number())
        return 1
      return -1
    })

    resultado.recintosViaveis = push_to_array(possibilities);
  }
  else {
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

export function calculate_required_capacity(animal, quantidade) {
  return animal_log[animal].size * quantidade;
}

export function quantity_validation(quantidade) {
  if (quantidade <= 0) return true;
  return false;
}

export default animal_log;
