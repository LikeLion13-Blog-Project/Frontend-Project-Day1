import styled from "styled-components";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router";

function App() {
  return (
    <AppContainer>
      <RouterProvider router={router} />
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div``;
