import React, { useEffect, useState } from "react";
import styled from "styled-components";
import app from "../../firebase.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  background-color: #0000007c;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  height: 600px;
  width: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;
const Close = styled.div`
  position: absolute;
  right: 20px;
  top: 10px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
`;
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;
const TextArea = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  resize: none;
  width: 100%;
  height: 100px;
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
const Label = styled.label`
  color: ${({ theme }) => theme.text};
  font-size: 14px;
`;

function Upload({ setOpen }) {
  const {currentUser} = useSelector((state) => state.user);

  const authAxios = axios.create({
    baseURL: "http://localhost:5000/api/",
    headers: { Authorization: `Bearer ${currentUser?.access_token}` },
  });
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
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
        urlType === "imgUrl"
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
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
  const navigate = useNavigate();

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const res = await authAxios.post("/video", { ...inputs, tags });
    setOpen(false);
    res.status === 200 && navigate(`/video/${res.data.data._id}`);
  };
  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>x</Close>
        <Title>Upload a new video</Title>
        <Label>Video</Label>
        {videoPerc > 0 ? (
           <Label>
          {"Uploading: " + videoPerc + "%"}
          </Label> 
        ) : (
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )}
        <Input
          onChange={handleChange}
          name="title"
          type="text"
          placeholder="title"
        />
        <TextArea
          onChange={handleChange}
          name="desc"
          placeholder="description"
          type="text"
        ></TextArea>
        <Input
          type="text"
          onChange={handleTags}
          placeholder="seperate tags with commas."
        />
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
        <Button onClick={handleUpload}>Submit video</Button>
      </Wrapper>
    </Container>
  );
}

export default Upload;
