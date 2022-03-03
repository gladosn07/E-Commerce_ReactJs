import React, { useContext } from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

import useStyles from "./style";
import CartItem from "./CartItem";

import { AuthContext } from "../../provider/authContext";

function Cart() {
  const { cart, handleEmptyCart } = useContext(AuthContext);

  const classes = useStyles();

  const EmptyCart = () => (
    <Typography variant="subtitle1">
      Voce nao tem itens no carrinho!!&nbsp;&nbsp;
      <Link to="/" className={classes.link}>
        Começar a Comprar
      </Link>
    </Typography>
  );

  const FiledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4}>
            <CartItem item={item} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          subtotal: {cart.subtotal.formatted.with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleEmptyCart}
          >
            Esvaziar Carrinho
          </Button>

          <Button
            component={Link}
            to="/checkout"
            className={classes.checkoutButton}
            size="large"
            type="button"
            variant="contained"
            color="primary"
          >
            Conferir
          </Button>
        </div>
      </div>
    </>
  );

  if (!cart.line_items) return "Loading...";

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h5" gutterBottom>
        Seu Carrinho de Compras
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FiledCart />}
    </Container>
  );
}

export default Cart;
