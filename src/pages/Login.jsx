import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Title from '../components/common/Title';
import LoginSignUpForm from '../components/common/LoginSignUpForm';
import { logInApi } from '../apis/auth';
import setHeaderToken from '../util/auth';

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({ emailInput: '', pwInput: '' });

  const clickLoginBtn = async (body) => {
    try {
      const res = await logInApi(body);
      const accessToken = res.access_token;
      localStorage.setItem('token', accessToken);
      setHeaderToken();
      alert(`로그인되었습니다`);
      navigate('/todo');
    } catch (error) {
      alert(`인증 에러 : ${error.response.data.message}`);
    }
  };

  return (
    <>
      <Title />
      <LoginSignUpForm
        title='로그인'
        input={input}
        setInput={setInput}
        btnClick={() => clickLoginBtn({ email: input.emailInput, password: input.pwInput })}
      />
    </>
  );
};

export default Login;
