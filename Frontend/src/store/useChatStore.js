import {create }    from "zustand";
import {toast }     from "react-hot-toast";
import { AxiosInstance, axiosInstance } from "../lib/axios";

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
    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
          const res = await axiosInstanceiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
          set({ messages: [...messages, res.data] });
        } catch (error) {
          toast.error(error.response.data.message);
        }
      },
    
    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;
    
        const socket = useAuthStore.getState().socket;
    
        socket.on("newMessage", (newMessage) => {
          const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
          if (!isMessageSentFromSelectedUser) return;
    
          set({
            messages: [...get().messages, newMessage],
          });
        });
      },
    
     unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
      },
    
    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));