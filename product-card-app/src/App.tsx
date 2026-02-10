import './App.css'
import {ProductCart} from "./Components/ProductCard.tsx";
import {Counter} from "./Components/Counter";
import reactImage from './assets/react.svg'
import vite from './assets/vite.svg'


function App() {

  return (
   <div className="app-container">
       <h1>My Store </h1>
       <div className="product-grid">
           <ProductCart
           productName="Gaming Laptop"
           price={1200}
           description="High performance machine"
           image={reactImage}
           />
           <ProductCart
               productName="Mechanical Keyboard"
               price={1200}
               image={vite}
               />
       </div>
       <hr />

       <Counter />
   </div>
  );
}

export default App
