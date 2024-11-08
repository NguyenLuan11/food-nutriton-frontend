class ConstantService {
    static HOST = "fn-api.local";
    static PORT = "5007";
    static REST_API_BASE_URL = `http://${this.HOST}:${this.PORT}/api/`;
}

export default ConstantService;

export const APP_NAME = "Nutrition-Food-App-1.0";