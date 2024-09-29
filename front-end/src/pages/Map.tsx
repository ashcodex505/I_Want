import { signOut } from "firebase/auth"
import {auth} from '../../firebaseConfig'
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MapWithGeolocation from "../components/MapComponent";
import myImage from '../assets/IWant_transparentnewnew.png';

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
        {/* <Box
        sx={{
          width: '80%', // Adjust this to control the map's width
          maxWidth: '800px', // Set a max width if desired
          height: '400px', // Set the height of the map
          margin: 'auto', // Center the box horizontally
          marginTop: '100px',
          border: '2px solid #ccc', // Add a border around the box
          borderRadius: '8px', // Optional rounded corners
          overflow: 'hidden', // Ensure map stays inside the box
        }}
      > */}
        <div>
          <Box sx = {{position: 'absolute', top: 30, left: 100}}>
            <img src ={myImage}></img>
          </Box>
        </div>
        <MapWithGeolocation />

        <Button
            variant="outlined"
            sx={{ height: '40px', marginLeft: '10px', position: 'absolute', top: '155px', left: '1120px',
              border: '1px solid white', color: 'white', '&:hover': { backgroundColor: '#CDD8F1' }
            }}
            onClick={() => navigate('/want')} // Change this to your desired route
          >
            Go Back
          </Button>
        <Typography sx={{ marginTop: 2, textAlign: 'center' }}>
          {macro}
        </Typography>
        
       
        </>
    )
}
export default MapPage