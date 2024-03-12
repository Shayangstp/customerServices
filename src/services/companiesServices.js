import http from "./httpServices";
import config from "./config.json";

export const getCompanies = () => {
  return http.get(`${config.local}/api/getCompanies`, {
    timeout: 30000,
  });
};

export const postActionsOrder = (values) => {
  return http.post(`${config.local}/api/postActionOrders`, values, {
    timeout: 30000,
  });
};

//get the list base on the pageNumber and pageSize
export const postCompaniesOrders = (values, paramsValues) => {
  const { pageNumber, pageSize } = paramsValues;
  return http.post(
    `${config.local}/api/postCompaniesOrders/${pageNumber}/${pageSize}`,
    values,
    {
      timeout: 30000,
    }
  );
};

export const postOutputLog = (values) => {
  return http.post(`${config.local}/api/postOutputLog`, values, {
    timeout: 30000,
  });
};
