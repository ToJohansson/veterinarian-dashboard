// axios Crud operations
import { instance } from "../AxiosInstance";

// GET

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
export const deleteOwner = async (id: any) => {
    try {
        const res = await instance.delete(`/owner/deleteowner/${id}`); 
        return res;
    } catch (err) {
        console.log(err);
        throw err;
    }
}


// PUT
export const putOwner = async (data: any) => {
    try {
        const id = data.id;
        const res = await instance.put(`/owner/updateowner/${id}`, data); 
        return res;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
