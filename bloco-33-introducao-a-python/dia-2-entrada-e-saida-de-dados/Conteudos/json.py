import yaml

# Leitura de todos os pokemons
with open("pokemons.yaml") as file:
    pokemons = yaml.load(file)["results"]

# Separamos somente os do tipo grama
grass_type_pokemons = [
    pokemon for pokemon in pokemons if "Grass" in pokemon["type"]
]

# Abre o arquivo para escrevermos apenas o pokemons do tipo grama
with open("grass_pokemons.yaml", "w") as file:
    yaml_to_write = yaml.dumps(
        grass_type_pokemons
    )  # conversão de Python para o formato yaml (str)
    file.write(yaml_to_write)