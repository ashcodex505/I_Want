import { Button, Typography } from "@mui/material"
import Grid from "@mui/material/Grid2"
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";

const SignOut = () => {
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
        <Grid container justifyContent={"flex-end"}>
        <Button
       onClick ={handleSignOut}
        variant="outlined"
        sx={{
          border: '1px solid white', width: '200px', marginTop: '30px', 
          marginRight: '100px',
          '&:hover': { backgroundColor: '#88a2da' },
          color: 'white',
        }}
      >
        <Typography variant="h1" 
sx={{ fontSize: '18px', color: 'white', fontWeight: 'small' }}>
      Sign Out
      </Typography>
      </Button>
      </Grid>
)
}
export default SignOut