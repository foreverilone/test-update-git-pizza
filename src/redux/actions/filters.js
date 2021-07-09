
//Action Creator - принимает динамические данные и прокидывает в action
export const setSortBy = (name) => ({
  type: 'SET_SORT_BY',
  payload: name,
});


export const setCategory = (catIndex) => ({
  type: 'SET_CATEGORY',
  payload: catIndex,
});