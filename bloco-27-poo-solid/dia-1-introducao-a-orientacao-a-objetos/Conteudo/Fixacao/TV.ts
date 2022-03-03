/* Crie uma classe chamada Tv, com os atributos:
- brand : marca da TV;
size : tamanho em polegadas;
resolution : resolução da tela;
connections : conexões disponíveis(HDMI, Ethernet, etc.);
connectedTo : conexão atual Este atributo não precisa ser inicializado no construtor .
Dentro da classe Tv, crie o método turnOn , que imprimirá os atributos inicializados no construtor.
Instancie um objeto a partir da classe Tv, chame o método turnOn para imprimir seus atributos. */

class TV {
  private _brand: string;
  private _size: number;
  private _resolution: string;
  private _connections: string[];
  private _connectedTo: string;

  constructor(_brand: string, _size: number, _resolution: string, _connections: string[], _connectedTo: string) {
    this._brand = _brand;
    this._size = _size;
    this._resolution = _resolution;
    this._connections = _connections;
    this._connectedTo = _connectedTo;
  }

  turnOn():void {
    console.log(`${this._brand} ${this._size} ${this._resolution} ${this._connections} ${this._connectedTo}`);
  }

  get connectedTo(): string {
    return this._connectedTo;
  }

  set connectedTo(value: string) {
    if (this._connections.includes(value)) {
      this._connectedTo = value;
      console.log(this._connectedTo);
    } else {
      console.log('Não existe conexão disponível');
    }
  }

}

const tv = new TV('LG', 55, '4k', ['HDMI', 'Ethernet', 'Wi-Fi'], 'Wi-Fi');
tv.turnOn();

tv.connectedTo = 'Wi-Fi';