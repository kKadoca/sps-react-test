import { isAxiosError } from 'axios';

function handleError(error, redirect = false) {
  if (isAxiosError(error)) {
    if (error.response?.status === 400) {
      console.log('Esse e-mail já existe.');
    } else if (error.response?.status === 401) {
      if (redirect) {
        window.location.href = '/login';
      } else {
        console.log('E-mail ou senha inválidos!');
      }
    } else {
      alert('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.');
    }
  } else {
    alert('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.');
  }
}

export default handleError;