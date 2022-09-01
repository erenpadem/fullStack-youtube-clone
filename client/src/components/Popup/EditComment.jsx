import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';
import {commentsLoading, commentsSuccess} from '../../redux/slices/commentSlice.js'
const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #0000007c;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  height: 200px;
  width: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
  margin-top: auto;
  margin-bottom: 10px;
`;
const Cancel = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: red;
  color: ${({ theme }) => theme.text};
  margin-top: auto;
  margin-bottom: 10px;
`;
function EditComment({commentId,handleEdit}) {
  const dispatch = useDispatch();
  const {currentUser} = useSelector((state) => state.user);
  const [desc,setDesc] = useState("")
  const authAxios = axios.create({
    baseURL: "http://localhost:5000/api/",
    headers: { Authorization: `Bearer ${currentUser?.access_token}` },
  });
    const handleChange = (value) => {
      setDesc(value)
    }
    const handleSubmit = () => {
     if(desc !== "") {
      dispatch(commentsLoading())
      const fetchData = async() => {
        await authAxios.put(`/comments/${commentId}`,{desc})
        dispatch(commentsSuccess())
        handleEdit();
      }
      fetchData();
     }
    }
  return (
    <Container>
      <Wrapper>
      <Input
          onChange={(e) =>handleChange(e.target.value)}
          name="title"
          type="text"
          placeholder="Update comment"
          value={desc}
        />
      {desc &&  <Button onClick={handleSubmit}>Update Comment</Button>}<Cancel onClick={handleEdit}>Cancel</Cancel>
      </Wrapper>
    </Container>
  )
}

export default EditComment
