import React, { Component } from 'react';
import AppNav from './AppNav';

class Category extends Component {
    state = { 
        // initially upon call, the component is loading and has no category in it
        isLoading : true,
        Categories : []
     }

     // Communication with backend
     // sync: you send a request and then wait...... for the response
     // async: you send a request and don't have to wait. notified when response received
     async componentDidMount(){
         const response = await fetch('/api/categories');
         const body = await response.json();
         console.log(body);
         this.setState({Categories : body, isLoading : false});
     }

    render() { 
        const {Categories, isLoading} = this.state;
        if (isLoading) 
            return (<div>Loading...</div>);

        const category_list = Categories.map(category =>
            <div key={category.id}>
                {category.name}
            </div>
        )
        return (
            <div>
                <AppNav/>
                <h2>Categories</h2>
                {
                    category_list
                }
            </div>
        );
    }
}
 
export default Category;