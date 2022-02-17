import React, { Component } from 'react';
import AppNav from '../AppNav/AppNav';
import {Container, Input, Button, Label, Form, FormGroup, Table} from 'reactstrap'
import {Link} from 'react-router-dom'

class Category extends Component {
    constructor(props) {
        super(props) // pass props to Component
        this.state = { 
            // initially upon call, the component is loading and has no category in it
            isLoading : true,
            Categories : [],
            newCategory : {id: -1, name: ""}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let cat = {...this.state.newCategory};
        cat[name] = value;
        this.setState({newCategory: cat});
        console.log(this.state.newCategory);
    }

    async handleSubmit(event){
        const cat = this.state.newCategory;
        await fetch('/api/category', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cat)
        });
        console.log(this.state.Categories);
        event.preventDefault();
        this.props.history.push("/categories");
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
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <label htmlFor='name'>Add New Category</label>
                        <Input type='text' name='name' id='name' onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/">Cancel</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}
 
export default Category;