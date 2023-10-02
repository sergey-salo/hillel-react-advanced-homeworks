import './App.css';
import { Input } from './components';

function App() {
  const handleOnChange = (event) => console.log(event.target.value);

  return (
    <div className="App">
      <Input
        labelDesription="Name (3 to 24 characters): "
        placeholder="Name"
        minLength="3" maxLength="24" size="35"
        onChange={handleOnChange}
      />
    </div>
  );
}

export default App;
