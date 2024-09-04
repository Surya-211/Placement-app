import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { useState, useContext } from "react";
import { API } from '../../service/api'
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
`;

const Image = styled("img")({
  width: 200,
  margin: "auto",
  display: "flex",
  padding: "50px 0 0",
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    flex-direction: column;
    & > div, & > button {
    margin-top:20px;
    }
`

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const signupInitialValues = {
    name: '',
    username: '',
    password:''
}

const loginInitialValues = {
    username: '',
    password:''
}

const Login = ({isUserAuthenticated}) => {
  const imageURL ="https://www.brainwareuniversity.ac.in/images/career-employbility.jpg";

    const [account, toggleAccount] = useState('login');
    const [signup, setSignup] = useState(signupInitialValues);
    const [login, setLogin] = useState(loginInitialValues)
    const [error, setError] = useState('');

    const { setAccount } = useContext(DataContext);
    const navigate = useNavigate();

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    const onInputChange = (e) => {
        setSignup({...signup, [e.target.name]: e.target.value});
    }

    const signupUser = async() => {
        try {
            let response = await API.userSignup(signup);
        if(response.isSuccess) {
            setError('');
            setSignup(signupInitialValues);
            toggleAccount('login')
        } else {
            setError('Something went wrong! Please try again later')
        }
        } catch(err) {
            setError('Something went wrong! Please try again later')
        }   
    }

    const onValueChange = (e) => {
        setLogin({...login, [e.target.name]: e.target.value});
    }

    const loginUser = async() => {
        try {
        let response = await API.userLogin(login);
        if(response.isSuccess) {
            setError('');

            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);

            setAccount({username: response.data.username, name: response.data.name});

            isUserAuthenticated(true);

            navigate('/');

        } else {
            setError('Something went wrong! Please try again later')
        }
    } catch (err) {
        setError('Something went wrong! Please try again later')
    }
    }

  return (
    <Component>
      <Box>
        <Image src={imageURL} alt="login" />
        {
            account === 'login' ?
            <Wrapper>
          <TextField variant="standard" value={login.username} onChange={(e) => onValueChange(e)} name='username' label="Enter Username"/>
          <TextField variant="standard" value={login.password} onChange={(e) => onValueChange(e)} name='password' label="Enter Password"/>

          { error && <Error>{error}</Error> }

          <LoginButton variant="contained" onClick={() => loginUser()}>Login</LoginButton>
          <SignupButton onClick={() => toggleSignup()}>Create an account</SignupButton>
        </Wrapper>
        :
        <Wrapper>
        <TextField variant="standard" value={signup.name} onChange={(e) => onInputChange(e)} name='name' label="Enter Name"/>
        <TextField variant="standard" value={signup.username} onChange={(e) => onInputChange(e)} name='username' label="Enter Username"/>
        <TextField variant="standard" value={signup.password} onChange={(e) => onInputChange(e)} name='password' label="Enter Password"/>

        { error && <Error>{error}</Error> }

        <SignupButton onClick={() => signupUser()}>Sign Up</SignupButton>
        <LoginButton variant="contained" onClick={() => toggleSignup()}>Already have an account</LoginButton>
      </Wrapper>
        }
        
      </Box>
    </Component>
  );
};

export default Login;
