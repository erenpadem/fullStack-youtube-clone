import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { format } from "timeago.js";
import { api } from "../../api/api";


import EditComment from "../Popup/EditComment";
const Container = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  background: #ccc;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  gap: 10px;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;
const Text = styled.span``;

const Name = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  font-size: 13px;
`;
const Date = styled.span`
  font-size: 11px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;
const EditButton = styled.button`
  margin-left: auto;
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
const DeleteButton = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #ff3e3e;
  color: #ff3e3e;
  border-radius: 3px;
  margin-top: 10px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
`;





function Comment({ comment }) {
  const { currentUser } = useSelector((state) => state.user);
  const [edit, setEdit] = useState(false);

  const authAxios = axios.create({
    baseURL: "http://localhost:5000/api/",
    headers: { Authorization: `Bearer ${currentUser?.access_token}` },
  });


  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const channelRes = await api().get(`/user/find/${comment.userId}`);
      setUser(channelRes.data);
    };
    fetchUser();
  }, [comment.userId]);
  const handleEdit = async () => {
    setEdit((prevedit) => !prevedit);
  };
  const handleDelete = async () => {
    await authAxios.delete(`/comments/${comment?._id}`)
  };
  const commentOwner = () => {
    if (currentUser?.data?.id === comment.userId) {
      return (
        <>
          <EditButton onClick={handleEdit}>Edit</EditButton>
          <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
        </>
      );
    }
  };
  


  return ( <Container>
    <Avatar src={user.img} />
    <Details>
      <Name>
        {user.name} <Date>{format(comment.createdAt)}</Date>
      </Name>
      <Text>{comment.desc}</Text>
      
    </Details>
    {commentOwner()}
    {edit && <EditComment commentId={comment._id} handleEdit={handleEdit}/>}
  </Container>) 
}

export default Comment;
