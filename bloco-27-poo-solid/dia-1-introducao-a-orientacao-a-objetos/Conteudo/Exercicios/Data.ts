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

  getMonthName(): string {
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    return months[this.Month - 1];
  }

  isLeapYear(): boolean {
    return (
      (this.Year % 4 === 0 && this.Year % 100 !== 0) || this.Year % 400 === 0
    );
  }

  compare(date: Data): number {
    const currentDateString = `${this.day}/${this._month}/${this._year}`;

    const dateString = `${date.day}/${date._month}/${date._year}`;

    if (new Date(currentDateString) > new Date(dateString)) {
      return 1;
    }
    if (new Date(currentDateString) < new Date(dateString)) {
      return 0;
    }
  }

  format(formatting: string): string {
    const conditions: boolean[] = [
      !formatting.match(/a{2,4}/g), // verifica se possui o ano na formatação
      !formatting.match(/m{2}/g) && !formatting.match(/M{1}/g), // verifica se tem o mês na formatação
      !formatting.match(/d{2}/g), // verifica se tem o dia na formatação
    ];

    if (conditions.every((cond) => cond)) {
      throw new Error(`O formato passado é inválido: ${formatting}`);
    }

    const day = this.day > 9 ? this.day.toString() : `0${this.day.toString()}`;
    const month =
      this._month > 9 ? this._month.toString() : `0${this._month.toString()}`;
    const year = this._year.toString();

    const dateFormatting = formatting
      .replace("dd", day)
      .replace("mm", month)
      .replace("M", this.getMonthName())
      .replace("aaaa", year)
      .replace("aa", year.substr(-2));

    return dateFormatting;
  }

  private validateDate(day: number, month: number, year: number): boolean {
    const dateStr = `${year}-${month}-${day}`;

    if (new Date(dateStr).getDate() !== day) return false;
    return true;
  }
}
const testDate = new Data(29, 1, 1989);

console.log(testDate);
console.log('Dia: ', testDate.day);
console.log('Mês: ', testDate.Month);
console.log('Mês por extenso: ', testDate.getMonthName());
console.log('Ano: ', testDate.Year);
console.log('É ano bissexto: ', testDate.isLeapYear() ? 'Sim' : 'Não');
console.log(testDate.format('dd/mm/aaaa'));
console.log(testDate.format('dd-mm-aaaa'));
console.log(testDate.format('aaaa/mm/dd'));
console.log(testDate.format('aaaa-mm-dd'));
console.log(testDate.format('dd de M de aa'));
console.log(testDate.format('dd, M de aaaa'));

const otherDate = new Data(30, 1, 2021);

const compared = testDate.compare(otherDate);

const compareStates = ['anterior', 'igual', 'posterior'];

console.log(`A primeira data é ${compareStates[compared + 1]} a segunda.`);

// data inválida
const invalidDate = new Data(31, 2, 2021);

console.log('Teste data inválida: ', invalidDate)

// formato inválido
console.log(invalidDate.format('a m d'));