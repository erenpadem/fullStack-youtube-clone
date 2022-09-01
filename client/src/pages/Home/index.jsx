import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Card from "../../components/Card";
import axios from "axios";
import { useSelector } from "react-redux";
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(260px,350px));
  grid-gap: 10px;
`;

function Home({type}) {
  const [videos, setVideos] = useState([]);
  const {currentUser} = useSelector((state) => state.user);

  const authAxios = axios.create({
    baseURL: "http://localhost:5000/api/",
    headers: { Authorization: `Bearer ${currentUser?.access_token}` },
  });
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await authAxios.get(`video/${type}`);
      setVideos(res.data);

    };
    fetchVideos();
  }, [type]);
  return (
    <Container>
     {videos.map(video => (
         <Card key={video._id} video={video} />
     ))}
    </Container>
  );
}

export default Home;
