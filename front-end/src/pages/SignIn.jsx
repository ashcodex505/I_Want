import { Button, Grid2, TextField, Typography } from "@mui/material"
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useDispatch } from "react-redux";

const SignUpPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState( {
        fullName: '',
       
    })
    
    const handleSubmit = () => {
        dispatch(
         setLogin({
            user: formData.fullName
         })

        );
        navigate('/home')

    }
    return (
        <Grid2 container direction={'column'} alignItems="center"> 
            <Typography variant="body1" fontWeight="bold" sx={{fontSize: '38px', marginRight: '10px', marginTop: 10}}>Sign Up Here</Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
               
                <TextField
                    sx={{width: '80%'}}
                    id= 'text'
                    label={'name'}
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                >
                    
                </TextField>
            </FormControl>
            
            <Button size="small" onClick={handleSubmit} sx={{backgroundColor: '#26272B', color: 'white', border: '1px solid gray', width: '70%','&:hover': {backgroundColor: '#26272B',}, marginTop: 50 }}   >
                Sign Up Here
            </Button>
           
            
        </Grid2>

    )
}
export default SignUpPage;