import React from "react";
import { calculateTotal } from "../utils";
import { Cart, CartItem as CartItemType } from "../types";
import { CartContext } from "../context/ShoppingCart";
import CartItem from "../components/CartItem";
import { Box, Button, Flex, Text } from "../styles";

function Padding({ children }) {
  return <Box p={4}>{children}</Box>;
}

export default function ShoppingCart({ currency = "€" }: Cart) {
  const { items, updateCartItem, removeItem } = React.useContext(CartContext);

  const { discount, total } = calculateTotal(items);

  const handleQuantityUpdate = (item: CartItemType, event) => {
    const newCount = event.target.value;

    const clone: CartItemType = { ...item };
    clone.quantity = Number(newCount);

    updateCartItem(clone);
  };

  if (!items.length) {
    return (
      <Flex flexDirection="column" justifyContent="center" height="80vh">
        <Text textAlign="center">
          There's nothing in your cart. #TreatYoself
        </Text>
      </Flex>
    );
  }

  return (
    <div>
      <Padding>
        <ul>
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemoveItem={removeItem}
              onQuantityChange={handleQuantityUpdate}
            />
          ))}
        </ul>
      </Padding>

      <Box
        mt={2}
        py={3}
        px={4}
        backgroundColor="background"
        borderTop="1px solid"
        borderBottom="1px solid"
        borderColor="border"
      >
        <Flex justifyContent="space-between" mb={2}>
          <strong>Discounts:</strong>
          <strong>
            {currency}
            {discount}
          </strong>
        </Flex>

        <Flex pt={3} justifyContent="space-between">
          <strong>Estimated Total:</strong>
          <strong>
            {currency}
            {total}
          </strong>
        </Flex>
      </Box>

      <Padding>
        <Button mt={2}>Go to checkout</Button>
      </Padding>
    </div>
  );
}
