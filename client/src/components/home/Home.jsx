import { Box, Grid } from "@mui/material";
import Post from './post/Post';
import { Button, TextField, styled } from '@mui/material';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { API } from '../../service/api'

const StyledFormControl = styled(Box)`
    margin-top: 20px;
    display: flex;
    flex-direction: column; 
    align-items: center; 
    gap: 40px;
`;

const Home = () => {

    const [company, setCompany] = useState('');
    const [posts, setPosts] = useState([]);

    const onInputChange = (e) => {
        localStorage.setItem('company', e.target.value);
        setCompany(e.target.value);
    }

    useEffect(() => {
        const fetchData = async() => {
            const savedCompany = localStorage.getItem('company')
            let response = await API.getAllPosts({ company: savedCompany || '' });
            if(response.isSuccess) {
                setPosts(response.data);
            }
        }
        fetchData();
    }, [company])

    return (
        <>
            <Grid container>
                <Grid item lg={2} sm={2} xs={12}>
                <StyledFormControl>
                <TextField variant="standard" value={company} onChange={(e) => onInputChange(e)} name='company' label="Search Company"/>
                    <Link to={'/create'}>
                    <Button variant="contained">Create</Button>
                    </Link>
                    </StyledFormControl>
                </Grid>
            <Grid container item xs={12} sm={10} lg={10}>
            {
                posts && posts.length > 0 ? posts.map(post => (
                    <Grid item lg={3} sm={4} xs={12}>
                        <Link to={`details/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Post post={post}/>
                        </Link>
                    </Grid>
                )) : <Box style={{ color: '#878787', margin: '30px 80px', fontSize: 18 }}>
                        No data available to display
                    </Box>
            }
            </Grid>
            </Grid>
        </>
    )
}

export default Home;