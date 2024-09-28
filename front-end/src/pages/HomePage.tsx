import { signOut } from "firebase/auth"
import {auth} from '../../firebaseConfig'
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const HomePage = ( ) => {
    const navigate = useNavigate();
    const handleSignOut = async () => {
        try {
          await signOut(auth);
          console.log('User signed out');
          navigate('/')
        } catch (error) {
          console.error('Error signing out:', error);
        }
      };
    return (
        <>
        
       
        </>
    )
}
export default HomePage