import { Box, Button, TextField, Typography } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";
import elipse from "../assets/Ellipse 2.png"
import GoogleIcon from "@mui/icons-material/Google"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebaseConfig";
import myImage from '../assets/LogoFINAL.png';
import GoogleLogoPNG from '../assets/google.png';
const SignUpPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState( {
        email: '',
        password: ''
       
    })
    const handleGoogleSignIn = async () => {
      try{
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        console.log('User signed in with Google:', user.displayName);
        navigate('/want');
      }
      catch(err) {
        console.error('Error during google sign in', err)
      }
    }
    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log('User Signed In', user)
      navigate('/want')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
  });
  
    }
    const handleSignUp = () => {

      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          console.log('User Registered:', user)
          navigate('/want')
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage)
        });
        

    }
    return (
      
      <Box sx = {{
        background: 'linear-gradient(135deg, #819dda, #d9d9d9)'
      }}>
        <Grid container direction={'column'} > 
        
        <Grid container alignItems="center" justifyContent='center' >
            <Grid >
            
            {/* <Typography variant="h1" fontWeight="bold" sx={{fontSize: '24px', marginRight: '10px', marginTop: 8, color: 'white'}}>
            I Want
            
            </Typography> */}
            
            </Grid>
        </Grid>
        <Grid sx={{marginLeft:30 }} container  direction={'column'}> 
        <Typography variant="h1" fontWeight="bold" sx={{fontSize: '88px', marginTop: 10, color: 'white'}}>
                Find what 
                </Typography>
            <Typography variant="h1" fontWeight="bold" sx={{fontSize: '88px', marginRight: '10px', marginTop: 0, color: 'white'}}>
            you want
                </Typography>
                <div>
              <Box sx = {{position: 'absolute', top: 40, left: 860}}>
                <img src ={myImage} style = {{width: '300px', height: 'auto'}}></img>
              </Box>
            </div>
            <FormControl sx={{minWidth: 600, marginTop: 10}} size="medium">
               
                <TextField
                    sx={{width: '80%', input: { color: '#fff' },
                    // Change the label color
                    '& .MuiInputLabel-root': { color: '#fff' },
                    // Change border color when focused and not focused
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#fff', // Default border color
                      },
                      '&:hover fieldset': {
                        borderColor: '#fff', // Border color when hovering
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#fff', // Border color when focused
                      },
                    },}}
                    id= 'text'
                    label={'Email Address'}
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                >
                    
                </TextField>
            </FormControl>
            <FormControl sx={{minWidth: 600, marginTop: 5}} size="medium">
               
               <TextField
                   sx={{width: '80%' ,color:'white', input: { color: '#fff' },
                   // Change the label color
                   '& .MuiInputLabel-root': { color: '#fff' },
                   // Change border color when focused and not focused
                   '& .MuiOutlinedInput-root': {
                     '& fieldset': {
                       borderColor: '#fff', // Default border color
                     },
                     '&:hover fieldset': {
                       borderColor: '#fff', // Border color when hovering
                     },
                     '&.Mui-focused fieldset': {
                       borderColor: '#fff', // Border color when focused
                     },
                   },}}
                   id= 'text'
                   type= "password"
                   label={'Password'}
                   placeholder="Enter your password"
                   value={formData.password}
                   onChange={(e) => setFormData({...formData, password: e.target.value})}
               >
                   
               </TextField>
           </FormControl>
        <Grid container direction={'row'}>
        <Box
          sx={{
            //this is where i adjust log in, sign up, and the other one
            marginTop: '60px',
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '20px',
          }}
        >
          <Button
           onClick={handleSignIn}
            variant="outlined"
            sx={{
              width: '200px', border: '2px solid white',
              height: '40px',
              '&:hover': { backgroundColor: '#7A94CB' },
              color: '#516285',
            }}
          >
            <Typography variant="h1" 
  sx={{ fontWeight: 'bold', fontSize: '18px', color: 'white'}}>
          Log In 
          </Typography>
          </Button>
          <Button
         
         onClick ={handleSignUp}
            variant="outlined"
            sx={{
              '&:hover': { backgroundColor: '#7A94CB' },
              border: '2px solid white',width: '200px',
              height: '40px',
            }}
          >
            <Typography variant="h1" 
  sx={{ fontWeight: 'bold', fontSize: '18px', color: 'white' }}>
          Sign Up
          </Typography>
          </Button>
          <Button
          onClick={handleGoogleSignIn}
         //startIcon={<GoogleIcon/>}
         
          variant="contained"
         
          sx={{
            fontSize: '10px',
            fontStyle: 'Inter',
            backgroundColor: '#ffffff',
            color: 'black', width: '300px',
            height: '40px', border: '1px solid gray',
            '&:hover': { backgroundColor: '#dddddd' }, 
          }}
        >
                <img src ={GoogleLogoPNG} style = {{width: '30px', height: 'auto'}}></img>
          
          <Typography variant="h1" 
  sx={{ fontWeight: 'bold', fontSize: '18px', color: '#000000' }} >
          Sign In with Google
          </Typography>
        </Button>
        </Box>
            
            {/* <Button size="small" onClick={handleSubmit} sx={{backgroundColor: '#26272B', color: 'white', border: '1px solid gray', width: '30%','&:hover': {backgroundColor: '#26272B',}, marginTop: 10 }}   >
                Sign Up Here
            </Button>
            <Button size="small" onClick={handleSubmit} sx={{backgroundColor: '#26272B', color: 'white', border: '1px solid gray', width: '30%','&:hover': {backgroundColor: '#26272B',}, marginTop: 10 }}   >
                Log In
            </Button> */}
            </Grid>
            </Grid>
           
            
        </Grid>
        </Box>

    )
}
export default SignUpPage;