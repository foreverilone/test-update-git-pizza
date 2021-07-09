import axios from "axios";

export const setLoaded = payload => ({
  type: 'SET_LOADED',
  payload,
});

// метод только для получения и сохранения пицц
// с помощью redux thunk дожидается запроса и сохраняет данные в редакс
export const fetchPizzas = (category, sortBy) => (dispatch) => { //fetchPizzas асинхронный action(функция вызывает функцию)
  dispatch({
    type: 'SET_LOADED',
    payload: false,
  }); //получает обьект, делает флаг false, отправляет редаксу
  
  axios
    .get(
      `/pizzas?${category !== null ? `category=${category}` : ''
      }&_sort=${sortBy.type}&_order=${sortBy.order}`)
    .then(({ data }) => {
      dispatch(setPizzas(data)) // сохраняет пиццы и ставит флаг isLoaded: true
  });
};


//метод только для сохранения пицц
export const setPizzas = (items) => ({
  type: 'SET_PIZZAS',
  payload: items,
});