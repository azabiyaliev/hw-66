import Box from '@mui/material/Box';
import { Button, FormControl, InputLabel, NativeSelect, TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { IMeal, IMealForm } from '../../types';
import axiosAPI from '../../axiosAPI.ts';
import { useNavigate, useParams } from 'react-router-dom';

const categories = [
  {title: "Breakfast", id: "breakfast" },
  {title: "Snack", id: "snack" },
  {title: "Lunch", id: "lunch" },
  {title: "Dinner", id: "dinner" },
];

const initialForm = {
  meal: "",
  description: "",
  calories: 0
};

const NewEditFood = () => {

  const [form, setForm] = useState<IMealForm>({...initialForm});
  const navigate = useNavigate();
  const params = useParams<{ idMeal: string }>();
  console.log(params);

    const fetchMeal = useCallback(async (id: string) => {
      try {
        const response: { data: IMeal } = await axiosAPI<IMeal>(
          `meal/${id}.json`,
        );
        if (response.data) {
          setForm(response.data);
        }
      } catch (e) {
        console.log(e);
      }
    }, []);

    useEffect(() => {
      if(params.idMeal) {
        void fetchMeal(params.idMeal);
      }
    }, [params.idMeal, fetchMeal]);


  const onChangeField = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (params.idMeal) {
        await axiosAPI.put(`meal/${params.idMeal}.json`, { ...form });
        setForm(initialForm);
      } else {
        await axiosAPI.post("meal.json", { ...form });
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <form onSubmit={submitForm}>
      <h1 style={{textAlign: "left", paddingTop: "30px"}}>
        Add / edit meal
      </h1>
      <Box
        sx={{
          py: 3,
          display: "grid",
          gap: 2,
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        <Box sx={{maxWidth: 200}}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Choose page
            </InputLabel>
            <NativeSelect
              required
              name="meal"
              value={form.meal}
              aria-selected={true}
              onChange={onChangeField}
            >
              {categories.map((category) => (
                <option key={category.title} value={category.title}>{category.title}</option>
              ))}
            </NativeSelect>
          </FormControl>
        </Box>
        <TextField
          sx={{me: "auto", width: "50%"}}
          name="description"
          id="outlined-multiline-static"
          label="Meal description"
          value={form.description}
          multiline
          rows={4}
          onChange={onChangeField}
        />
        <TextField
          sx={{me: "auto", maxWidth: 200 }}
          type="number"
          id="outlined-basic"
          label="Calories"
          name="calories"
          variant="outlined"
          value={form.calories}
          onChange={onChangeField}
          InputProps={{
            inputProps: {
              min: 0,
            }
          }}
        />
        <Button
          type="submit"
          sx={{me: "auto", width: "5%"}}
          color="inherit"
          variant="outlined"
        >
          Save
        </Button>
      </Box>
    </form>
  );
};

export default NewEditFood;