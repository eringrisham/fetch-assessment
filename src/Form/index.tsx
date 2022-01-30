import React, { useState } from 'react';
import { FormDiv, FormLabel, FormInput, IconSpan } from './styles.css';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { SubmitButton } from '../SubmitButton';
import Select from 'react-select';
import axios from 'axios';

interface FormProps {
	occupations: string[];
	states: string[];
};

export const Form: React.FC<FormProps> = ({ occupations, states }) => {

	const [input, setInput] = useState({name: '', email: '', password: '', occupation: '', state: ''});

	const [togglePassword, setPasswordToggle] = useState(true);

	const sendEmail = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

		axios.post(`https://frontend-take-home.fetchrewards.com/form`, input)
		.then(() => alert('Form received! Thank you.'));
  };

	const handleChange = (e:any) => {
		let target = e.target as HTMLFormElement;
		setInput({...input, [target.name]: target.value});
	}

	const handleSubmit = (e:any) => {
		if (input.name && input.email && input.password && input.occupation && input.state) {
			sendEmail(e);
			setInput({name: '', email: '', password: '', occupation: '', state: ''});
		} else {
			alert('Please fill out all fields before sending.');
		}
	};

	return (
		<FormDiv>
			<form onSubmit={sendEmail}>
				<FormLabel
					aria-labelledby='username'>
					Full Name
				</FormLabel>
				<br/>
				<FormInput
					onChange={handleChange}
					value={input.name}
					type="text"
					name="name"
					aria-label='username'
					placeholder='Full Name'
					required/>
				<br/>
				<FormLabel
					aria-labelledby='email'>
					Your Email
				</FormLabel>
				<br/>
				<FormInput
					onChange={handleChange}
					value={input.email}
					type="text"
					name="email"
					aria-label='email'
					placeholder='Email'
					required/>
				<br/>
				<FormLabel
					aria-labelledby='password'>
					Password
				</FormLabel>
				<br/>
				{togglePassword ? (
					<FormInput
					onChange={handleChange}
					value={input.password}
					type='password'
					name='password'
					aria-label='password'
					placeholder='Password'
					required>
				</FormInput>)
				: (<FormInput
					onChange={handleChange}
					value={input.password}
					type='text'
					name='password'
					aria-label='password'
					placeholder='Password'
					required>
				</FormInput>)}
				<IconSpan>
					<AiFillEyeInvisible
						onClick={() => setPasswordToggle(!togglePassword)}
						size={25}/>
				</IconSpan>
				<br/>
				<FormLabel
					aria-labelledby='occupation'>
					Occupation
				</FormLabel>
				<Select
					onChange={(selectedGroup:any):void => {
						setInput({...input, occupation: selectedGroup.value})
					}}
					aria-label='occupation'
					name="occupation"
					options={occupations}
					placeholder='Select Occupation...'/>
				<br/>
				<FormLabel
					aria-labelledby='state'>
					State
				</FormLabel>
				<Select
					onChange={(selectedGroup:any):void => {
						setInput({...input, state: selectedGroup.value})
					}}
					aria-label='state'
					name="state"
					options={states}
					placeholder='Select State...'/>
				<br/>
				<SubmitButton
					handleSubmit={handleSubmit}/>
			</form>
		</FormDiv>
	);
};
