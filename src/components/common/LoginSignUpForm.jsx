import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LoginSignUpForm = ({ title, input, setInput, btnClick }) => {
  const [btnDisabled, setBtnDisabled] = useState(true);

  // input이 변할때마다 useEffect가 일어나서 유효성검사 실시
  useEffect(() => {
    const emailValid = input.emailInput.includes('@');
    const pwValid = input.pwInput.length >= 8;
    emailValid && pwValid ? setBtnDisabled(false) : setBtnDisabled(true);
  }, [input]);

  // input에 onChange가 일어날 때 마다 input 상태 업데이트
  const handleInputValue = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  return (
    <FormContainer>
      <h1 className='title'>{title}</h1>
      <div className='input-box'>
        <input
          name='emailInput'
          placeholder='이메일을 입력하세요. (@포함)'
          value={input.emailInput}
          onChange={handleInputValue}
        />
        <input
          name='pwInput'
          placeholder='비밀번호를 입력하세요. (8자 이상)'
          value={input.pwInput}
          onChange={handleInputValue}
        />
        {title === '회원가입' && (
          <input
            name='pwCheck'
            placeholder='비밀번호 확인 (8자 이상)'
            value={input.pwCheck}
            onChange={handleInputValue}
          />
        )}
      </div>
      <div className='btn-box'>
        <button onClick={btnClick} disabled={btnDisabled} type='submit'>
          {title === '로그인' ? '로그인하기' : '회원가입하기'}
        </button>
      </div>
      <Link className='link' to={title === '로그인' ? '/signup' : '/'}>
        {title === '로그인' ? '회원가입' : '로그인'}
      </Link>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 370px;
  height: 600px;
  padding: 0 15%;
  background-color: #ffffff;

  .title {
    margin-bottom: 40px;
    font-size: 25px;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    &.input-box {
      width: 100%;
      input {
        margin-bottom: 20px;
        padding-left: 8px;
      }
    }
    &.btn-box {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      button {
        margin-top: 20px;
        background-color: ${(props) => props.theme.color.main};
        &:hover {
          cursor: pointer;
        }
        &:disabled {
          border-color: ${(props) => props.theme.color.mainBg};
          background-color: ${(props) => props.theme.color.mainBg};
        }
      }
    }

    input,
    button {
      width: 100%;
      height: 40px;
      border: 1px solid ${(props) => props.theme.color.main};
      border-radius: 3px;
    }
  }

  .link {
    margin: 20px 0 80px;
    color: ${(props) => props.theme.color.txt};
    font-size: 13px;
  }
`;

export default LoginSignUpForm;
