
import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import toast from "react-hot-toast";

const useLogout=()=>{
    const [loading,setLoading] =useState(false);
    const { setAuthUser } =useAuthContext() ?? {};

    const logout =async () =>{
        setLoading(true);
        try{
            const res= await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`)
        }
    }
}