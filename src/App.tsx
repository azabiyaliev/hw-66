import NavBar from "./components/NavBar/NavBar.tsx";
import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home/Home.tsx';
import Typography from '@mui/material/Typography';
import NewEditFood from './containers/NewEditFood/NewEditFood.tsx';

const App = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <Container maxWidth="xl">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/meals/new" element={<NewEditFood/>}/>
          <Route path="/meals/:idMeal/edit" element={<NewEditFood/>}/>
          <Route
            path="*"
            element={<Typography variant="h3">Not found</Typography>}
          />
        </Routes>
      </Container>
    </>
  );
};

export default App;
