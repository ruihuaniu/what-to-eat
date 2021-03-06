import { createSlice } from "@reduxjs/toolkit";
import { CombinedMenus, combinedMenus } from "../constants/menus";

enum Menus {}

const menuKeys = Object.keys(combinedMenus);
interface MenusState {
  menus: CombinedMenus;
  menuKey: string;
  menuIndex: number;
  clickedCount: number;
  // randomIndex: number;
  editMealGroupStatus: { [key: string]: boolean };
}

const initialState: MenusState = {
  menus: combinedMenus,
  menuKey: menuKeys[0],
  menuIndex: 0,
  clickedCount: 0,
  // randomIndex: -1,
  editMealGroupStatus: {},
};

export const menusSlice = createSlice({
  name: "meal",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      //const keys = Object.keys(state.menus);
      // state.menuKey =
      //   keys[
      //     keys.indexOf(state.menuKey) < keys.length - 1
      //       ? keys.indexOf(state.menuKey) + 1
      //       : 0
      //   ];
      state.menuIndex =
        state.menuIndex < menuKeys.length - 1 ? state.menuIndex + 1 : 0;
      state.menuKey = menuKeys[state.menuIndex];
    },
    addMenu: (state) => {},
    toggleMenuEditStatus: (state, action) => {
      state.editMealGroupStatus[action.payload] =
        !!!state.editMealGroupStatus[action.payload];
    },
    addMeal: (state, action) => {
      console.log(action.payload, !state.menus[action.payload.key]);
      if (!state.menus[action.payload.key]) {
        state.menus[action.payload.key] = [action.payload.value];
      }
      if (
        state.menus[action.payload.key].indexOf(action.payload.value) === -1
      ) {
        state.menus[action.payload.key].push(action.payload.value);
      }
    },
    deleteMeal: (state, action) => {
      console.log(action, action.payload);
      state.menus[action.payload.key] = state.menus[action.payload.key].filter(
        (item, index) => index !== +action.payload.index
      );
    },
    updateClickedCount: (state) => {
      state.clickedCount += 1;
    },
    resetClickedCount: (state) => {
      state.clickedCount = 0;
    },
    updateRandomIndex: (state) => {
      //state.randomIndex = ;
    },
  },
});

export const {
  toggleMenu,
  addMeal,
  deleteMeal,
  updateClickedCount,
  resetClickedCount,
  toggleMenuEditStatus,
} = menusSlice.actions;

export default menusSlice.reducer;
