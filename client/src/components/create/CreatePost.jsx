import { Box, Button, FormControl, InputBase, styled, TextareaAutosize } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { API } from "../../service/api";

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: '10px'
    }
}));

const StyledFormControl = styled(FormControl)`
    margin-top: 100px;
    margin-bottom: 50px;
    display: flex;
    flex-direction: row;
`

const InputTextField = styled(InputBase)`
    flex:1;
    margin: 0 30px;
    font-size: 25px;
`

const Textarea = styled(TextareaAutosize)`
    width: 100%;
    margin-top: 50px;
    font-size: 18px;
    border: none;
    &:focus-visible {
        outline: none;
    }
`

const initialPost = {
    company: '',
    description: '',
    username: '',
    createdDate: new Date()
}

const CreatePost = () => {

        const [post, setPost] = useState(initialPost);

        const { account } = useContext(DataContext);

        const navigate = useNavigate();

        useEffect(() => {
            post.username = account.username;
        },)

        const handleChange = (e) => {
            setPost({ ...post, [e.target.name]: e.target.value })
        }

        const savePost = async() => {
            let response = await API.createPost(post);
            if (response.isSuccess) {
                navigate('/');
            }
        }

        return(
        <Container>
            <StyledFormControl>
                <InputTextField placeholder="Company name" onChange={(e) => handleChange(e)} name="company" />
                <Button variant="contained" onClick={() => savePost()}>Publish</Button>
            </StyledFormControl>
            <hr/>
            <Textarea
                minRows={5}
                placeholder="Tell your experience.."
                onChange={(e) => handleChange(e)} name="description"
            />
        </Container>
    )
}

export default CreatePost;