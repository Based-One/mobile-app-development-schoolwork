import { useState } from 'react';
import '../index.css'
interface ProductCardProps {
    productName: string;
    price: number;
    description?: string;
    image?: string;
}
export const ProductCart = ({productName, price, description, image }: ProductCardProps)=> {
    const [isLiked, setIsLiked] = useState<boolean>(false);


    const toggleLke = () =>{
        setIsLiked(!isLiked);
    };
return (
    <div className="card">
        <img src={image} alt={productName} className="product-image" />
        <h3>{productName}</h3>
        <div className= "card-body">
            <p className="price">${price}</p>
            {/* If description exists show it, if not show nothing*/}
            {description && <p className ="description">{description}</p>}
        </div>

        <div className="card-footer">
            <button className={`like-button ${isLiked ? 'liked' :''}`} onClick={toggleLke}>
                {isLiked ? '♥ Liked':'♡ Like'}
            </button>
        </div>

    </div>


);

}
