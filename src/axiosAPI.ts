import axios from "axios";

const axiosAPI = axios.create({
  baseURL:
    "https://azabiyaliev-be26b-default-rtdb.europe-west1.firebasedatabase.app/",
});

export default axiosAPI;
