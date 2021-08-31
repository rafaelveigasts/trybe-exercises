const tarefas = [
  "treinar",
  "limpar a casa",
  "tomar café",
  "monitoria",
  "estudar",
];

const Task = (value) => {
  return <li>{value}</li>;
};

function App() {
  return (
    <div>
      {Task("Limpar a casa")}
      {tarefas.map((item) => Task(item))}
    </div>
  );
}

export default App;
