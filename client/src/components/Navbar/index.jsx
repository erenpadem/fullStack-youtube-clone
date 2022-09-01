import React,{useEffect, useState} from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import Upload from "../Popup/Upload";
import Logout from '../../pages/Logout/index'
import {logout} from "../../redux/slices/userSlice";
import axios from 'axios'
const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;
const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0px 20px;
  justify-content: flex-end;
  position: relative;
`;
const Search = styled.div`
  position: absolute;
  width: 40%;
  right: 0px;
  left: 0px;
  margin: auto;
  display: flex;
  background: ${({ theme }) => theme.bg};
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.bgLighter};
  padding: 5px 15px;
  color: ${({ theme }) => theme.text};
`;
const Input = styled.input`
  border: none;
  width: 100%;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.text};

`;
const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: ${({ theme }) => theme.text};
  background-color: #353535;
  position: relative;
`;
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

function Navbar() {
  const { currentUser } = useSelector((state) => state.user);
  const [open,setOpen] = useState(false);
  const [logoutOpen,setLogout] = useState(false)
  const [search,setSearch] = useState("");
  const navigate = useNavigate();
  const authAxios = axios.create({
    baseURL: "http://localhost:5000/api/",
    headers: {Authorization:`Bearer ${currentUser?.access_token}`}
  })

  const dispatch= useDispatch();
  const fetchUser = async() => {
    await authAxios.get("/auth/logout");
    dispatch(logout());
   }
  const checkUser = () => {
    setInterval(() => {
      if(currentUser === null){
        fetchUser();
      }
    },1000 * 1000)
  }
  useEffect(() => {
    checkUser();
  },[])
  return (
    <>
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
          <SearchOutlinedIcon onClick={() => navigate(`/search?q=${search}`) } />
        </Search>
        {currentUser ? (
          <User>
            <VideoCallOutlinedIcon onClick={() => setOpen((prevset) => !prevset)} />
            <Avatar onClick={() => setLogout((prevset) => !prevset)} src={currentUser.data.img} />
            {currentUser.data.name}
          </User>
        ) : (
          <Link
            to="signin"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <LoginButton>
              <AccountCircleOutlinedIcon />
              Sign in
            </LoginButton>{" "}
          </Link>
        )}
      </Wrapper>
    </Container>
    {open && <Upload setOpen={setOpen} />}
    {logoutOpen && <Logout setLogout={setLogout} />}
   </>
  );
}

export default Navbar;
