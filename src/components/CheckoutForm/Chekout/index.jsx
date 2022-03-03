import React, { useState, useEffect, useContext } from "react";
import useStyles from "./style";
import { Paper, Stepper, Step, StepLabel, Typography } from "@material-ui/core";

import { commerce } from "../../../lib/commerce";

import { AuthContext } from "../../../provider/authContext";

import PaymentForm from "../PaymentForm";
import AddressForm from "../AddressForm";

function Chekout() {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});

  const { cart, handleCapureCheckout } = useContext(AuthContext);
  const classes = useStyles();

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });

        setCheckoutToken(token);
      } catch (err) {
        alert("Ocorreu um erro na geração do Token " + err);
      }
    };
    generateToken();
  }, [cart]);

  const steps = ["Endereço de Envio", "Detalhes do Pagamento"];

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data) => {
    setShippingData(data);

    nextStep();
  };

  const Confirmation = () => <div>Confirmation</div>;

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        backStep={backStep}
        handleCapureCheckout={handleCapureCheckout}
        nextStep={nextStep}
      />
    );

  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" alig="center">
            Checkout
          </Typography>
          <Stepper activeStep={0} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
}

export default Chekout;
