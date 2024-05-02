import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import unisysLogo from '../assets/Unisys_logo_2022.svg.png';
// import Profiledata from "../assets/Profiledata.png";

import shopBg from "../assets/Ecommerce.gif";
import FolderOpen from "../assets/Folder open.svg";

import { setUserData,getUserDetails } from '../Slice/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import  CustomizedSnackbars  from "../Components/SnackbarSuccess";
import GoogleTranslator from "../Components/GoogleTranslator";
import { width } from '@mui/system';

function Copyright(props) {
  return (
    <Typography 
    variant="h5"
    color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        IKA Intelligent Kirana Assistant
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignInSide() {

    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const [wordCount, setWordCount] = useState(0);

    const userDataMissing = useSelector((state) => state.userDataMissing);


  const handleChange = (event) => {
    console.log(event.target.value);
    setText(event.target.value);
    setWordCount(event.target.value.split(" ").length);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
    console.log({
        name: data.get('name'),
        phone: data.get('phone'),
        location: data.get('location'),
        shoptype: data.get('shoptype'),
        yearofexperience: data.get('yearofexperience'),
        description: data.get('description'),
    });
    const hasEmptyValue = Object.values(data).some(value => value === "" || value === null || value === undefined);
    console.log(hasEmptyValue);
    // const {name,phone,location,shoptype,description} = data;
    // if(name === "" || phone === '' || location ===  '' || shoptype === '' || description === "")
    // {
    //     console.log("data missing");   
    // }

    // dispatch(setUserData({
    //     name: data.get('name'),
    //     phone: data.get('phone'),
    //     location: data.get('location'),
    //     shoptype: data.get('shoptype'),
    //     yearofexperience: data.get('yearofexperience'),
    //     description: data.get('description'),
    // }));
    dispatch(getUserDetails({
      name: data.get('name'),
      phone: data.get('phone'),
      location: data.get('location'),
      shoptype: data.get('shoptype'),
      yearofexperience: data.get('yearofexperience'),
      description: data.get('description'),
  }));

  };

  return (
    <ThemeProvider theme={defaultTheme}>
        {/* <GoogleTranslator /> */}
        <div id="google_translate_element"></div>
      <Grid container component="main" sx={{ height: '100vh', }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${shopBg})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            // backgroundSize: 'auto',
            backgroundSize: '70%',
            // backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={10} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 3,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* <Avatar sx={{ m: 1 }}> */}
              {/* <LockOutlinedIcon /> */}
              <img src={FolderOpen} width={70} height={70} />
            {/* </Avatar> */}
            <Typography component="h1" variant="h5">
              Get Started to IKA Intelligent Kirana Assistant
            </Typography>
        
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            { <CustomizedSnackbars  message="You Missed out some field !! Please fill it 😔" errorType={"error"} horizontalValue='right' verticalValue='top' /> }
            <TextField
                margin="normal"
                required
                fullWidth
                size='normal'
                id="name"
                label="Name"
                name="name"
                InputLabelProps={{ style: { fontSize: 14 } }}
                autoComplete="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                InputLabelProps={{ style: { fontSize: 14 } }}
                type="number"
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete='phone'
                autoFocus
              />
              <TextField
              margin="normal"
              required
              InputLabelProps={{ style: { fontSize: 14 } }}
              fullWidth
              id="location"
              label="Shop Location"
              name="location"
              autoComplete="location"
              autoFocus
            />
              <TextField
                margin="normal"
                required
                InputLabelProps={{ style: { fontSize: 14 } }}
                fullWidth
                name="shoptype"
                label="Shop Type"
                // type="shop type"
                id="shoptype"
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                type="number"
                min="0"
                max="50"
                InputLabelProps={{ style: { fontSize: 14 } }}
                pattern="[0-9]+"
                id="yearofexperience"
                label="Years of Experience"
                name="yearofexperience"
                autoComplete='yearofexperience'
                autoFocus
                // sx={{
                //     fontSize: '3.5rem', // Increase the font size
                //     '& label.Mui-focused': {
                //       color: 'black', // Change the color of the label when focused
                //     },
                //     '& .MuiInput-underline:after': {
                //       borderBottomColor: 'black', // Change the underline color when input is focused
                //     },
                //     '& .MuiOutlinedInput-root': {
                //       '& fieldset': {
                //         borderColor: 'black', // Change the border color
                //       },
                //       '&:hover fieldset': {
                //         borderColor: 'black', // Change the border color when hovered
                //       },
                //       '&.Mui-focused fieldset': {
                //         borderColor: 'black', // Change the border color when input is focused
                //       },
                //     },
                //   }}
              />
              <TextField
                margin="normal"
                id="textarea-with-fixed-words"
                label="Shop Description"
                multiline
                fullWidth
                size="medium" 
                placeholder="The shop description"
                minRows={2}
                InputLabelProps={{ style: { fontSize: 14 } }}
                maxRows={4}
                name='description'
                value={text}
                onChange={handleChange}
                required
                helperText={`${wordCount} / 100 words`}
                />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                // width="80rem"
                // height='80rem'
                style={{backgroundColor: '#2b6b94'}}
                fullWidth
                variant="contained"
                sx={{ 
                    mt: 3,
                     mb: 2,
                    // mx: 35,
                    //  ml: 35 
                    alignItems: 'center',
                    }}
              >
                Submit
              </Button>
              <Grid container>
                <Grid item xs>
                    {/* <img src={BackButton} /> */}
                    {/* <Button> <img src={BackButton} /> </Button> */}
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                    {/* <Button> <img src={RightArrow} width={20} height={30} /> </Button> */}
                  {/* <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link> */}
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}   


// https://unicornicons.com/icons
// #891652
// https://www.flaticon.com/search?word=next%20button&color=color

// https://mui.com/joy-ui/react-textarea/


// https://codesandbox.io/p/sandbox/google-translate-in-react-js-qzdjj?file=%2Fsrc%2FApp.js%3A14%2C28