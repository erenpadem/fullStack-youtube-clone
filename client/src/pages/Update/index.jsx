import React from "react";
import { useState,useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import app from "../../firebase.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginStart, loginSuccess } from "../../redux/slices/userSlice.js";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
  flex-direction: column;
`;
const Label = styled.label`
  color: ${({ theme }) => theme.text};
  font-size: 14px;
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

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  width: 100%;
  outline: none;
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  margin: 10px;
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
const Avatar = styled.img`
  width: 69px;
  height: 69px;
  border-radius: 50%;
  color: ${({ theme }) => theme.text};
  background-color: #353535;
  position: relative;
`;

function Update() {
  
  const [inputs,setInputs] = useState({});
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const {currentUser} = useSelector((state) => state.user)

  const dispatch = useDispatch();

  const [img,setImg] = useState(undefined)
  const [imgPerc,setImgPerc] = useState(0)
  const navigate = useNavigate()
   
  const authAxios = axios.create({
    baseURL: "http://localhost:5000/api/",
    headers: { Authorization: `Bearer ${currentUser?.access_token}` },
  })

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        console.log(urlType);
        urlType === "img" && setImgPerc(Math.round(progress))
         
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    img && uploadFile(img, "img");
  }, [img]);

  const handleUpload = async (e) => {
    e.preventDefault();
    dispatch(loginStart())
    const res = await authAxios.put(`/user/${currentUser?.data?.id}`, { ...inputs, });
    dispatch(loginSuccess(res.data))
    res.status === 401 && navigate(`signin`);
    res.status === 200 && navigate(`/`);
  };

  return (
    <Container>
      <Wrapper>
        <Title>Update your account!</Title>
       <Avatar src={currentUser?.data?.img}></Avatar>
       <Label>Image</Label>
        {imgPerc > 0 ? 
        (
            <Label>
            {"Uploading: " + imgPerc + "%"}
            </Label> 
        ) : (
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        <Input
          placeholder="email"
          type="email"
          name="email"
          onChange={(e) => handleChange(e)}
        />
        <Input
          placeholder="User name"
          name="name"
          onChange={(e) => handleChange(e)}
        />
        <Input
          type="password"
          name="password"
          onChange={(e) => handleChange(e)}
          placeholder="password"
        />
               <Input
          type="password"
          name="password2"
          onChange={(e) => handleChange(e)}
          placeholder="password again"
        />
        <Button onClick={handleUpload}>Update</Button>
      </Wrapper>
    </Container>
  );
}

export default Update;
