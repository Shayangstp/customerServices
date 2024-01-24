import http from "./httpServices";
import config from "./config.json";

export const getCompanies = () => {
  return http.get(`${config.local}/api/getCompanies`, { timeout: 30000 });
};


