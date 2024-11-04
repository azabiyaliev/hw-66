import { Button, Card, CardActions, CardContent } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { IMeal, IMealAPI } from '../../types';
import { useCallback, useEffect, useState } from 'react';
import axiosAPI from '../../axiosAPI.ts';
import { Grid } from '@mui/joy';
import Typography from '@mui/material/Typography';

const Home = () => {

  const [meals, setMeals] = useState<IMeal[]>([]);

  const fetchData = useCallback(async () => {

    try {
      const response = await axiosAPI.get<IMealAPI>('meal.json');

      if (response.data) {
        const mealsFromAPI = Object.keys(response.data).map((mealKey) => {
          return {
            ...response.data[mealKey],
            id: mealKey,
          };
        });
        setMeals(mealsFromAPI);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  console.log(meals);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between  mb-5">
        <span className="fs-4">Total calories:<b>

        </b></span>
        <Button
          type="button"
          sx={{ width: "10%"}}
          variant="outlined"
          to="/meals/new"
          component={NavLink}
        >
          Add new meal
        </Button>
      </div>
      <Grid container spacing={2}>
        {meals.map((meal) => (
          <Grid sx={{}} xs={12} key={meal.id}>
            <Card sx={{boxShadow: 10, minWidth: 300}}>
              <CardContent sx={{alignSelf: "center"}}>
                <Typography
                  sx={{fontSize: 30, ms: 0, ps: 0,}}
                  variant="body2"
                >{meal.meal}
                </Typography>
                <Typography
                  sx={{fontSize: 30, ms: 0, ps: 0}}
                  variant="body2">
                  {meal.description}
                </Typography>
                <Typography
                  sx={{fontSize: 30, ms: 0, ps: 0}}
                  variant="body2">
                  {` KCal - ${meal.calories}`}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  to={`/meals/${meal.id}/edit`}
                  size="small"
                  component={NavLink}
                >
                  Refactor
                </Button>
                <Button
                  size="small"
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

    </div>
    );
};

export default Home;
