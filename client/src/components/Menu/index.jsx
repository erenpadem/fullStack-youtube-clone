import React from "react";
import styled from "styled-components";
import KlastrikTube from "../../img/youtube-logo.png";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsBaseballOutlinedIcon from "@mui/icons-material/SportsBaseballOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  height: 100vh;
  position: sticky;
  top: 0;
  left: 0;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
`;
const Img = styled.img`
  height: 25px;
`;
const Wrapper = styled.div`
  padding: 18px 28px;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;
const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;
const Login = styled.div``;
const LoginButton = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  margin-top: 10px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;
function Menu({ setDarkMode }) {
  const handleTheme = () => {
    setDarkMode((prevTheme) => !prevTheme);
  };
  const { currentUser } = useSelector((state) => state.user);
  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src={KlastrikTube} />
            bleedat
          </Logo>
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <HomeOutlinedIcon />
            Home
          </Item>
        </Link>
        <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <ExploreOutlinedIcon />
            Explore
          </Item>
        </Link>
        <Link
          to="subscriptions"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <SubscriptionsOutlinedIcon />
            Subscriptions
          </Item>
        </Link>
        <Item>
          <VideoLibraryOutlinedIcon />
          Library
        </Item>
        <Hr />
        <Item>
          <HistoryOutlinedIcon />
          History
        </Item>
        <Item>
          <WatchLaterOutlinedIcon />
          Watch later
        </Item>
        <Item>
          <ThumbUpOutlinedIcon />
          Lıked videos
        </Item>
        <Hr />
        {currentUser ? <></> : (
          <>
            <Login>
              Sign in to like videos, comment, and subscribe
              <Link
                to="signin"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <LoginButton>
                  <AccountCircleOutlinedIcon />
                  Sign in
                </LoginButton>
              </Link>
            </Login>
            <Hr />
          </>
        )}

        <Title>Best of Bleedat</Title>
        <Item>
          <LibraryMusicOutlinedIcon />
          Music
        </Item>
        <Item>
          <SportsBaseballOutlinedIcon />
          Sport
        </Item>
        <Item>
          <LiveTvOutlinedIcon />
          Live
        </Item>
        <Item>
          <FeedOutlinedIcon />
          News
        </Item>
        <Item>
          <MovieCreationOutlinedIcon />
          Movies
        </Item>
        <Hr />
        <Item>
          <SettingsOutlinedIcon />
          Settings
        </Item>
        <Item>
          <HelpOutlineOutlinedIcon />
          Help
        </Item>
        <Item>
          <FlagOutlinedIcon />
          Report
        </Item>
        <Item onClick={() => handleTheme()}>
          <LightModeOutlinedIcon />
          Switch Mode
        </Item>
      </Wrapper>
    </Container>
  );
}

export default Menu;
