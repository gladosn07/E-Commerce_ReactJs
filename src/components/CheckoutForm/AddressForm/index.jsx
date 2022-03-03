import React, { useState, useEffect } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { commerce } from "../../../lib/commerce";

import CustomTextField from "../CustomTextField";
import { Link } from "react-router-dom";

function AddressForm({ checkoutToken, next }) {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubDivisions, setShippingSubDivisions] = useState([]);
  const [shippingSubDivision, setShippingSubDivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const methods = useForm();

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));
  const subdivisions = Object.entries(shippingSubDivisions).map(
    ([code, name]) => ({ id: code, label: name })
  );
  const options = shippingOptions.map((shippingOption) => ({
    id: shippingOption.id,
    label: `${shippingOption.description} - (${shippingOption.price.formatted_with_symbol})`,
  }));

  const fetchShippingCountries = async (TokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      TokenId
    );

    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubDivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );

    setShippingSubDivisions(subdivisions);
    setShippingSubDivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      {
        country,
        region,
      }
    );

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubDivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubDivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubDivision
      );
  }, [shippingSubDivision]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Endereço de Envio
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data)=> next({ ...data, shippingCountry, shippingSubDivision, shippingOption }))}>
          <Grid container spacing={3}>
            <CustomTextField name="firstname" label="Primeiro nome" />
            <CustomTextField name="lastName" label="Ultimo nome" />
            <CustomTextField name="address1" label="Endereço" />
            <CustomTextField name="email" label="E-mail" />
            <CustomTextField name="city" label="Cidade" />
            <CustomTextField name="ziip" label="Cep" />

            <Grid item xs={12} sm={6}>
              <InputLabel>Pais de Envio</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {countries.map((country) => (
                  <MenuItem key={country.di} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel>Pais de Envio</InputLabel>
              <Select
                value={shippingSubDivision}
                fullWidth
                onChange={(e) => setShippingSubDivision(e.target.value)}
              >
                {subdivisions.map((subdivision) => (
                  <MenuItem key={subdivision.di} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <InputLabel>Opções de Envio</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {options.map((option) => (
                  <MenuItem key={option.di} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

          </Grid> 
          <br />
          <div style={{display: 'flex', justifyContent: 'space-between'}}> 
            <Button component={Link} to='/cart' variant='outlined'>Voltar ao Carrinho</Button>
            <Button type='submit' variant='contained' color='primary'>Avançar</Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}

export default AddressForm;
