import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import {format} from 'timeago.js';
import { api } from "../../api/api";


const Container = styled.div`
  width: ${(props) => props.type!=="sm" && "350px"};
  display:${(props) => props.type==="sm" && "flex"};
  margin-bottom: ${(props) => props.type==="sm" ? "10px" : "45px"};
  gap:10px;
`;
const Image = styled.img`
  width: 100%;
  height: ${(props) => props.type==="sm" ? "120px" : "202px"};
  background-color: #999;
  flex:${(props) => props.type==="sm" && 1};
`;
const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type!=="sm" && "16px"};
  gap: 12px;
  flex:${(props) => props.type==="sm" && 1};
`;
const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  display:${(props) => props.type==="sm" && "none"};
  border-radius: 50%;
  background-color: #999;
`;
const Texts = styled.div``;
const ChannelName = styled.h2`
  font-size: 14px;
  margin: 9px 0px;
  color: ${({ theme }) => theme.textSoft};
`;
const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;
const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

function Card({type,video}) {
  const [channel,setChannel] = useState({});
 const {currentUser} = useSelector((state) => state.user);
  useEffect(() => {
    const fetchData = async() => {
      const res = await api().get(`/user/find/${video.userId}`)
      setChannel(res.data);
    }
    fetchData();
  },[video.userId])
  const authAxios = axios.create({
    baseURL: 'http://localhost:5000/api/',
    headers:{Authorization:`Bearer ${currentUser?.access_token}`}
  })
  const handleView = async () => [
     await authAxios.get(`/video/view/${video._id}`)
     
  ]
  return (
    <Link onClick={handleView} to={`/video/${video._id}`}>
      <Container type={type}>
        <Image type={type} src={video.imgUrl} />
        <Details type={type}>
          <ChannelImage type={type} src={channel.img} />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel.name}</ChannelName>
            <Info>{video.views}* {format(video.createdAt)}</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
}

export default Card;
