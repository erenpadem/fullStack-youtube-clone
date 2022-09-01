import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "../Comment";
import axios from "axios";
import { commentsFailure, commentsLoading, commentsSuccess } from "../../redux/slices/commentSlice";

const Container = styled.div`
width:100%;
`;
const NewComment = styled.div`
  display: flex;
  align-items: center;
`;
const Avatar = styled.img`
  background: #ccc;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  gap: 10px;
`;
const Input = styled.input`
  border: none;
  color: ${({ theme }) => theme.text};
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;
const Button = styled.button`
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
function Comments({ videoId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const authAxios = axios.create({
    baseURL: "http://localhost:5000/api/",
    headers: { Authorization: `Bearer ${currentUser?.access_token}` },
  });
  const handleComment = async () => {
    try {
      dispatch(commentsLoading())
      const res = await authAxios.post("/comments", { desc: comment, videoId:videoId });
      dispatch(commentsSuccess(res));
     
    } catch (error) {
      dispatch(commentsFailure())
    }
    setComment("");
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await authAxios.get(`/comments/${videoId}`);
        setComments(res.data.data);
      } catch (error) {}
    };
    fetchComments();
  }, [videoId,authAxios]);

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser.data.img} />
        <Input
          placeholder="add a new comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {comment !== "" && <Button onClick={handleComment}>Add</Button>}
      </NewComment>
      {comments.map((comment) => (
        <Comment key={comment?._id} comment={comment} />
      ))}
    </Container>
  );
}

export default Comments;
