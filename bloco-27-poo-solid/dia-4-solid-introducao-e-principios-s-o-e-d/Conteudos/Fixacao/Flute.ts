class Flute {
  constructor(public name: string) { }
  public play(): void {
    console.log(`${this.name} está emitindo melodias`);
  }
}

class Musician {
  // Agora a flauta é recebida como parâmetro
  constructor(public name: string, public flute: Flute) { }

  play() {
    this.flute.play();
    console.log(
      `"${this.name}" é quem está comandando a emissão das melodias`
    );
  }
}

const flute = new Flute('Minha flauta');
const musician = new Musician('Márcia', flute);
musician.play();