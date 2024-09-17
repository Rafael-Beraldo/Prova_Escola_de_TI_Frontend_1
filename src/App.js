import './App.css';
import { store } from "./actions/store";
import { Provider } from "react-redux";
import Carro from './components/Carro';
import { Container } from "@material-ui/core"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
        <Container maxWidth="lg">
          <Carro />
        </Container>
    </Provider>
  );
}

export default App;
