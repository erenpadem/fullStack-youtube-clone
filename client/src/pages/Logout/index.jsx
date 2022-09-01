import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {Link} from 'react-router-dom'
import { logout } from "../../redux/slices/userSlice";
const Ul = styled.ul`
  position: fixed;
  width: 10rem;
  top: 68px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  right: 15px;
  list-style-type: none;
  background-color: ${({ theme }) => theme.bg};
`;

const Close = styled.li`
  background-color: ${({ theme }) => theme.bgLight};
  color: ${({ theme }) => theme.text};
  border-bottom: 2px solid ${({ theme }) => theme.soft};
  text-align: center;
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 18px;
  outline: none;
  cursor: pointer;
  :hover& {
    background-color: ${({ theme }) => theme.soft};
  }
`;
function Logout({ setLogout }) {
  const dispatch = useDispatch();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await fetch("/auth/logout", {
        method: "GET",
      });
      dispatch(logout());
      setLogout(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Ul>
        <Close onClick={handleLogout}>logout</Close>
        <Link to="/update"><Close onClick={() => setLogout(false)}>Update Acoount</Close></Link>
        <Close onClick={() => setLogout(false)}>X</Close>
      </Ul>
    </>
  );
}

export default Logout;
