import React, { useState } from "react";
import styled from "styled-components";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import TryOutlinedIcon from "@mui/icons-material/TryOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import Comments from "../../components/Comments";

import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { api } from "../../api/api";
import {
  dislike,
  fetchFailure,
  fetchSuccess,
  like,
} from "../../redux/slices/videoSlice";
import {
  logout
} from "../../redux/slices/userSlice";
import { format } from "timeago.js";
import axios from "axios";
import { subscription } from "../../redux/slices/userSlice";
import Recommendation from "../../components/Recommendation";

const Container = styled.div`
  display: flex;
  gap: 26px;
`;
const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div``;
const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;
const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft}; ;
`;
const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;
const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;
const Button = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;
const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;
const ChannelImage = styled.img`
  background: #ccc;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-left: 10px;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.span`
  font-weight: 500;
`;
const ChannelSub = styled.div`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;
const ChannelDesc = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  color: black;
  background-color: #ffffff;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 50px;
  height: max-content;
`;
const Unsub = styled.button`
  color: #fff;
  background-color: #313131;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 50px;
  height: max-content;
`;
function Video() {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
 if(currentUser === null) {
  const handleLogout = async () => {
    try {
      await fetch("/auth/logout",{
        method:"GET",
      });
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };
  handleLogout();
 }

  const path = useLocation().pathname.split("/")[2];
  const dispatch = useDispatch();

  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await api().get(`/video/find/${path}`);
        const channelRes = await api().get(
          `/user/find/${videoRes.data.data.userId}`
        );
        dispatch(fetchSuccess(videoRes.data.data));
        setChannel(channelRes.data);
      } catch (error) {
        dispatch(fetchFailure());
      }
    };
    fetchData();
  }, [path, dispatch]);

  const authAxios = axios.create({
    baseURL: "http://localhost:5000/api/",
    headers: { Authorization: `Bearer ${currentUser?.access_token}` },
  });

  const handleLike = async (e) => {
    e.preventDefault();
    console.log(currentUser?.data?.id)
    await authAxios.put(`/user/like/${currentVideo._id}`);
    dispatch(like(currentUser?.data?.id));
  };
  const handleDislike = async (e) => {
    e.preventDefault();
    await authAxios.put(`/user/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser?.data?.id));
  };
  const handleSubscribe = async (e) => {
    e.preventDefault();
    console.log(currentUser)
    currentUser?.data?.subscribedUsers.includes(channel._id)
      ? await authAxios.put(`/user/unsub/${channel._id}`)
      : await authAxios.put(`/user/sub/${channel._id}`);
    dispatch(subscription(channel._id));
    console.log(currentUser?.data?.subscribedUsers);
  };

  const VideoFrame = styled.video`
    max-height: 720px;
    width: 100%;
    object-fit: "cover";
  `;
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame controls src={currentVideo?.videoUrl} />
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>
            {currentVideo?.views} views : {format(currentVideo?.createdAt)}
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo?.likes?.includes(currentUser?.data?.id) ? (
                <ThumbUpAltIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}
              {currentVideo?.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo?.dislikes?.includes(currentUser?.data?.id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOutlinedIcon />
              )}
              DISLIKE
            </Button>
            <Button>
              <ReplyOutlinedIcon />
              SHARE
            </Button>
            <Button>
              <DownloadOutlinedIcon />
              DOWNLOAD
            </Button>
            <Button>
              <TryOutlinedIcon />
              SAVE
            </Button>
            <Button>
              <MoreHorizOutlinedIcon />
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <ChannelImage src={channel?.img} />
            <ChannelDetail>
              <ChannelName>{channel?.name}</ChannelName>
              <ChannelSub>{channel?.subscribers} Subscribers</ChannelSub>
              <ChannelDesc>{currentVideo?.desc}</ChannelDesc>
            </ChannelDetail>
          </ChannelInfo>

          {currentUser?.data?.subscribedUsers?.includes(channel._id) ? (
            <Unsub onClick={handleSubscribe}>Subscribed</Unsub>
          ) : (
            <Subscribe onClick={handleSubscribe}>Subscribe</Subscribe>
          )}
        </Channel>
        <Hr />
        {currentUser ? (
          <Comments videoId={currentVideo?._id} />
        ) : (
          "For reading comments sign up or sign in"
        )}
      </Content>
      <Recommendation tags={currentVideo?.tags} />
    </Container>
  );
}

export default Video;
