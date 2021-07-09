import React from 'react';

import { Header } from "./components";
import { Home, Cart } from "./pages";
import { Route } from "react-router-dom";


function App() {
  return (
      <div className="wrapper">
        <Header /> 
        <div className="content">
          <Route path="/" component={ Home } exact />
          <Route path="/cart" component={ Cart } exact />
        </div>
      </div>
    );
}

export default App;



// import { connect } from 'react-redux';

// export default connect(
//   (state) => {
//     return {
//       items: state.pizzas.items,
//       filters: state.filters,
//     };
//   },
//   (dispatch) => {
//     return {
//       setPizzas: (items) => dispatch(setPizzas(items)),
//     };
//   },
// )(App);




// import { setPizzas as setPizzasAction } from './redux/actions/pizzas';

// function App() {
//   const [pizzas, setPizzas] = React.useState([]);

//   React.useEffect(() => { 
//     axios.get('http://localhost:3001/db.json')
//     .then(({ data }) => {
//       setPizzas(data.pizzas);
//     });
//   }, [])

//   return (
//     <div className="wrapper">
//       <Header /> 
//       <div className="content">
//         <Route exact path="/" render={() => <Home items={pizzas} />} />
//         <Route exact path="/cart" component={Cart} />
//       </div>
//     </div>
//   );
// }

// class App extends React.Component {
//   componentDidMount() {
//     axios.get('http://localhost:3001/db.json')
//     .then(({ data }) => {
//       this.props.setPizzas(data.pizzas); 
//     });
//   }

//   render() {
//     console.log(this.props)
//     return (
//       <div className="wrapper">
//         <Header /> 
//         <div className="content">
//           <Route exact path="/" render={() => <Home items={this.props.items} />} />
//           <Route exact path="/cart" component={Cart} />
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     items: state.pizzas.items,
//     filters: state.filters,
//   }
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     setPizzas: (items) => dispatch(setPizzasAction(items)),
//   };
// }

// const mapDispatchToProps = {
//   setPizzas, //сам обернет в dispatch и верет в пропсах в виде функции
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App);
