// Agora você vai fazer alguns exercícios de fixação.
// Complete a função customerInfo() para que seu retorno seja similar a "Olá Ana Silveira, entrega para: Rafael Andrade, Telefone: 11-98763-1416, R. Rua das Flores, Nº: 389, AP: 701".
// Note que o parâmetro da função já está sendo passado na chamada da função.
// Complete a função orderModifier() para que seu retorno seja similar a "Olá Luiz Silva, o total do seu pedido de marguerita, pepperoni e Coca-Cola Zero é R$ 50,00."
// Modifique o nome da pessoa compradora.
// Modifique o valor total da compra para R$ 50,00.

const order = {
  name: 'Rafael Andrade',
  phoneNumber: '11-98763-1416',
  address: {
    street: 'Rua das Flores',
    number: '389',
    apartment: '701',
  },
  order: {
    pizza: {
      marguerita: {
        amount: 1,
        price: 25,
      },
      pepperoni: {
        amount: 1,
        price: 20,
      }
    },
    drinks: {
      coke: {
        type: 'Coca-Cola Zero',
        price: 10,
        amount: 1,
      }
    },
    delivery: {
      deliveryPerson: 'Ana Silveira',
      price: 5,
    }
  },
  payment: {
    total: 60,
  },
};

const customerInfo = (order) => {
  // Adicione abaixo as informações necessárias.
console.log(`Olá ${order.order.delivery.deliveryPerson}, entrega para ${order.name}, Telefone: ${order.phoneNumber}, ${order.address.street} n: ${order.address.number}, AP: ${order.address.apartment}` )
  // "Olá Ana Silveira, entrega para: Rafael Andrade, Telefone: 11-98763-1416, R. Rua das Flores, Nº: 389, AP: 701".
}

customerInfo(order);

const orderModifier = (order) => {
  // Adicione abaixo as informações necessárias.
   order.name = 'Luiz Silva';
  const pizzas = Object.keys(order.order.pizza);
  const bebida = Object.values(order.order.drinks.coke);
  order.payment.total = 50;
  const valor = Object.values(order.payment);

console.log(`Olá ${order.name}, o total do seu pedido de ${pizzas[0]}, ${pizzas[1]} e ${bebida[0]} é de R$ ${valor} `);

// "Olá Luiz Silva, o total do seu pedido de marguerita, pepperoni e Coca-Cola Zero é R$ 50,00."
// Modifique o nome da pessoa compradora.
// Modifique o valor total da compra para R$ 50,00.
}

orderModifier(order);