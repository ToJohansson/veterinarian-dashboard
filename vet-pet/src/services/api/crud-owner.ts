// axios Crud operations
import { instance } from "../AxiosInstance";

// POST
export const postOwner = async (data: any) => {
    try {
        const res = await instance.post("/owner/newowner", data);
        return res.data;
    } catch (err) {
        console.log(err);
        throw err; 
    }
}
// DELETE

// PUT
export const putOwner = async (data: any) => {
    try {
        const id = data.id;
        const res = await instance.put(`/owner/updateowner/${id}`, data).then((res) => console.log(res)); 
        return res;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
