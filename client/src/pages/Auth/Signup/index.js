import { Flex, Box, Heading, FormControl, FormLabel, Input, Button, Alert } from '@chakra-ui/react'

import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { fetchRegister } from '../../../api'
import { useAuth } from '../../../contexts/AuthContext'
import validationSchema from './Validations'

export default function Signup() {
  const { login } = useAuth()
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const registerResponse = await fetchRegister({ email: values.email, password: values.password})
        login(registerResponse)
        navigate('/profile')
      } catch (e) {
        bag.setErrors({ general: e.response.data.message })
      }
    }
  })

  return (
    <div>
      <Flex align="center" width="full" justifyContent="center">
        <Box pt={10}>
          <Box textAlign="center">
            <Heading>Sign up</Heading>
          </Box>
          <Box my={5}>
            {
              formik.errors.general && (
                <Alert status='error'>
                  {formik.errors.general}
                </Alert>
              )
            }
          </Box>
          <Box my={5} textAlign="left">
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>E-mail</FormLabel>
                <Input 
                  name='email'
                  placeholder='example@example.com'
                  value={formik.values.email} 
                  onChange={formik.handleChange} 
                  onBlur={formik.onBlur}
                  isInvalid={formik.touched.email && formik.errors.email} />
              </FormControl>

              <FormControl mt="4">
                <FormLabel>Password</FormLabel>
                <Input 
                  type="password" 
                  name='password' 
                  placeholder='paSSword123*' 
                  value={formik.values.password} 
                  onChange={formik.handleChange} 
                  onBlur={formik.onBlur}
                  isInvalid={formik.touched.password && formik.errors.password} />
              </FormControl>

              <FormControl mt="4">
                <FormLabel>Password Confirm</FormLabel>
                <Input 
                  type="password"
                  name='passwordConfirm'
                  placeholder='paSSword123*'
                  value={formik.values.passwordConfirm}
                  onChange={formik.handleChange}
                  onBlur={formik.onBlur}
                  isInvalid={formik.touched.passwordConfirm && formik.errors.passwordConfirm} />
              </FormControl>
              <Button mt="4" width="full" type='submit' >Signup</Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  )
}
