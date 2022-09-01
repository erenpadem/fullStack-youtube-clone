import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./utils/theme";
import { BrowserRouter, Route, Routes,  } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Signin from "./pages/Signin";
import Search from "./pages/Search";
import Update from "./pages/Update";
const Container = styled.div`
  display: flex;
`;
const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.textSoft};
`;
const Wrapper = styled.div`
padding:22px 96px;

`;
const App = () => {
  const [darkMode, setDarkMode] = useState(true);
 
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route index path="/" element={<Home type="random" />} />
                <Route  path="trends" element={<Home type="trend" />} />
                <Route  path="subscriptions" element={<Home type="sub" />} />
                <Route  path="search" element={<Search />} />
                <Route  path="update" element={<Update />} />
                <Route path="signin" element={<Signin/>} />
                <Route path="video">
                  <Route path=":id" element={<Video/>}/>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
};

export default App;
