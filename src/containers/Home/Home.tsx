import { Button, Card, CardActions, CardContent } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { IMeal, IMealAPI } from '../../types';
import { useCallback, useEffect, useState } from 'react';
import axiosAPI from '../../axiosAPI.ts';
import { Grid } from '@mui/joy';
import Typography from '@mui/material/Typography';
import Loader from '../../components/UI/Loader/Loader.tsx';
import { toast } from 'react-toastify';

const Home = () => {

  const [meals, setMeals] = useState<IMeal[]>([]);
  const [loading, setLoading] = useState(false);


  const fetchData = useCallback(async () => {

    try {
      setLoading(true);
      const response: {data: IMealAPI | null } = await axiosAPI.get<IMealAPI>('meal.json');
      const mealsList = response.data;

      if (mealsList === null) {
        setMeals([]);
        return;
      }

      const mealsFromList = mealsList;

      const mealsFromAPI = Object.keys(mealsFromList).map((mealKey) => {

        return {
          ...mealsFromList[mealKey],
          id: mealKey,
        };
      });
      setMeals(mealsFromAPI);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const deleteMeal = async (id:string) => {
    try {
      setLoading(true);
      await axiosAPI.delete(`meal/${id}.json`);
      await fetchData();
      toast.success('Meal successfully deleted');
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const totalCalories = meals.reduce((acc, calorie) => acc + Number(calorie.calories), 0);

  return (
    <>
      {loading ? (<Loader/>) : (
        <div>
          <div className="d-flex align-items-center justify-content-between  mb-5">
            <span className="fs-4">Total calories:<b> {totalCalories} </b></span>
            <Button
              type="button"
              sx={{width: "10%"}}
              variant="outlined"
              to="/meals/new"
              component={NavLink}
            >
              Add new meal
            </Button>
          </div>
          <Grid container spacing={2}>
            {meals.map((meal) => (
              <Grid xs={12} key={meal.id}>
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
                      onClick={() => deleteMeal(meal.id)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

        </div>
      )}
    </>
  );
};

export default Home;
