import { calculate_required_capacity, biomes_validation_obj } from "./Tools.js";
import animal_log from "./AnimalLog";

export default class Animal {
  static animal_likes_biome(animal_biomes, biome) {
    let count = 0;
    let biomes_inside = biome.get_biomes_inside();
    for (let i = 0; i < animal_biomes.length; i++) {
      for (let j = 0; j < biomes_inside.length; j++) {
        if (animal_biomes[i] === biomes_inside[j]) count++;
      }
    }
    return count;
  }

  static animals_available_biomes(biomes, animal, quantidade) {
    let possibilities = [];
    let resultado = {};
    let required_capacity = calculate_required_capacity(animal, quantidade);

    // biomas possíveis ao restante dos animais (LEAO, LEOPARDO, CROCODILO, GAZELA)
    possibilities = biomes.filter(
      (biome) =>
        Animal.animal_likes_biome(animal_log[animal].biome, biome) &&
        // adiciona espécie ao bioma, se possível
        biome.add_animals(required_capacity, animal)
    );

    resultado = biomes_validation_obj(possibilities);
    return resultado;
  }

  static macaco_available_biomes(biomes, animal, quantidade) {
    let possibilities = [];
    let resultado = {};
    let required_capacity = calculate_required_capacity(animal, quantidade);

    // biomas possíveis para macacos
    possibilities = biomes.filter(
      (biome) =>
        // macaco gosta do bioma
        Animal.animal_likes_biome(animal_log[animal].biome, biome) &&
        // o bioma não está vazio || macacos juntos entram no bioma
        (biome.get_current_capacity() < biome.get_maximum_capacity() ||
          quantidade > 1) &&
        // adiciona espécie ao bioma, se possível
        biome.add_animals(required_capacity, animal)
    );

    resultado = biomes_validation_obj(possibilities);
    return resultado;
  }

  static hipopotamo_available_biomes(biomes, animal, quantidade) {
    let possibilities_1 = [];
    let possibilities_2 = [];
    let possibilities = [];
    let resultado = {};
    let required_capacity = calculate_required_capacity(animal, quantidade);

    // biomas possíveis para hipopótamos
    possibilities_1 = biomes.filter(
      (biome) =>
        Animal.animal_likes_biome(animal_log[animal].biome, biome) &&
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
        // caso bioma "SAVANA E RIO", hipopótamo tolera outras espécies
        Animal.animal_likes_biome(animal_log[animal].biome, biome) ==
          animal_log[animal].biome.length &&
        // adiciona espécie ao bioma, se possível
        biome.add_animals(required_capacity, animal)
    );

    possibilities = [...possibilities_1, ...possibilities_2];

    resultado = biomes_validation_obj(possibilities);
    return resultado;
  }
}
