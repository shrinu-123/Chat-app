import {create }    from "zustand";
import {toast }     from "react-hot-toast";
import { AxiosInstance } from "../lib/axios";

export const useChatStore = create((set) => ({
    
    messages : [],
    users: [],
    selectedUser : null,
    isUserLoading : false,
    isMessageLoading : false,
    
    getUsers: async( ) =>{
        set({isUserLoading : true});
        try{
            const res = await AxiosInstance.get("/chat/users");
            set({users : res.data});
        } catch (error){
            toast.error(error.response.data.message);
        } finally {
            set({isUserLoading : false});
        }
    },

    getMessages: async (userId) => {
        set({isMessageLoading : true});
        try{
            const res = await AxiosInstance.get(`/chat/messages/${userId}`);
            set({messages : res.data});
        } catch (error){
            toast.error(error.response.data.message);
        } finally {
            set({isMessageLoading : false});
        }
    },
    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));