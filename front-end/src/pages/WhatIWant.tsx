import {Button, ToggleButton, ToggleButtonGroup, Grid2, Typography, Box} from '@mui/material';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setMacro } from '../state';
import myImage from '../assets/IWant_transparentnewnew.png';
import SignOut from '../components/SignOutButton';


const WhatIWant = () => 
    {
        const dispatch = useDispatch();
        //Dont worry about red line under state, error unimportant
       
        const [selectedButton, setSelectedButton] = useState<number | null>(null); // Track the selected button
        const options = ['Protein', 'Carbs', 'Low-Fat', 'Calories/$', '?'];
        const handleButtonClick = (
            _event: React.MouseEvent<HTMLElement>,   
            newSelection: number | null
        ) => {
            setSelectedButton(newSelection);
        }

        const navigate = useNavigate();
        const handleNext = () => {
            console.log(selectedButton)
            dispatch(
                setMacro({
                    macro: selectedButton
                })
            )
            navigate('/map')
            

        }
    
        return(
            <Box sx = {{
                background: 'linear-gradient(130deg, #819dda, #d9d9d9)',
                height: '100vh'
              }}>
            <SignOut/>
            <div>
              <Box sx = {{position: 'absolute', top: 30, left: 100}}>
                <img src ={myImage}></img>
              </Box>
            </div>
            <Typography variant = "h4" sx={{textAlign: 'center', fontWeight: 'bold', marginTop: '100px', color: 'white', fontSize: '46px', fontStyle: 'Inter'}}>I Want ___________________</Typography>

            
            <div style={{ padding: '20px' }}>
            <Grid2 container spacing = {10} justifyContent = "center">
                <ToggleButtonGroup
               
                    value={selectedButton}
                    exclusive
                    onChange={handleButtonClick}
                    aria-label="button selection"
                >
                    <Grid2 container spacing = {2}>
                    {options.map((buttonNumber) => (
                    <ToggleButton
                        key={buttonNumber}
                        value={buttonNumber}
                        aria-label={`${buttonNumber}`}
                        sx={{ margin: '0 10px', width: '150px', padding: '10px 0', color: 'white', borderColor: 'white ',  
                            '&:hover': { backgroundColor: '#CDD8F1' }, 
                            '&.Mui-selected': {
                                backgroundColor: '#9CB2E0'
                              }
                        }}
                    >
                        {buttonNumber}
                    </ToggleButton>
                    ))}
                    </Grid2>
                </ToggleButtonGroup>
            </Grid2>


            {/* Button 6 - Proceed to Next Page */}
            <Grid2 container justifyContent={'center'}>
                <Button
                onClick={handleNext}
                    variant="outlined"
                    disabled={selectedButton === null}
                    sx={{ marginTop: '110px', textAlign: 'center', 
                        border: '2px solid white', color: 'white', '&:hover': { backgroundColor: '#CDD8F1' }
                     }}
                    >
                    Go to Next Page
                </Button>
            </Grid2>
            </div>
            </Box>
        )
        
    }
    
    export default WhatIWant