import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {auth, createUserProfileDocumentation } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends React.Component {
    constructor(){
        super();

        this.state={
            displayName: '',
            email:'',
            password:'',
            confirmPassword:''
        }
    }

    handleSubmit = async event => { //async function
        event.preventDefault();

        const {displayName, email, password, confirmPassword} = this.state;

        //check password match with confirm password
        if (password !== confirmPassword){
            alert("Password doesn't match!");
            return;
        }

        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password); //get an user auth object
            
            await createUserProfileDocumentation(user, {displayName});

            this.setState({
                displayName: '',
                email:'',
                password:'',
                confirmPassword:''
            })

        }catch(error){
            console.error(error);
        }


    };

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({ [name]: value});
    };

    render(){
        const {displayName, email, password, confirmPassword} = this.state;
        return(
            <div className='sign-up'>
                <h2 className='title'>I don't have an account</h2>
                <span>Sign up with your email and password</span>

                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput 
                        type='text'
                        name='displayName'
                        handleChange={this.handleChange}
                        value={displayName}
                        label='Display Name'
                        required
                    />

                    <FormInput 
                        type='email'
                        name='email'
                        handleChange={this.handleChange}
                        value={email}
                        label='Email'
                        required
                    />

                    <FormInput 
                        type='password'
                        name='password'
                        handleChange={this.handleChange}
                        value={password}
                        label='Password'
                        required
                    />

                    <FormInput 
                        type='password'
                        name='confirmPassword'
                        handleChange={this.handleChange}
                        value={confirmPassword}
                        label='Comfirm Password'
                        required
                    /> 
                    
                    <CustomButton type='submit'>
                        Create Account
                    </CustomButton>
                    
                </form>

            </div>
        )
    };
}

export default SignUp;
