const initialState = {
  items: {},
  totalPrice: 0, // стоимость всех пицц, добавленных в корзину
  totalCount: 0, // количество всех пицц, добавленных в корзину
};

const getTotalPrice = arr => arr.reduce((sum,obj) => obj.price + sum, 0);

const _get = (obj, path) => {
  const [firstKey, ...keys] = path.split('.');
  return keys.reduce((val,key) => {
    return val[key];
  }, obj[firstKey]);
};

const getTotalSum = (obj, path) => {
  return Object.values(obj).reduce(
    (sum, obj) => {
      const value = _get(obj, path);
      return sum + value;
    }, 
  0)
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PIZZA_CART':

      // если такого ключа нет, то создает в items и указывает,
      // что будет один массив(у которого 1 обьект) и 
      // он помещается в cart.items, но если такой ключ есть,
      // то пересоздает массив, берет все старые значения (...state.items[action.payload.id].items)
      // и в конец добавляет новый обьект
      const currentPizzaItems = !state.items[action.payload.id] 
        ? [action.payload] 
        :[...state.items[action.payload.id].items, action.payload]; //динамически изменяемые свойства нужно брать в квадр скобки

      // в newItems хранятся актуальные значения
      const newItems = {
        ...state.items,

        // если в items по этому id ничего нет, то создает массив с обьектом, 
        // иначе берет все старые значения из state.items[action.payload.id] и добавляет в конец новое action.payload
        [action.payload.id]: {
          items: currentPizzaItems, 
          totalPrice: getTotalPrice(currentPizzaItems),
        },
      };


      const totalPrice = getTotalSum(newItems, 'totalPrice');
      const totalCount = getTotalSum(newItems, 'items.length');

      return {
        ...state,
        items: newItems,
        totalCount: totalCount, 
        totalPrice,
      };

    case 'REMOVE_CART_ITEM':{
      const newItems = {
        ...state.items,
      }; //сгенерировался новый обьект всех пицц
      const currentTotalPrice = newItems[action.payload].totalPrice; // перед удалением пиццы получил ее TotalPrice
      const currentTotalCount = newItems[action.payload].items.length;
      delete newItems[action.payload]; // удалилась эту группа пицц
      return {
        ...state,
        items: newItems, 
        totalPrice: state.totalPrice - currentTotalPrice, // удалилась из итог.цены корзины итог.цену группы пицц, сохранился в итог.сумме корзины totalPrice результат
        totalCount: state.totalCount - currentTotalCount,
      };
    }

    case 'PLUS_CART_ITEM':{
      const newObjItems = [
        ...state.items[action.payload].items,
        state.items[action.payload].items[0]
      ];
      
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems, 
          totalPrice: getTotalPrice(newObjItems),
        },
      }; 
      
      const totalPrice = getTotalSum(newItems, 'totalPrice');
      const totalCount = getTotalSum(newItems, 'items.length');

      return {
        ...state,
        items: newItems, 
        totalCount,
        totalPrice
      };}

    case 'MINUS_CART_ITEM':{
      const oldItems = state.items[action.payload].items;
      const newObjItems = oldItems.length > 1 ? 
        state.items[action.payload].items.slice(1) 
        : oldItems;
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems, 
          totalPrice: getTotalPrice(newObjItems),
        },
      }; 

      
      const totalPrice = getTotalSum(newItems, 'totalPrice');
      const totalCount = getTotalSum(newItems, 'items.length');
      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice
        };
    }

    case 'CLEAR_CART':
      return {
        items: {}, 
        totalPrice: 0,
        totalCount: 0,
      };

    default:
      return state;
    }
}

export default cart;
