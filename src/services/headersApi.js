class HeadersApi {
    static headersAuthorization(accessToken) {
        const headers = {
            headers : {Authorization: `Bearer ${accessToken}`}
        };
        return headers;
    }
}

export default HeadersApi