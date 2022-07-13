import SwaggerClient from "swagger-client";
import { API_URL } from '@/utils/config';

export const apiClient = new SwaggerClient({
    url: API_URL + "/openapi.json",
    authorizations: {}
});