import Biome from "./Biome.js";
import Animal from "./Animal.js";
import { is_number, quantity_validation } from "./Tools.js";

class RecintosZoo {
  constructor() {
    //instancia dos biomas, de acordo com o problema proposto
    this.biomes = [
      new Biome(1, ["SAVANA"], 10, [{ name: "MACACO", qtd: 3 }]),
      new Biome(2, ["FLORESTA"], 5, []),
      new Biome(3, ["SAVANA", "RIO"], 7, [{ name: "GAZELA", qtd: 1 }]),
      new Biome(4, ["RIO"], 8, []),
      new Biome(5, ["SAVANA"], 9, [{ name: "LEAO", qtd: 1 }]),
    ];
  }
  analisaRecintos(animal, quantidade) {
    let resultado = {};

    // valida o valor da variável quantidade se é inteiro, natural e maior que zero
    if (!is_number(quantidade) || quantity_validation(quantidade)) {
      resultado.erro = "Quantidade inválida";
      return resultado;
    }

    switch (animal) {
      case "HIPOPOTAMO":
        // retorna detalhes sobre os biomas disponíveis hipopótamos
        resultado = Animal.hipopotamo_available_biomes(
          this.biomes,
          animal,
          quantidade
        );

        break;

      case "MACACO":
        // retorna detalhes sobre os biomas disponíveis para macacos
        resultado = Animal.macaco_available_biomes(
          this.biomes,
          animal,
          quantidade
        );

        break;

      case "LEAO":
      case "LEOPARDO":
      case "CROCODILO":
      case "GAZELA":
        // retorna detalhes sobre os biomas disponíveis para outros animais
        resultado = Animal.animals_available_biomes(
          this.biomes,
          animal,
          quantidade
        );

        break;

      default:
        resultado.erro = "Animal inválido";

        break;
    }
    return resultado;
  }
}

export { RecintosZoo as RecintosZoo };
