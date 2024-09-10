import animal_log from "./AnimalLog.js";

export default class Biome {
  constructor(number, enviroments, maximum_capacity, animals_inside) {
    this.number = number; // identificador do Bioma
    this.enviroments = enviroments; // ambientes existentes no bioma
    this.maximum_capacity = maximum_capacity; // capacidade máxima do bioma
    this.current_capacity = maximum_capacity;
    this.animals_inside = animals_inside; // animais inseridos no bioma

    this.carnivore_animals = false; // flag para existencia de animais carnívoros
    this.biome_launcher(); // atualiza o bioma
  }
  // inicializador do bioma
  biome_launcher() {
    if (this.animals_inside.length > 0) {
      this.animals_inside.forEach((animal) => {
        //atualiza a capacidade atual
        this.current_capacity -= animal.qtd * animal_log[animal.name].size;
        //atualiza para true caso haja algum animal carnívoro
        this.carnivore_animals =
          this.carnivore_animals || animal_log[animal.name].carnivore;
      });
    }
  }
  // retorna a capacidade máxima
  get_maximum_capacity() {
    return this.maximum_capacity;
  }
  // retorna a capacidade atual
  get_current_capacity() {
    return this.current_capacity;
  }
  // retorna se o bioma está vazio ou não
  is_empty() {
    return this.maximum_capacity == this.current_capacity;
  }
  // retorna quantidade de animais/espécies dentro do bioma
  get_species_inside_length() {
    return this.animals_inside.length;
  }
  // verifica se uma determinada espécie já está no bioma
  is_species_inside(specie) {
    for (let i = 0; i < this.animals_inside.length; i++) {
      if (this.animals_inside[i].name === specie) return true;
    }
    return false;
  }
  // retorna detalhes sobre a capacidade que restaria ao inserir o animal
  biome_details() {
    return `Recinto ${this.number} (espaço livre: ${this.current_capacity} total: ${this.maximum_capacity})`;
  }
  // retorna quantos biomas são compatíveis com a preferência da espécia
  animal_likes_biome(animal_biomes) {
    let count = 0;
    for (let i = 0; i < animal_biomes.length; i++) {
      for (let j = 0; j < this.enviroments.length; j++) {
        if (animal_biomes[i] === this.enviroments[j]) count++;
      }
    }
    return count;
  }
  // retorna true caso a adição da ( espécia * quantidade ) ocorreu com sucesso
  add_animals(required_capacity, name) {
    // caso não haja animais no bioma
    if (!this.animals_inside.length)
      this.carnivore_animals = animal_log[name].carnivore;

    // caso espécie não carnívora e bioma possui espécies carnívoras
    if (!animal_log[name].carnivore && this.carnivore_animals) return false;
    // caso espécie carnívora e bioma possui espécies não carnívoras
    if (animal_log[name].carnivore && !this.carnivore_animals) return false;
    // caso hajam espécies ao adicionar a nova espécie ao bioma (espaço_necessário + 1)
    if (!this.is_species_inside(name) && this.animals_inside.length >= 1) {
      let required_capacity_plus_one = required_capacity + 1;
      if (this.current_capacity - required_capacity_plus_one >= 0) {
        this.current_capacity -= required_capacity + 1;
        return true;
      }
    }
    // caso a espécie já esteja no bioma ou o bioma está vazio
    else if (this.current_capacity - required_capacity >= 0) {
      this.current_capacity -= required_capacity;
      return true;
    }
    return false;
  }
}
