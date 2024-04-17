import { instance } from "../AxiosInstance";

// GET
export const getAdmins = () => {
    return instance.get("admin/alladmins")
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

