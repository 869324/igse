import axios from "axios";
import { BASE_API_PATH } from "../Config/config";

function call(url, params) {
  axios(`${BASE_API_PATH}${url}`, {
    ...params,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

export default call;
