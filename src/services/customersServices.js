import http from "./httpServices";
import config from "./config.json";

export const postCustomerOrders = (values) => {
  return http.post(`${config.local}/api/getCustomerOrders`, values, {
    timeout: 30000,
  });
};
export const postCustomerOrdersPerCompany = (values) => {
  return http.post(`${config.local}/api/getCustomerOrdersPerCompany`, values, {
    timeout: 30000,
  });
};
