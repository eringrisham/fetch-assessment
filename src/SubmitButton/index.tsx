import React from 'react';
import { FormButton, IconSpan } from './styles.css';
import { AiOutlineSend } from "react-icons/ai";

interface SubmitButtonProps {
	handleSubmit: (e:any) => void;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ handleSubmit }) => (
	<FormButton
		onClick={handleSubmit}
		type="submit"
		value="Send">
		Send
		<IconSpan>
			<AiOutlineSend size={25}/>
		</IconSpan>
	</FormButton>
);
