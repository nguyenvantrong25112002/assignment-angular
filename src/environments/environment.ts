const DOMAIN =`http://127.0.0.1:8000`;
const API = `api`;
const API_ADMIN = `api/admin`;
export const environment = {
  production: false,
  SUBJECT_API :`${DOMAIN}/${API}/subject`,
  QUIZ_API :`${DOMAIN}/${API}/quiz`,
  QUESTION_API :`${DOMAIN}/${API}/question`,
  STUDENT_QUIZ_API :`${DOMAIN}/${API}/student-quiz`,
  STUDENT_API :`${DOMAIN}/${API}/student`,


  SUBJECT_API_ADMIN :`${DOMAIN}/${API_ADMIN}/subject`,
  QUIZ_API_ADMIN :`${DOMAIN}/${API_ADMIN}/quiz`,
  QUESTION_API_ADMIN :`${DOMAIN}/${API_ADMIN}/question`,
  ANSWER_API_ADMIN :`${DOMAIN}/${API_ADMIN}/question`,
  STUDEN_QUIZ_API_ADMIN :`${DOMAIN}/${API_ADMIN}/student-quiz`,
  STUDEN_API_ADMIN :`${DOMAIN}/${API_ADMIN}/student`,

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 
  firebase: {
    apiKey: 'AIzaSyCVoQKFdmYkrhU2SUxrt9bCpZOBTLUVgNw',
    authDomain: 'bezkoder-firebase.firebaseapp.com',
    databaseURL: 'https://bezkoder-firebase.firebaseio.com',
    projectId: 'bezkoder-firebase',
    storageBucket: 'bezkoder-firebase.appspot.com',
    messagingSenderId: 'AIzaSyCVoQKFdmYkrhU2SUxrt9bCpZOBTLUVgNw',
    appId: '1:487386097986:web:a7c503d7b8b4ca559a40db'
  },

  GOOGLE_CLIENT_ID :'398932136240-0oq8icbna7ir10m6dg2ld1882fuhdrbc.apps.googleusercontent.com'
};


