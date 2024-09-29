import {Button, ToggleButton, ToggleButtonGroup, Grid2, Typography} from '@mui/material';
import { signOut } from 'firebase/auth';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {auth} from '../../firebaseConfig'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setMacro } from '../state';

const WhatIWant = () => 
    {
        const dispatch = useDispatch();
        const macro = useSelector((state)=>state.macro)
        const [selectedButton, setSelectedButton] = useState<number | null>(null); // Track the selected button
        const options = ['Protein', 'Carbs', 'Low-Fat', 'Calories/$', '?'];
        const handleButtonClick = (
            event: React.MouseEvent<HTMLElement>,   
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
            

        }
    const handleSignOut = async () => {
        try {
          await signOut(auth);
          console.log('User signed out');
          navigate('/')
        } catch (error) {
          console.error('Error signing out:', error);
        }
      };
        return(
            <>
            <Button
           onClick ={handleSignOut}
            variant="contained"
            sx={{
              backgroundColor: '#516285',width: '200px',
              height: '40px',
              '&:hover': { backgroundColor: '#dddddd' },
              color: 'white',
            }}
          >
            <Typography variant="h1" 
  sx={{ fontWeight: 'bold', fontSize: '18px', color: 'white' }}>
          Sign Out
          </Typography>
          </Button>
            <Typography variant = "h4" sx={{textAlign: 'center', marginTop: '100px', color: 'white', fontSize: '46px', fontStyle: 'Inter'}}>I Want ___________________</Typography>

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
                            '&.Mui-selected': {
                                backgroundColor: '#516285',
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
                    variant="contained"
                    disabled={selectedButton === null}
                    style={{ marginTop: '20px', textAlign: 'center' }}
                >
                    Go to Next Page
                </Button>
            </Grid2>
            </div>
            </>
        )
        
    }
    
    export default WhatIWant