import http from "./httpServices";
import config from "./config.json";

export const postDriverSMS = (values) => {
  return http.post(`${config.kaveh_server}/api/global/sendSMS`, values, {
    timeout: 30000,
  });
};

export const loginAPI = (user) => {
  return http.get(
    `${config.kaveh_server_login_online}/user/login`,
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

export const getUserIp = (values) => {
  return http.get(`${config.local}/api/ip`, {
    timeout: 30000,
  });
};
