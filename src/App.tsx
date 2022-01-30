import React, { useState, useEffect } from 'react';
import { TitleDiv } from './styles.css';
import { Form } from './Form';
import axios from 'axios';
import './App.css';

export const App: React.FC = () => {

  const [occupations, setOccupations] = useState([]);
  const [states, setStates] = useState([]);

  //fetches occupation and state data upon page load
  useEffect(() => {
    axios.get(`https://frontend-take-home.fetchrewards.com/form`)
    .then(({data}) => {

      let mappedOccupations = data.occupations.map((occupation: string) => ({value: occupation, label: occupation}));

      let mappedStates = data.states.map((state: { name: string; abbreviation: string }) => ({value: state.name, label: state.name}));

      setOccupations(mappedOccupations);
      setStates(mappedStates);
    });
  }, []);

  return (
    <>
      <TitleDiv>
        Fetch Rewards Front End Assessment
      </TitleDiv>
      <Form occupations={occupations} states={states}/>
    </>
  );
};
