/* index.js */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());


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

app.post('/drinks', function (req, res) {
  const {id, name, price, waitTime } = req.body;
  drinks.push({ id, name, price, waitTime });
res.status(201).json({message: 'Drink created successfully'})});

/* fetch('http://localhost:3001/drinks', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    id: 7,
    name: 'Caipirinha',
    price: 50,
  }),
}) */

app.get('/validateToken', function (req,res){
  const token = req.headers.authorization;
  if (token.lenght !==16) return res.status(401).json({message: 'Token inválido'});
  res.status(200).json({message: 'Token válido'});
});

app.put('/drinks/:id', function(req,res){
  const {id} = req.params;
  const {name, price} = req.body;
  const drinkIndex = drinks.findIndex((d) => d.id === parseInt(id));

  if (drinkIndex === -1) return res.status(404).json({message: 'Drink not found!'});
  drinks[drinkIndex] = {...drinks[drinkIndex], name, price};  
  res.status(204).end();
});

app.delete('/drinks/:id', function(req,res) {
  const {id} = req.params;
  const drinksIndex = drinks.findIndex((d) => d.id === parseInt(id));
  if (drinksIndex === -1) return res.status(404).json({message: 'Drink not found!'});
  drinks.splice(drinksIndex, 1);
  res.status(204).end();
})

app.all('*', function(req, res) {
  return res.status(404).json({ message: `Rota '${req.path}' não existe!`});
});

