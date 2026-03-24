import API from "./axiosConfig";

export const makePayment = (referenceId, type, amount) =>
  API.post(
    `/payments?referenceId=${referenceId}&type=${type}&amount=${amount}&method=CARD`
  );