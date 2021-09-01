import './App.css';
import Image from'./Image.js'
import staringCat from './staringCat.jpg'

function App() {
  return (
    <div>
      <Image source={staringCat} alternativeText="Cute cat staring" />
    </div>
  );
}

export default App;

// a imagem ficando no mesmo diretório depois de importado pode ser chamada só pelo nome.
// se atentar pq é case sensitive. 