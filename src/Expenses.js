import React, { Component } from 'react';
import AppNav from './AppNav';
import DatePicker from 'react-datepicker';
import {Container, Input, Button, Label, Form, FormGroup, Table} from 'reactstrap'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'

import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

class Expenses extends Component {

    emptyExpense = {
        id: -1,
        expensedate: new Date(),
        description: '',
        location: '',
        category: {id: 1, name: "Travel"}
    }

    constructor(props) {
        super(props) // pass props to Component
        this.state = { 
            date: new Date(),
            isLoading: true,
            expense: this.emptyExpense,
            categories: [],
            expenses: [],
         }
         this.handleSubmit = this.handleSubmit.bind(this);
         this.handleChange = this.handleChange.bind(this);
         this.handleDateChange = this.handleDateChange.bind(this);
         this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }
    

     async componentDidMount() {
         const response = await fetch('/api/categories');
         const body = await response.json();

         this.setState({categories : body, isLoading : false});

         const responseExp = await fetch('/api/expenses');
         const bodyExp = await responseExp.json();

         this.setState({expenses : bodyExp, isLoading : false});
     }

     async handleSubmit(event) {
         const expense = this.state.expense;
         await fetch('/api/expense', {
             method: 'POST',
             headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(expense)
         });
         console.log(this.state);
         event.preventDefault();
         this.props.history.push("/expenses");
     }

     async handleCategoryChange(event) {
         try {
            const target = event.target;
            const name = encodeURI(target.value);
            const response = await fetch(`/api/category/name/${name}`, {
                headers: {
                    'Accept': 'application/json'
                }
            });
            const body = await response.json();
            console.log(body);
            this.setState(state => {
                return {
                    expense : {
                        ...state.expense,
                        category : body
                    }
                }
            });
            console.log(this.state.expense);
         } catch (error) {
             console.log(error);
         }
    }

     async handleChange(event) {
         const target = event.target;
         const value = target.value;
         const name = target.name;
         let exp = {...this.state.expense};
         exp[name] = value;
         this.setState({expense: exp});
         console.log(this.state.expense);
     }

     async handleDateChange(date) {
        let exp = {...this.state.expense};
        exp.expensedate = date;
        this.setState({expense: exp});
        console.log(this.state.expense);
    }

     async remove(id) {
         await fetch(`api/expense/${id}`, {
             method: 'DELETE',
             headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application.json'
             }
         }).then(
             () => {
                 let updatedExpenses = [...this.state.expenses].filter(i => i.id !== id);
                 this.setState({expenses : updatedExpenses});
             }
         )
     }

    render() { 
        const title = <h3> Add Expense </h3>;
        const {categories} = this.state;
        const {expenses, isLoading} = this.state;

        if (isLoading) 
            return (<div>Loading...</div>);
        
        let optionList = 
            categories.map( (category) =>
                <option key={category.id}>
                    {category.name}
                </option>
            )
        
        let expense_table_rows =
            expenses.map( (exp) =>
                <tr key={exp.id}>
                    <td>{exp.description}</td>
                    <td>{exp.location}</td>
                    <td><Moment date={exp.expensedate} format="YYYY/MM/DD"/></td>
                    <td>{exp.category.name}</td>
                    <td><Button size='sm' color='danger' onClick={() => this.remove(exp.id)}>Delete</Button></td>
                </tr>
            )
        return (
        <div>
            <AppNav/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <label htmlFor="description">Description</label>
                        <input type="text" name="description" id="description" onChange={this.handleChange} autoComplete='description'/>
                    </FormGroup>

                    <FormGroup>
                        <label htmlFor="category">Category</label>
                        <select onChange={this.handleCategoryChange} id='category' value={this.state.expense.category.name}>
                            {optionList}
                        </select>
                    </FormGroup>

                    <FormGroup>
                        <label htmlFor="expenseDate">Expense Date</label>
                        <DatePicker selected={this.state.expense.expensedate} onChange={this.handleDateChange}/>
                    </FormGroup>

                    <div className='row'>
                        <FormGroup className='col-md-4 mb-3'>
                            <Label htmlFor="location">Location</Label>
                            <Input type='text' name='location' id='location' onChange={this.handleChange}/>
                        </FormGroup>
                    </div>

                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/">Cancel</Button>
                    </FormGroup>

                </Form>
            </Container>
            {''}
            <Container>
                <h3>Expense List</h3>
                <Table className='mt-4'>
                    <thead>
                        <tr>
                            <th width="20%">Description</th>
                            <th width="10%">Location</th>
                            <th width="10%">Date</th>
                            <th >Category</th>
                            <th width="10%">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expense_table_rows}
                    </tbody>
                </Table>
            </Container>
        </div>
        );
    }
}
 
export default Expenses;