import { allList, lunchList, dinnerList } from "../../data/mealData";
import { TOGGLE_FAVORITE, TOGGLE_NOTIFSETTING } from "../actions/meals";

const initialState = {
  allMeals: allList,
  favoriteMeals: [],
  lunchList: lunchList,
  dinnerList: dinnerList,
  notifyAtOnlyFavs: false,
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const acitonId = action.mealId;
      const existingIndexInFavs = state.favoriteMeals.findIndex((meal) => meal.id === acitonId);
      const existingIndexInAll = state.allMeals.findIndex((meal) => meal.id === acitonId);
      const existingIndexInLunch = state.lunchList.findIndex((meal) => meal.id === acitonId);
      const existingIndexInDinner = state.dinnerList.findIndex((meal) => meal.id === acitonId);

      if (existingIndexInFavs >= 0) {
        // Updated Copy of Selected Meal
        const selectedMeal = { ...state.favoriteMeals[existingIndexInFavs] };
        selectedMeal.isFav = false;

        // Update Lists
        const updatedFavMeals = [...state.favoriteMeals];
        updatedFavMeals.splice(existingIndexInFavs, 1);

        const updatedAllMeals = [...state.allMeals];
        updatedAllMeals[existingIndexInAll].isFav = false;

        const updatedLunchList = [...state.lunchList];
        if (existingIndexInLunch >= 0) {
          updatedLunchList[existingIndexInLunch].isFav = false;
        }

        const updatedDinnerList = [...state.dinnerList];
        if (existingIndexInDinner >= 0) {
          updatedDinnerList[existingIndexInDinner].isFav = false;
        }

        return {
          ...state,
          allMeals: updatedAllMeals,
          favoriteMeals: updatedFavMeals,
          lunchList: updatedLunchList,
          dinnerList: updatedDinnerList,
        };
      } else {
        const meal = {
          ...state.allMeals.find((meal) => meal.id === action.mealId),
        };
        meal.isFav = true;

        // Update Lists
        const updatedFavMeals = [...state.favoriteMeals].concat(meal);

        const updatedAllMeals = [...state.allMeals];
        updatedAllMeals[existingIndexInAll].isFav = true;

        const updatedLunchList = [...state.lunchList];
        if (existingIndexInLunch >= 0) {
          updatedLunchList[existingIndexInLunch].isFav = true;
        }

        const updatedDinnerList = [...state.dinnerList];
        if (existingIndexInDinner >= 0) {
          updatedDinnerList[existingIndexInDinner].isFav = true;
        }

        return {
          ...state,
          allMeals: updatedAllMeals,
          favoriteMeals: updatedFavMeals,
          lunchList: updatedLunchList,
          dinnerList: updatedDinnerList,
        };
      }
    case TOGGLE_NOTIFSETTING:
      return { ...state, notifyAtOnlyFavs: action.notifSetting };
    default:
      return state;
  }
};

export default mealsReducer;
