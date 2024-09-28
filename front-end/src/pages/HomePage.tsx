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
        <Button
           onClick ={handleSignOut}
            variant="contained"
            sx={{
              backgroundColor: '#888888',width: '200px',
              height: '40px',
              '&:hover': { backgroundColor: '#888888' },
              color: 'white',
            }}
          >
            <Typography variant="h1" 
  sx={{ fontWeight: 'bold', fontSize: '18px', color: 'white' }}>
          Sign Out
          </Typography>
          </Button>
       
        </>
    )
}
export default HomePage