import http from "./httpServices";
import config from "./config.json";

export const postDriverSMS = (values) => {
  return http.post(`${config.kaveh_server}/api/global/sendSMS`, values, {
    timeout: 30000,
  });
};

export const login = (user) => {
  return http.get(
    `${config.localapi}/user/login`,
    { params: user },
    { timeout: 30000 }
  );
};
