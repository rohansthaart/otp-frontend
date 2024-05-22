import axios from "axios";


const instance = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
    },
});

export const verifyOtp = async (data:any) => {
    try {
        const response = await instance.post("/api/v1/auth/otp-verify", data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}