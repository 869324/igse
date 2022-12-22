import axios from "axios";
import { BASE_API_PATH } from "../Config/config";

// const function call(url, params) {
//   axios(`${BASE_API_PATH}${url}`, {
//     ...params,
//   })
//     .then((response) => {
//       return response;
//     })
//     .catch((error) => {
//       return error;
//     });
// }

const call = (url, params) =>
  new Promise((resolve, reject) => {
    const accessToken = localStorage.getItem("accessToken");
    axios(`${BASE_API_PATH}${url}`, {
      ...params,
      headers: {
        ...params.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

export default call;
