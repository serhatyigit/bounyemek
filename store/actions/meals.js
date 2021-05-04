export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
export const TOGGLE_NOTIFSETTING = "TOGGLE_NOTIFSETTING";

export const toggleFavorite = (id) => {
  return { type: TOGGLE_FAVORITE, mealId: id };
};

export const toggleNotifSetting = (notifSetting) => {
  return { type: TOGGLE_NOTIFSETTING, notifSetting: notifSetting };
};
