import React, { useState, useEffect } from 'react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Box,
  Input,
  Button,
  Textarea,
  FormLabel,
  FormControl,
  FormHelperText,
  FormErrorMessage
} from '@chakra-ui/react'

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(10)
})

export const ProductForm = ({
  product,
  onSubmit
}) => {
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) })

  useEffect(() => {
    if (product !== null && product !== undefined) {
      Object.keys(product).map((key) => {
        setValue(key, product[key])
      })
    }
  }, [product])

  return (
    <Box
      bg='white'
      padding={4}
      borderRadius={4}
    >
      <form onSubmit={ handleSubmit(onSubmit) }>
        <FormControl isInvalid={ errors?.title }>
          <FormLabel htmlFor='title'> Product Title </FormLabel>
          <Input
            id='title'
            name='title'
            type='text'
            {...register('title')}
          />
          <FormErrorMessage>
            { errors?.title?.message }
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={ errors?.description }>
          <FormLabel htmlFor='description'> Product Description </FormLabel>
          <Textarea
            id='description'
            name='description'
            resize='none'
            {...register('description')}
          />
          <FormErrorMessage>
            { errors?.description?.message }
          </FormErrorMessage>
        </FormControl>

        <Button
          my={4}
          type='submit'
          colorScheme='teal'
          isLoading={ isSubmitting }
          loadingText='Submitting...'
        >
          Submit 
        </Button>
      </form>
    </Box>
  )
}
