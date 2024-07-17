import CryptoJS from "crypto-js";

function encryptPass(pass, key) {
    const hmacSha256 = CryptoJS.HmacSHA256(pass, key);
    return hmacSha256.toString(CryptoJS.enc.Hex);
}

export default encryptPass;