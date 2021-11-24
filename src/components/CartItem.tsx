import React from "react";
import { Box, Input, Flex, Price, Text } from "../styles";
import { CartItem as CartItemType } from "../types";
import Thumbnail from "./Thumbnail";

interface Props {
  item: CartItemType;
  onRemoveItem(id: string): void;
  onQuantityChange(item: CartItemType, event: any): void;
}

export default function CartItem({
  item,
  onRemoveItem,
  onQuantityChange,
}: Props) {
  return (
    <Flex
      key={item.name}
      justifyContent="space-between"
      borderBottom="1px solid"
      borderBottomColor="border"
      py={3}
      mb={2}
    >
      <Flex alignItems="center">
        <Thumbnail name={item.name} src={item.image_url} />

        <Box ml={4} maxWidth={100}>
          <Text as="h5" lineClamp="3">
            {item.name}
          </Text>
        </Box>
      </Flex>

      <Flex alignItems="center">
        <Text
          cursor="pointer"
          fontSize={13}
          mr={3}
          onClick={() => onRemoveItem(item.id)}
        >
          remove
        </Text>
        <Input
          type="number"
          defaultValue={item.quantity}
          step="1"
          min="1"
          max="10"
          mr={3}
          onChange={(event) => onQuantityChange(item, event)}
        />
        <Price>{Number(item.price).toFixed(2)}</Price>
      </Flex>
    </Flex>
  );
}
