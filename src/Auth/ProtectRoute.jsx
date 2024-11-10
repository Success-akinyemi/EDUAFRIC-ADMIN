import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {jwtDecode} from 'jwt-decode';
import { useEffect } from "react";

function AuthorizeAdmin() {
    const { currentAdmin } = useSelector((state) => state.admin);
    const user = currentAdmin?.data
      const token = localStorage.getItem('edtechafricauth');
      const tokenExist = !!token;
      const navigate = useNavigate()
    
      useEffect(() => {
        if (!tokenExist && !user) {
          toast.error('PLEASE LOGIN');
          navigate('/')
          return
        } else {
          if(!token){
            navigate('/')
            return
          }
          const decodedToken = jwtDecode(token);
    
          // Check if the token is expired
          if (decodedToken.exp * 1000 < Date.now()) {
            toast.error('Session expiried, Please login');
            navigate('/')
          }
        }
      }, [currentAdmin, tokenExist]); 
    
      return tokenExist && user ? <Outlet /> : <Navigate to={'/'} />;
    }

    export {AuthorizeAdmin}