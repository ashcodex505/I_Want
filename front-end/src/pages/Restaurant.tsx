import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
const Restaurant = () => {
    const restaurants  = useSelector((state) => state.restaurants);
    console.log(restaurants)
    return ( 
        <>

        <Typography sx={{color: 'black'}}>
            {restaurants.map((state, index) => (
                state.distance
  ))}
        </Typography>
        
        </>
    )
}
export default Restaurant;