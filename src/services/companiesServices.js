import http from "./httpServices";
import config from "./config.json";

export const getCompanies = () => {
  return http.get(`${config.local}/api/getCompanies`, { timeout: 30000 });
};
export const postActionsOrder = (values) => {
  return http.post(`${config.local}/api/postActionOrders`, values, {
    timeout: 30000,
  });
};
