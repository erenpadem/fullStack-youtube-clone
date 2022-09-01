import React from "react";
import { useState } from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../../redux/slices/userSlice";
import { auth, provider } from "../../firebase.js";
import { signInWithPopup } from "firebase/auth";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  padding: 50px 120px;
  border: 1px solid ${({ theme }) => theme.soft};
`;
const Title = styled.h1`
  font-size: 24px;
`;
const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  width: 100%;
  outline: none;
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  margin: 5px;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: 500;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const More = styled.div`
  display: flex;
  font-size: 12px;
  margin-top: 10px;
  color: ${({ theme }) => theme.textSoft};
`;
const Links = styled.span`
  margin-left: 50px;
`;
const Link = styled.span`
  margin-left: 30px;
`;

function Signin() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await api().post("/auth/signin", { email, password });
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (error) {
      dispatch(loginFailure());
    }
  };
  const handleRegister = async(e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await api().post("/auth/signup", { name,email, password });
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (error) {
      dispatch(loginFailure());
    }
  };
  const navigate = useNavigate()
  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        api().post("/auth/google", {
          name: result.user.displayName,
          email: result.user.email,
          img: result.user.photoURL,
        }).then((res) => {
          console.log(res.data);
          dispatch(loginSuccess(res.data));
          navigate("/");
        });
      })
      .catch((err) => {
        dispatch(loginFailure());
      });
  };
  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to bleedat</SubTitle>
        <Input
          placeholder="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <Button onClick={handleLogin}>Sign in</Button>
        <Title>or</Title>
        <Button onClick={signInWithGoogle}>Sign in with google</Button>
        <Title>or</Title>
        <Input
          placeholder="User name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <Button onClick={handleRegister}>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Privacy</Link>
          <Link>Help</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
}

export default Signin;
