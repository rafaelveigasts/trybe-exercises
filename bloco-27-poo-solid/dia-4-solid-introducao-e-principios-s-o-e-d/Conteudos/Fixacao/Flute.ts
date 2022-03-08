class Flute {
  constructor(public name: string) { }
  public play(): void {
    console.log(`${this.name} está emitindo melodias`);
  }
}

class Musician {
  flute: Flute

  constructor(public name: string) {
    this.flute = new Flute('minha flauta');
  }

  play() {
    this.flute.play();
    console.log(
      `"${this.name}" é quem está comandando a emissão das melodias`
    );
  }
}

const musician = new Musician('Márcia');
musician.play();