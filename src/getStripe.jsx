import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51PGaoB07oXviHGsCaLW0PmLJkvfOcbWU1ZZKBwjtVP0H7oxDhZuS3dzIx7Ac9gM6BYZTjsQZqTSvrlPpVGaKJbsx00qDm3vLty",
    );
  }
  return stripePromise;
};

export default getStripe;
