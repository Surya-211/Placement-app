import { Box, Typography, styled } from '@mui/material';
import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { API } from '../../service/api';
import { Edit, Delete } from '@mui/icons-material';
import { DataContext } from '../../context/DataProvider';
import { Markup} from 'interweave';
import Comments from './comments/Comments';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: '10px'
    }
}));

const Heading = styled(Typography)`
    font-size: 30px;
    font-weight: 600;
    text-align: center;
    margin: 100px 0 10px 0;
    word-break: break-word;
`

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`

const Author = styled(Box)`
    color: #878787;
    margin: 20px 0;
    display: flex;

`

const Description = styled(Typography)`
    word-break: break-word;
`

const DetailView = () => {

    const [post,setPost] = useState({});

    const { id } = useParams();
    const { account } = useContext(DataContext);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async() => {
            let response = await API.getPostById(id);
            if(response.isSuccess) {
                setPost(response.data);
            }
        }
        fetchData();
    }, [])

    const deletePost = async () => {
        let response =await API.deletePost(post._id);
        if(response.isSuccess) {
            navigate('/');
        }
    }

    return(
        <Container>
            <Box style={{ float: 'right'}}>
                {
                    account.username === post.username && 
                    <>
                        <Link to={`/update/${post._id}`}><EditIcon color='primary' /></Link>
                        <DeleteIcon onClick={() => deletePost()} color='error' />
                    </>
                }
            </Box>
            <Heading>{post.title}</Heading>
            <Author>
                <Typography>Author: <Box component="span" style={{ fontWeight: 600}}>{post.username}</Box></Typography>
                <Typography style={{marginLeft: 'auto'}}>{new Date(post.createdDate).toDateString()}</Typography>
            </Author>
            <Description><Markup content={post.description}/></Description>
            <Comments post={post} />
        </Container>
    )
}

export default DetailView;