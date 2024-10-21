class ConstantService {
    // static HOST = "192.168.1.5";
    // static HOST = "192.168.1.7";
    // static HOST = "192.168.1.18";
    // static HOST = "127.0.143.145";
    static HOST = "192.168.100.240";
    static PORT = "5007";
    static REST_API_BASE_URL = `http://${this.HOST}:${this.PORT}/api/`;
}

export default ConstantService;

export const APP_NAME = "Nutrition-Food-App-1.0";