import React from "react";

import Button from "./Button";
import {
  Product as StyledProduct,
  ProductDetails,
  Box,
  Price,
  ProductImage,
  Text,
} from "../styles";
import { CartContext } from "../context/ShoppingCart";

export default function Product({ currency, product, onAddToCart }) {
  const { items } = React.useContext(CartContext);
  const isInCart = items.findIndex((x) => x.id === String(product.id)) > -1;

  return (
    <StyledProduct borderColor="border">
      <Box p={3} backgroundColor="background">
        <ProductImage src={product.image} alt={product.title} />
      </Box>

      <ProductDetails p={[2, 3, 4]} pt={2}>
        <div>
          <Text as="h3" lineClamp="3" title={product.title}>
            {product.title}
          </Text>
          <Price>
            {currency}
            {Number(product.price).toFixed(2)}
          </Price>
        </div>

        <Button
          mt="auto"
          cursor={isInCart ? "none" : "pointer"}
          disabled={isInCart}
          backgroundColor={isInCart ? "success" : "black"}
          onClick={() =>
            onAddToCart({
              id: String(product.id),
              image_url: product.image,
              name: product.title,
              description: product.description,
              quantity: 1,
              price: product.price,
            })
          }
        >
          {isInCart ? "Added ✓" : "Add to cart"}
        </Button>
      </ProductDetails>
    </StyledProduct>
  );
}
