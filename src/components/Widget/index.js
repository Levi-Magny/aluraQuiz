/* eslint-disable linebreak-style */
import styled from 'styled-components';// para que o arquivo reconheça o 'pacote' styled

const Widget = styled.div`// O export serve para que eu consiga importar esse componente em outros arquivos
  margin-top: 24px;
  margin-bottom: 24px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.mainBg};
  border-radius: 4px;
  overflow: hidden;

  h1, h2, h3 {
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
  }
`;

Widget.Header = styled.div`//div que engloba o título
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 18px 32px;
  background-color: ${({ theme }) => theme.colors.primary};

  * {
    margin: 0;
  }
`;

Widget.Content = styled.div`//adicionando alguns estilos para os conteúdos
  padding: 24px 32px 32px 32px;
  text-align: center;
  & > *:first-child {
    line-height: 1.2;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
  ul {
    list-style: none;
    padding: 0;
  }
`;

Widget.Topic = styled.a`
  outline: 0;
  text-align: left;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.contrastText};
  background-color: ${({ theme }) => `${theme.colors.primary}40`};
  padding: 10px 15px;
  margin-bottom: 8px;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: .3s;
  display: block;

  &:hover,
  &:focus {
    opacity: .5;
  }
  
  &[data-disabled="true"] {
    background-color: #4a4a4a;
    opacity: .4;
  }
`;

Widget.Result = styled.div`
  background-color: ${({ theme }) => `${theme.colors.primary}40`};
  padding: 2px 15px;
  margin-bottom: 8px;
  border-radius: ${({ theme }) => theme.borderRadius};
  display: block;

  &[data-correct="true"] {
    background-color: ${({ theme }) => theme.colors.success};
  }

  & > *:first-child {
    color: ${({ theme }) => `${theme.colors.contrastText}`};
    font-size: 14px;
  }
`;
Widget.Warning = styled.div`
  background-color: transparent;
  margin: 10px auto;
  border-radius: 5px;
  border: none;
  padding: 0px 2px;
  width: 95%;

  p {
    color: ${({ theme }) => theme.colors.wrong};
    font-weight: 500;
    margin: 0;
  }
  [data-disabled="false"] {
    display: none;
  }
`;
export default Widget;
