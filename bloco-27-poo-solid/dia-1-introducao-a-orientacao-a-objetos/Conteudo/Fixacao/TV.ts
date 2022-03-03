/* Crie uma classe chamada Tv, com os atributos:
- brand : marca da TV;
size : tamanho em polegadas;
resolution : resolução da tela;
connections : conexões disponíveis(HDMI, Ethernet, etc.);
connectedTo : conexão atual Este atributo não precisa ser inicializado no construtor .
Dentro da classe Tv, crie o método turnOn , que imprimirá os atributos inicializados no construtor.
Instancie um objeto a partir da classe Tv, chame o método turnOn para imprimir seus atributos. */

class TV {
  brand: string;
  size: number;
  resolution: string;
  connections: string[];
  connectedTo: string;

  constructor(brand: string, size: number, resolution: string, connections: string[], connectedTo: string) {
    this.brand = brand;
    this.size = size;
    this.resolution = resolution;
    this.connections = connections;
    this.connectedTo = connectedTo;
  }

  turnOn():void {
    console.log(`${this.brand} ${this.size} ${this.resolution} ${this.connections} ${this.connectedTo}`);
  }
}

const tv = new TV('LG', 55, '4k', ['HDMI', 'Ethernet'], 'Wi-Fi');
tv.turnOn();
