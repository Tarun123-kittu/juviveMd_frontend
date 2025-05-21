import AppRouter from "./components/AppRouter/AppRouter";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

function App() {
  return (
    <AppRouter />
  );
}

export default App;

