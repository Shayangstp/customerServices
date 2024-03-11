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

// export const postCompaniesOrders = (values, paramsValues) => {
//   console.log(paramsValues);
//   return http.post(
//     `${config.local}/api/postCompaniesOrders`,
//     values,
//     { params: { pageNumber: 1, pageSize: 10 } },
//     {
//       timeout: 30000,
//     }
//   );
// };
export const postCompaniesOrders = (values, paramsValues) => {
  console.log(paramsValues);
  const { pageNumber, pageSize } = paramsValues;
  console.log(pageNumber, pageSize);
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
