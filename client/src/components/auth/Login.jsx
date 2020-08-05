import React, { Component } from "react";

class Login extends Component {
	state = {
		email: "",
		password: "",
		errors: {},
	};

	handleChange = (e) => {
		const copiedState = { ...this.state };
		copiedState[e.target.name] = e.target.value;
		this.setState(copiedState);
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const userData = {
			email: this.state.email,
			password: this.state.password,
		};
	};

	render() {
		const { errors } = this.state;

		return (
			<div>
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label htmlFor='email'>Email: </label>
						<input
							type='text'
							name='email'
							id='email'
							value={this.state.email}
							onChange={this.handleChange}
						/>
					</div>
					<div>
						<label htmlFor='password'>Password: </label>
						<input
							type='text'
							name='password'
							id='password'
							value={this.state.password}
							onChange={this.handleChange}
						/>
					</div>
					<input type='submit' value='Submit' />
				</form>
			</div>
		);
	}
}

export default Login;
