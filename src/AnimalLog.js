const animal_log = {
  LEAO: { size: 3, carnivore: true, biome: ["SAVANA"] },
  LEOPARDO: { size: 2, carnivore: true, biome: ["SAVANA"] },
  CROCODILO: { size: 3, carnivore: true, biome: ["RIO"] },
  MACACO: { size: 1, carnivore: false, biome: ["SAVANA", "FLORESTA"] },
  GAZELA: { size: 2, carnivore: false, biome: ["SAVANA"] },
  HIPOPOTAMO: { size: 4, carnivore: false, biome: ["SAVANA", "RIO"] },
};
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

export default animal_log;
