import http from "./httpServices";
import config from "./config.json";

export const postDriverSMS = (values) => {
  return http.post(`${config.kaveh_server}/api/global/sendSMS`, values, {
    timeout: 30000,
  });
};

export const loginStaff = (user) => {
  return http.get(
    `${config.localapi}/user/login`,
    { params: user },
    { timeout: 30000 }
  );
};

export const postCustomerSignUp = (values) => {
  return http.post(`${config.local}/api/postSignUpCustomer`, values, {
    timeout: 30000,
  });
};
export const postCustomerLogin = (values) => {
  return http.post(`${config.local}/api/postLoginCustomer`, values, {
    timeout: 30000,
  });
};
