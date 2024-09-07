import Biome from "./Biome.js";
import animal_log from "./AnimalLog.js";
import { push_to_array, available_biomes } from "./AnimalLog.js";

class RecintosZoo {
  analisaRecintos(animal, quantidade) {
    let resultado = {};

    if (quantidade <= 0) {
      resultado.erro = "Quantidade inválida";
      return resultado;
    }

    //instancia dos biomas, de acordo com o problema proposto
    let biomes = [];

    biomes.push(new Biome(1, ["SAVANA"], 10, [{ name: "MACACO", qtd: 3 }]));
    biomes.push(new Biome(2, ["FLORESTA"], 5, []));
    biomes.push(
      new Biome(3, ["SAVANA", "RIO"], 7, [{ name: "GAZELA", qtd: 1 }])
    );
    biomes.push(new Biome(4, ["RIO"], 8, []));
    biomes.push(new Biome(5, ["SAVANA"], 9, [{ name: "LEAO", qtd: 1 }]));

    let required_capacity; // capacidade necessária no bioma para alocar uma espécie
    let possibilities = []; // biomas possíveis

    switch (animal) {
      case "HIPOPOTAMO":
        required_capacity = animal_log[animal].size * quantidade;
        // filtra os biomas de acordo com as preferências
        // p1 ( Hipopótamo(s) só tolera(m) outras espécies estando num recinto com savana e rio )
        possibilities = biomes.filter(
          (biome) =>
            biome.animal_likes_biome(animal_log[animal].biome) ===
              animal_log[animal].biome.length &&
            biome.add_animals(required_capacity, animal)
        );
        // caso hajam biomas disponiveis para a espécie, adiciona na lista
        if (available_biomes(possibilities)) {
          resultado.recintosViaveis = push_to_array(possibilities);
        }
        else {
          resultado.erro = "Não há recinto viável";
        }
        break;

      case "MACACO":
        required_capacity = animal_log[animal].size * quantidade;
        // filtra os biomas de acordo com as preferências
        // p1 ( Um macaco não se sente confortável sem outro animal no recinto ) -- deve haver alguma espécie no bioma
        // p2 ( seja da mesma ou outra espécie )
        possibilities = biomes.filter(
          (biome) =>
            biome.animal_likes_biome(animal_log[animal].biome) &&
            // o bioma não está em sua capacidade máxima
            // ou o macaco está acompanhado por outro macaco (quantidade > 1)
            (biome.get_current_capacity() < biome.get_maximum_capacity() ||
              quantidade > 1) &&
            biome.add_animals(required_capacity, animal)
        );

        if (available_biomes(possibilities)) {
          resultado.recintosViaveis = push_to_array(possibilities);
        }
        else {
          resultado.erro = "Não há recinto viável";
        }
        break;

      case "LEAO":
      case "LEOPARDO":
      case "CROCODILO":
      case "GAZELA":
        required_capacity = animal_log[animal].size * quantidade;
        possibilities = biomes.filter(
          (biome) =>
            biome.animal_likes_biome(animal_log[animal].biome) &&
            biome.add_animals(required_capacity, animal)
        );

        if (available_biomes(possibilities)) {
          resultado.recintosViaveis = push_to_array(possibilities);
        }
        else {
          resultado.erro = "Não há recinto viável";
        }
        break;

      default:
        resultado.erro = "Animal inválido";
        break;
    }
    return resultado;
  }
}

export { RecintosZoo as RecintosZoo };
