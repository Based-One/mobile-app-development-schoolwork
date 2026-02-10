import { useState } from 'react';
export const Counter = () =>{

    const [count,setCount] = useState<number>(0);
    const handleIncrement =()=>{
        setCount(count + 1);
    };
    const handleDecrement =()=>{
        if(count > 0){
            setCount(count - 1);
        }
    };
    const handleReset = ()=> {
        setCount(0);

    }

    return (
        <div className="counter-container">
            <h2> Counter</h2>
            <div className="display-number">{count}</div>


            <div className="button-row">
                <button onClick={handleDecrement} disabled = {count === 0}>-</button>
                <button onClick={handleReset}>Reset</button>
                <button onClick={handleIncrement}>+</button>
            </div>
        </div>




    );

}