import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { Box, Stack, Typography } from "@mui/material";

import { exerciseOptions, fetchData } from "../utils/fetchData";
import ExerciseCard from "./ExerciseCard";

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 9;

  useEffect(() => {
    const fetchExerciseData = async () => {
      let exercisesData = [];

      if (bodyPart === "all") {
        exercisesData = await fetchData(
          "https://exercisedb.p.rapidapi.com/exercises",
          exerciseOptions
        );
      } else {
        exercisesData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
          exerciseOptions
        );
      }

      setExercises(exercisesData);
    };

    fetchExerciseData();
  }, [bodyPart, setExercises]);

  const [currentExercises, setCurrentExercises] = useState([]);

  useEffect(() => {
    try {
      if (Array.isArray(exercises)) {
        const indexOfLastExercise = currentPage * exercisesPerPage;
        const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
        const currentExercises = exercises.slice(
          indexOfFirstExercise,
          indexOfLastExercise
        );

        setCurrentExercises(currentExercises);
      }
    } catch (error) {
      console.error(error);
    }
  }, [currentPage, exercises]);

  const Paginate = (e, value) => {
    setCurrentPage(value);

    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

  return (
    <Box id="exercises" sx={{ mt: { lg: "110px" } }} mt="50px" p="20px">
   <Typography
  color="rgb(15, 123, 181)"
  variant="h3"
  mb="46px"
  textAlign="center"
  sx={{
    fontSize: { lg: '44px', xs: '30px' },
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    padding: '20px 0',
    borderBottom: '2px solid rgb(15, 123, 181)',
    bgcolor: 'white',
  }}
>
  Showing Results
</Typography>
      <Stack
        direction="row"
        sx={{ gap: { lg: "110px", xs: "50px" } }}
        flexWrap="wrap"
        justifyContent="center"
      >
        {currentExercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </Stack>
      <Stack mt="100px" alignItems="center">
        {exercises.length > exercisesPerPage && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={Paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;