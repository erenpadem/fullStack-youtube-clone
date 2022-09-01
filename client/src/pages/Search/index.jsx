
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import  Card  from '../../components/Card';
import styled from 'styled-components'
import { api } from '../../api/api';

const Container = styled.div`
display: flex;
flex-wrap: wrap;
gap: 10px;
`;
function Search() {
    const [videos,setVideos] = useState([]);
    const query = useLocation().search;
    useEffect(() => {
        const fetchVideos = async () => {
            const res = await api().get(`/video/search${query}`)
            console.log(res.data.data)
            setVideos(res.data.data)
        }
        fetchVideos();
    },[query])
  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video}/>
      ))}
    </Container>
  )
}

export default Search
