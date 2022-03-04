/* Exercício 3: Vamos mudar um pouco nosso contexto para um sistema de vendas de uma lanchonete. Crie uma classe que represente uma pessoa cliente da lanchonete, uma classe que represente um pedido e uma que represente um item do pedido.
A pessoa cliente deverá conter o nome;
O item do pedido deve conter o nome do pedido (ex. "Batatas fritas"; "Açaí") e o preço;
O pedido deve conter o cliente, os itens consumidos, a forma de pagamento (ex: "cartão", "dinheiro") e o percentual em decimal de desconto para o pedido (ex: 0.1 para 10%, 0.3 para 30%), o pedido pode ou não possuir desconto.
 */

class Person {
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    if (this.name.length <3 ) {
      throw new Error("Nome deve ter mais de 3 caracteres");
    }
    this._name = value;
  }
}


class OrderItem{
  private _name: string;
  private _price: number;

  constructor(name: string, price: number) {
    this._name = name;
    this._price = price;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    if (this.name.length <3 ) {
      throw new Error("Nome deve ter mais de 3 caracteres");
    }
    this._name = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    if(this._price < 0){
      throw new Error("Preço não pode ser negativo");
    }
    this._price = value;
  }
}

class Order {
  private _client: Person;
  private _items: OrderItem[]=[];
  private _paymentMethod: string;
  private _disscount: number = 0;

  constructor(client: Person, Order: OrderItem[], paymentMethod: string, disscount: number) {
    this._client = client;
    this._items = Order;
    this._paymentMethod = paymentMethod;
    this._disscount = disscount;
  }

  get client(): Person {
    return this._client;
  }

  set client(value: Person) {
    this._client = value;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  set items(value: OrderItem[]) {
    if( this.items.length === 0){
      throw new Error("Não é permitido nenhum item");
    }
    this._items = value;
  }

  get paymentMethod(): string {
    return this._paymentMethod;
  }

  set paymentMethod(value: string) {
    this._paymentMethod = value;
  }

  get disscount(): number {
    return this._disscount;
  }

  set disscount(value: number) {
    if(this._disscount < 0){
      throw new Error("Desconto não pode ser negativo");
    }
    this._disscount = value;
  }

  get total(): number {
    return this.items.reduce((total, item) => {const pay = total + item.price;
    return pay }, 0);
    }

  get discount(): number {
    return this.total * this.disscount;
  }

  get totalWithDiscount(): number {
    return this.total - this.discount;
  }
}

const client = new Person("João");

const item1 = new OrderItem("Batatas fritas", 10);
const suco = new OrderItem("Suco", 5);
const acai = new OrderItem("Açaí", 10);

const order = new Order(client, [item1, suco, acai], "cartão", 0.1);

console.log (order);
console.log (order.total);
console.log (order.discount);
console.log (order.totalWithDiscount);
