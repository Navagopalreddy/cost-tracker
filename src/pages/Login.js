import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice';
import { Box, Button, Input, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');
    setSuccess('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      };

      localStorage.setItem('user', JSON.stringify(user));
      dispatch(setUser(user));
      setSuccess('Login successful!');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box maxW="400px" mx="auto" p={5}>
      <Heading mb={4} textAlign="center">Login</Heading>
      <Input placeholder="Email" mb={3} value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" mb={3} value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button colorScheme="blue" width="full" onClick={handleLogin}>Login</Button>
      {error && <Text color="red.500" mt={3}>{error}</Text>}
      {success && <Text color="green.500" mt={3}>{success}</Text>}
    </Box>
  );
};

export default Login;
