import React from 'react';
import PropTypes from 'prop-types'; 


// Компонент всегда рендерит одно и то же при неменяющихся пропсах, поэтому обернули
// его в вызов React.memo для повышения производительности в некоторых случаях, мемоизируя тем самым результат. 
// Это значит, что React будет использовать результат последнего рендера, избегая повторного рендеринга.

const Categories = React.memo(function Categories({ activeCategory, items, onClickCategory }) {
  return (
    <div className="categories">
      <ul>
        <li 
          className={activeCategory === null ? 'active' : ''} 
          onClick={()=> onClickCategory(null)}>
          Все
        </li>
        {items && 
          items.map((name, index) => 
            <li 
              className={activeCategory === index ? 'active' : ''}  
              onClick={()=> onClickCategory(index)} 
              key={`${name}_${index}`}>
              {name}
            </li>
          )}
      </ul>
    </div>
  )
});

Categories.propTypes = {
  activeCategory: PropTypes.oneOf([PropTypes.number, null]), 
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickCategory: PropTypes.func.isRequired,
};

Categories.defaultProps = { 
  activeCategory: null, 
  items: [], 
};

export default Categories;


// class Categories extends React.Component {
//   state = {
//     activeCategory: 0,
//     test: 123
//   };

//   onClickCategory = index => {
//     this.setState({
//       activeCategory: index
//     });
//   }


//   render() { 
//     const {items} = this.props;
//     console.log(this.state)
//     return (
//       <div className="categories">
//         <ul>
//             {/* <li >Все</li> */}
//             {items.map((name, index) => 
//               (<li
//                 className={this.state.activeCategory === index ? 'active' : ''} 
//                 onClick={()=> this.onClickCategory(index)} key={`${name}_${index}`}>
//                 {name}
//               </li>
//             ))}
//         </ul>
//       </div>
//     )
//   }
// }