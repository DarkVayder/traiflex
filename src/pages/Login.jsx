import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Utilities/Firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loadingGif from '../assets/loading.gif';
import BackgroundImage from '../components/BackgroundImage';
import logo from '../assets/logo.png';
import Footer from "../components/Footer"

const Login = () => {
  const [formValues, setFormValues] = React.useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleLogIn = async () => {
    setIsLoading(true);
    try {
      const { email, password } = formValues;
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error.message);
      toast.error('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      {isLoading ? (
        <LoadingContainer>
          <img src={loadingGif} alt="Loading" />
        </LoadingContainer>
      ) : (
        <>
          <BackgroundImage />
          <Logo>
            <img src={logo} alt="Netflix Logo" />
          </Logo>
          <Content>
            <FormContainer>
              <Form>
                <Title>Sign In</Title>
                <Input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={formValues.email}
                  onChange={(e) =>
                    setFormValues({ ...formValues, [e.target.name]: e.target.value })
                  }
                />
                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formValues.password}
                  onChange={(e) =>
                    setFormValues({ ...formValues, [e.target.name]: e.target.value })
                  }
                />
                <Button onClick={handleLogIn} disabled={isLoading}>
                  {isLoading ? <img src={loadingGif} alt="Loading..." /> : 'Log In'}
                </Button>
                <Extras>
                  <RememberMe>
                    <input type="checkbox" id="rememberMe" />
                    <label htmlFor="rememberMe">Remember me</label>
                  </RememberMe>
                  <NeedHelp>
                    <a href=" ">Need help?</a>
                  </NeedHelp>
                </Extras>
                <SignUpLink to="/signup">New here? Sign Up for Traiflex!</SignUpLink>
              </Form>
            </FormContainer>
          </Content>
          <Footer />
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
`;

const Logo = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;

  img {
    height: 1.5rem;
  }
`;

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.75);
  display: grid;
  height: 100vh;
  width: 100vw;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  height: 85vh;

  @media (max-width: 768px) {
    height: 80vh;
    padding: 0 1rem;
  }

  @media (max-width: 480px) {
    height: 75vh;
    padding: 0 0.5rem;
  }
`;

const Form = styled.div`
  gap: 2rem;
  padding: 3rem;
  color: white;
  width: 100%;
  max-width: 450px;
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 8px;

  @media (max-width: 768px) {
    padding: 2rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const Title = styled.div`
  margin-bottom: 1rem;
  h3 {
    color: #fff;
    font-size: 2rem;
    font-weight: 500;

    @media (max-width: 480px) {
      font-size: 1.5rem;
    }
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #333;
  color: #fff;

  @media (max-width: 768px) {
    padding: 0.8rem;
  }

  @media (max-width: 480px) {
    padding: 0.6rem;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #e50914;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #f40612;
  }

  &:disabled {
    background-color: #888;
    cursor: not-allowed;
  }

  img {
    width: 1.5rem;
    height: 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 0.8rem;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.6rem;
    font-size: 0.9rem;
  }
`;

const Extras = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: #b3b3b3;
  font-size: 0.9rem;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const RememberMe = styled.div`
  display: flex;
  align-items: center;

  input {
    margin-right: 0.5rem;
  }

  label {
    cursor: pointer;
  }
`;

const NeedHelp = styled.div`
  a {
    color: #b3b3b3;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SignUpLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  margin-top: 1rem;
  text-align: center;
  display: block;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.75);
`;

export default Login;
