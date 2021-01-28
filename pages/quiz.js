/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
// import { useRouter } from 'next/router';// hook do Next.js para rotas

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Button from '../src/components/Button';

function LoadWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando
      </Widget.Header>

      <Widget.Content>
        [Desafio do Loading...]
      </Widget.Content>
    </Widget>
  );
}
// Função que gera o widget de questão
function QuestionWidget({ questionIndex, question, totalQuestions }) {
  return (
    <Widget>
      <Widget.Header>
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          Título
        </h2>
        <p>
          Descrição
        </p>
        <Button>
          Confirmar
        </Button>
      </Widget.Content>
    </Widget>
  );
}

export default function Quiz() {
  const totalQuestions = db.questions.length;
  const question = db.questions[0];
  const questionIndex = 0;

  return (
    <QuizBackground backgroundImage={db.bg2}>
      <QuizContainer>
        <QuizLogo />
        <QuestionWidget
          questionIndex={questionIndex}
          question={question}
          totalQuestions={totalQuestions}
        />
        <LoadWidget />
      </QuizContainer>
    </QuizBackground>
  );
}
