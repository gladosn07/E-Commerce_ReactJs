import React, {useContext} from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import useStyles from './style'

import { AuthContext } from "../../../provider/authContext";

import { AddShoppingCart } from "@material-ui/icons";

function Product({ product }) {
   const {handleAddToCart} = useContext(AuthContext)
    const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={product.image.url} tittle={product.name} />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="h6" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {product.price.formatted_with_symbol}
          </Typography>
        </div>
        <Typography dangerouslySetInnerHTML={{ __html: product.description}} variant="body2" color="textSecondary"/>
      </CardContent>

      <CardActions disableSpacing className={classes.cartActions}>
        <IconButton aria-label="Adicione ao Carrinho" onClick={() => handleAddToCart(product.id, 1)}>
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default Product;
