import {create} from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfilePic: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    isCheckingAuth:true,
    CheckAuth: async () => {
        try {
         const res = await axiosInstance.get("/auth/check");

        set ({authUser: res.data});

}   catch (error) {
    console.log("Error in CheckingAuth", error);
    set({authUser: null});
}   finally {
    set({isCheckingAuth: false});
}
    },

    signup: async(data) =>{
       set ({isSigningUp: true});
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            toast.success("Account created successfully");
            set ({authUser: res.data});
            
        } catch (error) {
            toast.error(error.responce.data.message);
          }  finally{
                set({isSigningUp : false});

            }
        }
    }
));