/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGalera({ dbExterno, playerName }) {
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen
        externalQuestions={dbExterno.questions}
        externalBg={dbExterno.bg2 || dbExterno.bg}
        playerName={playerName}
      />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const [projectName, userName, playerName] = context.query.id.split('___');
  const url = (projectName === 'self'
    ? 'https://quiz-justiceleague.levi-magny.vercel.app/api/db'
    : `https://${projectName}.${userName}.vercel.app/api/db`);

  const dbExterno = await fetch(url)
    .then((respostaDoServer) => {
      if (respostaDoServer.ok) {
        return respostaDoServer.json();
      }
      throw new Error('Falha ao pegar os dados');
    })
    .then((respostaConvertidaEmObjeto) => respostaConvertidaEmObjeto)
    .catch((err) => {
      console.log(err);
    });

  // console.log(dbExterno);
  console.log('Infos que o Next dá para nos:', context.query.id);

  return {
    props: {
      dbExterno,
      playerName,
    },
  };
}
