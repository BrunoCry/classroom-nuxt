import SwaggerClient from "swagger-client";

export const apiClient = new SwaggerClient({
    url: process.env.VUE_APP_API_URL + "/openapi.json",
    authorizations: {}
});