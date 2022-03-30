import './App.css';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from "./components/checkoutForm";
/*https://github.com/atharvadeosthale/stripe-react-3d-secure*/
const stripePromise = loadStripe('pk_test_51KWED5IZ9zy7k2DvendNr4ypw4ALxcCs0Gg3PJeM0vMrQiSuJJJZlkQGo0HBjh7tfxbr5YMm2eMPFkkV6PRHASwC00wKb6SH43');
function App() {

    // const clientSecret = getClientSecret();
    // const options = {
    //     // passing the client secret obtained from the server
    //     clientSecret: clientSecret,
    // };

  return (
    <div className="App">
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    </div>
  );
}

export default App;
