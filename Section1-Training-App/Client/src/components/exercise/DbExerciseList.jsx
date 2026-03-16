import "./dbExerciseList.css";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contextAPI/AuthContext";
import { ToastContext } from "../../contextAPI/ToastContext";
import FormInput from "../FormInput";
import ExerciseTab from "./ExerciseTab";
import QueryNameFilter from "./QueryNameFilter";

export default function DbExerciseList({ handleAddExercise }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { authState, authDispatch } = useContext(AuthContext);
  const { toastState, toastDispatch } = useContext(ToastContext);

  const [exerciseList, setExerciseList] = useState([]);

  const [queryName, setQueryName] = useState("");
  const [queryFilter, setQueryFilter] = useState({
    bodyParts: [],
    equipments: [],
    exerciseTypes: [],
  });

  const handleToggleCategoryItem = (category, element) => {
    setQueryFilter((prevQuery) => {
      const isSelected = prevQuery[category].includes(element);

      return {
        ...prevQuery,
        [category]: isSelected
          ? prevQuery[category].filter((item) => item !== element)
          : [...prevQuery[category], element],
      };
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    const getExercises = setTimeout(async () => {
      try {
        const url = new URL(`${apiUrl}/exercises`);

        if (queryName) url.searchParams.append("name", queryName);

        for (const category in queryFilter) {
          if (queryFilter[category].length > 0)
            url.searchParams.append(category, queryFilter[category].join(","));
        }

        const res = await fetch(url.toString(), {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
          credentials: "include",
          signal: controller.signal,
        });

        const results = await res.json();

        setExerciseList(results.data);
      } catch (error) {
        toastDispatch({
          type: "error",
          payload: {
            message: error.message || "Something went wrong!",
          },
        });
      }
    }, 300);

    return () => {
      controller.abort();
      clearTimeout(getExercises);
    };
  }, [queryName, apiUrl, authState.token, toastDispatch, queryFilter]);

  return (
    <div className="exercise-list-db">
      <div className="query-search">
        <FormInput
          label={"exercise-name"}
          type={"text"}
          value={queryName}
          handleChange={(e) => setQueryName(e.target.value)}
        />
        <QueryNameFilter
          queryFilter={queryFilter}
          handleToggle={handleToggleCategoryItem}
        />
      </div>
      <div className="list custom-scrollbar">
        {exerciseList &&
          exerciseList.map((exercise) => (
            <ExerciseTab
              key={exercise._id}
              exerciseName={exercise.name}
              exerciseBodyParts={exercise.bodyParts}
              selectable={true}
              exercise={exercise}
              handleAction={handleAddExercise}
            />
          ))}
      </div>
    </div>
  );
}
