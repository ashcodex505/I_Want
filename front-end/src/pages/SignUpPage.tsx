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
const SignUpPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState( {
        email: '',
        password: ''
       
    })
    
    const handleSignUp = () => {
        
      
        navigate('/home')

    }
    return (
        <Grid container direction={'column'} > 
        <Grid container alignItems="center" justifyContent='center' >
            <Grid >
            <Typography variant="h1" fontWeight="bold" sx={{fontSize: '18px', marginRight: '10px', marginTop: 5, color: 'white'}}>
            I Want
            </Typography>
            </Grid>
        </Grid>
        <Grid sx={{marginLeft:30 }} container  direction={'column'}> 
        <Typography variant="h1" fontWeight="bold" sx={{fontSize: '88px', marginTop: 10, color: 'white'}}>
                Find what 
                </Typography>
            <Typography variant="h1" fontWeight="bold" sx={{fontSize: '88px', marginRight: '10px', marginTop: 0, color: 'white'}}>
            you want
                </Typography>
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
                        borderColor: '#ff8c00', // Border color when hovering
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#ff8c00', // Border color when focused
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
                       borderColor: '#ff8c00', // Border color when hovering
                     },
                     '&.Mui-focused fieldset': {
                       borderColor: '#ff8c00', // Border color when focused
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
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '20px',
          }}
        >
          <Button
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
          Log In 
          </Typography>
          </Button>
          <Button
          onClick={handleSignUp}
         
            variant="contained"
            sx={{
              backgroundColor: '#888888',
              '&:hover': { backgroundColor: '#888888' },
              color: 'white',width: '200px',
              height: '40px',
            }}
          >
            <Typography variant="h1" 
  sx={{ fontWeight: 'bold', fontSize: '18px', color: 'white' }}>
          Sign Up
          </Typography>
          </Button>
          <Button
         startIcon={<GoogleIcon/>}
          variant="contained"
         
          sx={{
            fontSize: '10px',
            fontStyle: 'Inter',
            backgroundColor: '#888888',
            color: 'black', width: '300px',
            height: '40px', border: '1px solid gray',
            '&:hover': { backgroundColor: '#dddddd' }, 
          }}
        >
          <Typography variant="h1" 
  sx={{ fontWeight: 'bold', fontSize: '18px', color: 'white' }}>
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
    //     <Grid
    //   container
    //   sx={{
    //     height: '100vh',
    //     background: 'linear-gradient(135deg, #555555, #444444)',
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //   }}
    // >
    //   <Grid
        
    //     xs={12}
    //     sm={10}
    //     md={8}
    //     lg={6}
    //     xl={4}
    //     sx={{
    //       backgroundColor: 'rgba(255, 255, 255, 0.1)',
    //       borderRadius: '20px',
    //       padding: '40px',
    //       textAlign: 'center',
    //     }}
    //   >
    //     <Typography variant="h4" color="white" gutterBottom>
    //       I Want
    //     </Typography>
    //     <Typography variant="h2" color="white" fontWeight="bold">
    //       Find what you want
    //     </Typography>

    //     {/* Image Placeholder */}
    //     <Box
    //       sx={{
    //         width: '150px',
    //         height: '150px',
    //         borderRadius: '50%',
    //         backgroundColor: 'rgba(255, 255, 255, 0.2)',
    //         margin: '20px auto',
    //       }}
    //     >
    //       {/* Placeholder for an image */}
    //       <Typography color="white" sx={{ lineHeight: '150px' }}>
    //         Image
    //       </Typography>
    //     </Box>

    //     {/* Email Input */}
    //     <TextField
    //       fullWidth
    //       label="Email Address"
    //       variant="filled"
    //       type="email"
    //       sx={{
    //         marginBottom: '20px',
    //         backgroundColor: 'rgba(255, 255, 255, 0.2)',
    //         borderRadius: '5px',
    //         input: { color: 'white' },
    //         label: { color: 'rgba(255, 255, 255, 0.6)' },
    //       }}
    //       InputProps={{ disableUnderline: true }}
    //     />

    //     {/* Password Input */}
    //     <TextField
    //       fullWidth
    //       label="Password"
    //       variant="filled"
    //       type="password"
    //       sx={{
    //         marginBottom: '20px',
    //         backgroundColor: 'rgba(255, 255, 255, 0.2)',
    //         borderRadius: '5px',
    //         input: { color: 'white' },
    //         label: { color: 'rgba(255, 255, 255, 0.6)' },
    //       }}
    //       InputProps={{ disableUnderline: true }}
    //     />

    //     {/* Buttons */}
    //     <Box
    //       sx={{
    //         display: 'flex',
    //         justifyContent: 'center',
    //         gap: '20px',
    //         marginBottom: '20px',
    //       }}
    //     >
    //       <Button
    //         variant="contained"
    //         sx={{
    //           backgroundColor: '#666666',
    //           '&:hover': { backgroundColor: '#888888' },
    //           color: 'white',
    //         }}
    //       >
    //         Login
    //       </Button>
    //       <Button
    //         variant="contained"
    //         sx={{
    //           backgroundColor: '#666666',
    //           '&:hover': { backgroundColor: '#888888' },
    //           color: 'white',
    //         }}
    //       >
    //         Sign Up
    //       </Button>
    //     </Box>

    //     {/* Google Login */}
    //     <Button
    //       fullWidth
    //       variant="contained"
         
    //       sx={{
    //         backgroundColor: 'white',
    //         color: 'black',
    //         '&:hover': { backgroundColor: '#dddddd' },
    //       }}
    //     >
    //       Login/Sign Up with Google
    //     </Button>
    //   </Grid>
    // </Grid>

    )
}
export default SignUpPage;