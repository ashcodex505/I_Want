import {Button, ToggleButton, ToggleButtonGroup, Grid2, Typography} from '@mui/material';
import {useState} from 'react';


   

const WhatIWant = () => 
    {
        const [selectedButton, setSelectedButton] = useState<number | null>(null); // Track the selected button

        const handleButtonClick = (
            event: React.MouseEvent<HTMLElement>,   
            newSelection: number | null
        ) => {
            setSelectedButton(newSelection);
        }
        return(
            <>
            <Typography variant = "h4" sx={{textAlign: 'center', marginTop: '100px'}}>I Want ___________________</Typography>

            <div style={{ padding: '20px' }}>
            <Grid2 container spacing = {10} justifyContent = "center">
                <ToggleButtonGroup
                    value={selectedButton}
                    exclusive
                    onChange={handleButtonClick}
                    aria-label="button selection"
                >
                    <Grid2 container spacing = {2}>
                    {['Protein', 'Carbs', 'Low-Fat', 'Calories/$', '?'].map((buttonNumber) => (
                    <ToggleButton
                        key={buttonNumber}
                        value={buttonNumber}
                        aria-label={`${buttonNumber}`}
                        sx={{ margin: '0 10px', width: '150px', padding: '10px 0' }}
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