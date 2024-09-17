import axios from "axios";
import { Platform } from "react-native";

const api = axios.create({
    baseURL: Platform.OS === 'web' ?'http://localhost:3000':'http://192.168.100.92:3000',
    timeout: 2000
});

export default api;
;
