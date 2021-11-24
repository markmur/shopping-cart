import React from "react";
import { CartContext } from "./context/ShoppingCart";

import "./App.css";
import { fetchProducts } from "./services/api";
import { Product as ProductType } from "./types";
import { Container, Box, Flex, Nav, Text } from "./styles";
import Product from "./components/Product";
import Cart from "./components/CartDrawer";

function App() {
  const { addToCart, toggleCartState, items, currency } =
    React.useContext(CartContext);

  const [state, setState] = React.useState<ProductType[]>([]);
  const [errorMessage, setErrorMessage] = React.useState(null);

  React.useEffect(() => {
    try {
      fetchProducts(9).then((products) => {
        console.log({ products });
        setState(products);
      });
    } catch (error) {
      console.error(error);
      setErrorMessage("Sorry, something went wrong");
      // Send error report to Sentry
    }
  }, []);

  return (
    <div>
      <Nav py={3} color="navColor" backgroundColor="nav">
        <Container px={[0, 4]}>
          <Flex justifyContent="space-between" alignItems="center">
            <Text as="h3">Shop</Text>
            <Text
              fontSize={14}
              cursor="pointer"
              onClick={() => toggleCartState(true)}
            >
              Cart ({items.length})
            </Text>
          </Flex>
        </Container>
      </Nav>

      <main>
        <Container>
          <Flex as="ul" flexWrap="wrap" p={4}>
            {state.map((product) => (
              <Box as="li" p={2} key={product.id} width={[1 / 2, 1 / 3, 1 / 4]}>
                <Product
                  product={product}
                  onAddToCart={addToCart}
                  currency={currency}
                />
              </Box>
            ))}

            {errorMessage}
          </Flex>
        </Container>
      </main>

      <Cart />
    </div>
  );
}

export default App;
