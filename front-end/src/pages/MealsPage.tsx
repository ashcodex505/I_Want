import { Avatar, Box,  ButtonBase, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useSelector } from "react-redux";
import Location from '../assets/Location.png'
import SignOut from "../components/SignOutButton";
const Meals = () => {
    const {meals, macro }  = useSelector((state: any) => state);
    const restaurant = useSelector((state:any)=> state.restaurant)
    
    
    console.log(restaurant)
    return ( 
        <>
             <SignOut/>
            <Grid container alignItems = 'center' spacing={2} direction={'column'} mt={0}>
            <Typography variant="h1" fontWeight="bold" sx={{fontSize: '88px', marginTop: 10, color: 'white'}}>
                {restaurant} 
                </Typography>
            <Box 
                    sx={{ 
                        width: '535px', 
                        height: '720px',  // Adjust the height as needed
                        overflowY: 'auto',  // Enable vertical scrolling
                        border: '1px solid lightgray',  // Optional: border to show the scroll area
                        borderRadius: '8px',
                        padding: '10px',
                        background: 'linear-gradient(200deg, #819dda, #d9d9d9)'
                    }}
                >
            {meals.map((state: any, index: any) => (

                <>
               
                
                <Grid sx={{width: '500px', height: '100px'}}>
                <ButtonBase
                 key={index}
        //   onClick={} // Adding click handler
                sx={{ width: '500px', height: '100px'}}
                >
                <Paper
                    elevation={3}
                    sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 2,
                    borderRadius: '16px',
                    mb: 2,
                    width: '100%',
                    height: '90%'
                    }}
                >
            {/* Icon */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
               <Avatar
              
               src= {Location}
               sx={{ width: 50, height: 50 }}
               
               />
              {/* <LocationOnIcon sx={{ fontSize: '40px', mr: 2 }} /> */}

              {/* Text */}
              <Grid container direction={'column'} alignItems='flex-start' >
                <Grid>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {state.dish}
                </Typography>
                </Grid>
                <Grid>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    
                  {`${macro}: ${state[macro]}`} 
                </Typography>
                </Grid>
              </Grid>
            </Box>

            {/* Optional Button (if needed) */}
            {/* You can still keep the button if you want */}
          </Paper>
        </ButtonBase>
                    {/* <Button
                   
                    sx={{
                    
                    color: '#7F56D9',
                    border: '1px solid #7F56D9',
                    boxShadow: 'none',
                    width: '106px',
                    height: '40px', 
                    backgroundColor: '#FFFFFF',
                    fontSize: '15px',
                    '&:hover': {
                        backgroundColor: '#F0F0F0', // Optional: Add a hover effect
                        boxShadow: 'none', // Ensure no shadow on hover
                    },
                    }}
                >
                    <Grid container direction={"row"}>
                        {state.name}
                    </Grid>
                   
                </Button> */}
                </Grid>
            
               
                </>
                
               
            
                
               
            ))}
             </Box>
        </Grid>
       
        
        
        </>
    )
}
export default Meals;