/* index.js */
const express = require('express');
const app = express();

const drinks = [
  { id: 1, name: 'Refrigerante Lata', price: 5.0 },
  { id: 2, name: 'Refrigerante 600ml', price: 8.0 },
  { id: 3, name: 'Suco 300ml', price: 4.0 },
  { id: 4, name: 'Suco', price: 10.0 },
  { id: 5, name: 'Cerveja Lata', price: 4.5 },
  { id: 6, name: 'Agua Mineral 500 ml', price: 5.0 },
];

const sortedDrinks = drinks.sort((a,b) => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
  });

app.get('/drinks', (req, res) => {
  return res.send(sortedDrinks);
})

//&& d.price < parseInt(maxPrice)

app.get('/drinks/search', function(req, res) {
  const { name, minPrice, maxPrice } = req.query;
  const filteredDrinks = drinks.filter((d) => d.name.includes(name) && (d.price>=minPrice && d.price<= maxPrice));
  console.log(filteredDrinks);
  res.status(200).json(filteredDrinks);
});

app.get('/drinks/:id', function (req, res) {
  const { id } = req.params;
  const drink = drinks.find((d)=> d.id === parseInt(id));
  if (!drink) return res.status(404).json({ message: 'Drink not found!' });

  res.status(200).json(drink);
});

app.listen(3001, () => {
  console.log('Aplicação ouvindo na porta 3001');
});