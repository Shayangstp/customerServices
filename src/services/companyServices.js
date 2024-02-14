import http from "./httpServices";
import config from "./config.json";

export const postCompaniesOrders = (values) => {
  return http.post(`${config.local}/api/postCompaniesOrders`, values, {
    timeout: 30000,
  });
};
