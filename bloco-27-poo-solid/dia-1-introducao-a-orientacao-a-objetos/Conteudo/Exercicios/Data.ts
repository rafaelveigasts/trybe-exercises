class Data {
  private _day: number;
  private _month: number;
  private _year: number;

  constructor(day: number, month: number, year: number) {

    const dateString = `${day}/${month}/${year}`;

     // verifica se a data é válida
  //    if (new Date(dateString).getDate() !== day) {
  //     day = 1;
  //     month = 1;
  //     year = 1900;
  // }

    this._day = day;
    this._month = month;
    this._year = year;
  }

  get day() {
    return this.day;
  }
  set day(value: number) {
    if (value < 1 || value > 31) {
      throw new Error("Dia inválido");
    }
    this.day = value;
  }

  get Month() {
    return this.Month;
  }

  set Month(value: number) {
    if (value < 1 || value > 12) {
      throw new Error("Mês inválido");
    }
    this.Month = value;
  }

  get Year() {
    return this.Year;
  }

  set Year(value: number) {
    if (value < 1900) {
      throw new Error("Ano inválido");
    }
    this.Year = value;
  }
}

const testDate = new Data(4, 3, 2022);
console.log(testDate);