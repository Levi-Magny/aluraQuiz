import styled from 'styled-components'
import db from '../db.json';
import Widget from '../src/components/Widget'
import QuizBackground from '../src/components/QuizBackground'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import Head from 'next/head'

// const Title = styled.h1`
//   font-size: 50px;
//   color: ${({ theme }) => theme.colors.primary};
// `

// const BackgroundImage = styled.div` //crase: é uma tagged function
//   background-image: url(${db.bg});
//   flex: 1;
//   background-size: cover;
//   background-position:center;
// `;

export const QuizContainer = styled.div`//container que conterá o quiz
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin:auto;
    padding: 15px;
  }
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>{db.title}</title>
        <meta property="og:title" content={db.title} />
        <meta property="og:image" content={db.bg} />
        <meta property="og:description" content={db.description} />
      </Head>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <Widget>
            <Widget.Header>
                <h1>{db.title}</h1>
              </Widget.Header>
            <Widget.Content>
              <p>{db.description}</p>
            </Widget.Content>
          </Widget>
          <Widget>
            <Widget.Content>
              <h1>Quizes da Galera</h1>
              <p>lorem ipsum dolor sit amet...</p>
              </Widget.Content>
          </Widget>
          <Footer />
        </QuizContainer>
        <GitHubCorner />
      </QuizBackground>
    </>
  );
}
