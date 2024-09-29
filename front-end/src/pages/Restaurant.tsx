import { Avatar, Box, Button, ButtonBase, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useSelector } from "react-redux";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Location from '../assets/Location.png'
import { setMeals, setRestaurant } from "../state";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignOut from "../components/SignOutButton";
const Restaurant = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {restaurants, macro}  = useSelector((state) => state);

   
    const handleClick = async(state) => {
       
            try {
              
              const savedMealsResponse = await fetch(
                "http://127.0.0.1:5000/dishes",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json", // Ensure the correct header is set
                  },
                  body: JSON.stringify({
                    'macro': macro,
                    "restaurant": state.name
      
                  }),
                }
              );
              const savedMeals = await savedMealsResponse.json();
              if(savedMealsResponse.ok){
                console.log(savedMeals);
                console.log(state.name)
                dispatch(
                  setMeals(savedMeals)
                  
                  
                )
                dispatch(setRestaurant(state.name))
                console.log('Success')
               
               
                navigate('/meals')
              }
              else{
                console.error('Error:', savedRestaurants);
              }
              
            } catch (error) {
              console.error('Error:', error);
            
          }
        
    }
    return ( 
        <>
        <SignOut/>
             
            <Grid container alignItems = 'center' spacing={2} direction={'column'} mt={10}>
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
            {restaurants.map((state, index) => (

                <>
               
                
                <Grid sx={{width: '500px', height: '100px'}}>
                <ButtonBase
                onClick={() => handleClick(state)}
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
                  <Grid container direction={'row'}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {state.name} 
                </Typography>
                <Typography variant="body2" sx={{marginLeft: 2, marginTop: 0.6}}>
                  {/* {state.distance} <span style={{ marginLeft: '15px' }}>{state.duration}</span> */}
                  {state.duration}
                </Typography>
                </Grid>
                </Grid>
                <Grid>
                <Typography variant="body2">
                  {/* {state.distance} <span style={{ marginLeft: '15px' }}>{state.duration}</span> */}
                  {state.address} <span style={{position: 'absolute', right: 25}}>{state.distance}</span>
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
export default Restaurant;