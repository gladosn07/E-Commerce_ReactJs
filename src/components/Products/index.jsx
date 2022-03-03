import React, {useContext} from 'react'
import { Grid } from '@material-ui/core'

import Product from './Product'

import useStyle from './style'

import { AuthContext } from '../../provider/authContext'

function Products() {
    const {product} = useContext(AuthContext)

    const classes = useStyle()

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container justifyContent='center' spacing={4}>
                {product.map((products) => (
                    <Grid item key={products.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={products} />
                    </Grid>
                ))}
            </Grid>
        </main>
    )
}

export default Products
