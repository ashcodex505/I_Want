import { signOut } from "firebase/auth"
import {auth} from '../../firebaseConfig'
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MapWithGeolocation from "../components/MapComponent";

const MapPage = ( ) => {
    const macro = useSelector((state)=> state.macro)
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
        <MapWithGeolocation />
        
        <Typography>
          {macro}
        </Typography>
        
       
        </>
    )
}
export default MapPage