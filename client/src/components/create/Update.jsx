import { Box, Button, FormControl, InputBase, styled, TextareaAutosize } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { API } from "../../service/api";

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: '10px'
    }
}));

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
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
    picture: '',
    username: '',
    createdDate: new Date()
}

const Update = () => {

        const [post, setPost] = useState(initialPost);

        const { account } = useContext(DataContext);

        const navigate = useNavigate();
        const { id } = useParams();

        useEffect(() => {
            const fetchData = async() => {
                let response = await API.getPostById(id);
                if(response.isSuccess) {
                    setPost(response.data);
                }
            } 
            fetchData();
        }, [])

        useEffect(() => {
            post.username = account.username;
        }, [])

        const handleChange = (e) => {
            setPost({ ...post, [e.target.name]: e.target.value })
        }

        const updatePost = async() => {
            let response = await API.updatePost(post);
            if (response.isSuccess) {
                navigate(`/details/${id}`);
            }
        }

        return(
        <Container>
            <StyledFormControl>
                <InputTextField placeholder="Company" value={post.company} onChange={(e) => handleChange(e)} name="company" />
                <Button variant="contained" onClick={() => updatePost()}>Update</Button>
            </StyledFormControl>

            <Textarea
                minRows={5}
                placeholder="Tell your experience.."
                onChange={(e) => handleChange(e)} name="description"
                value={post.description}
            />
        </Container>
    )
}

export default Update;