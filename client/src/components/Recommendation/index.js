import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../Card";
const Container = styled.div`
  flex: 2;
`;
function Recommendation({tags}) {
    const [videos,setVideos] = useState([]);
   useEffect(() => {
    const fetchVideos = async() => {
          const res = await axios.get(`/video/tags?tags=${tags}`)
          setVideos(res.data.data);
    }
    fetchVideos()
   },[tags])
    useEffect(() => {

    })
  return <Container>
  {videos.map(video => (
      <Card key={video._id} video={video} type="sm"/>
  ))}
  </Container>;
}

export default Recommendation;
