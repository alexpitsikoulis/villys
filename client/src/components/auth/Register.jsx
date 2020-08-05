import React, { Component } from "react";

export default class Register extends Component {
	state = {
		name: "",
		email: "",
		password: "",
		password2: "",
		errors: {},
	};

	handleChange = (e) => {
		const copiedState = { ...this.state };
		copiedState[e.target.name] = e.target.value;
		this.setState(copiedState);
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2,
		};

		console.log(newUser);
	};

	render() {
		const { errors } = this.state;

		return (
			<div>
				<h1>Register</h1>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label htmlFor='name'>Name: </label>
						<input
							type='text'
							name='name'
							id='name'
							value={this.state.name}
							onChange={this.handleChange}
						/>
					</div>
					<div>
						<label htmlFor='email'>Email: </label>
						<input
							type='email'
							name='email'
							id='email'
							value={this.state.email}
							onChange={this.handleChange}
						/>
					</div>
					<div>
						<label htmlFor='password'>Password: </label>
						<input
							type='password'
							name='password'
							id='password'
							value={this.state.password}
							onChange={this.handleChange}
						/>
					</div>
					<div>
						<label htmlFor='password2'>Confirm Password: </label>
						<input
							type='password'
							name='password2'
							id='password2'
							value={this.state.password2}
							onChange={this.handleChange}
						/>
					</div>
					<input type='submit' value='Submit' />
				</form>
			</div>
		);
	}
}
