import React from "react";
import type { Product } from "../../app/domain/product";
import AddCar from "../Button/AddCar";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
    product: Product;
    onAdd: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd }) => {
    return (
        <div className={styles.productCard}>
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <h5>{product.description}</h5>
            <h5>Categoría: {product.category}</h5>
            <h5>Precio: S/{product.price}</h5>
            <AddCar product={product} onAdd={onAdd} />
        </div >
    );
};

export default ProductCard;
