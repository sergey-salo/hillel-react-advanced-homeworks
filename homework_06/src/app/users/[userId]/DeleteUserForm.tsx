'use client'
import JsonPlaceholderAPI from '@/api/JsonPlaceholderAPI/JsonPlaceholderAPI';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { FormEventHandler, useCallback } from 'react';

interface  DeleteUserFormProps {
  userId: string
}

function DeleteUserForm({ userId }: DeleteUserFormProps) {
  const router = useRouter()
  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    async (event) => {
      event.preventDefault()
      if (!confirm('Please confirm that you want to delete this user.')) {
        return
      }
      await JsonPlaceholderAPI.deleteUser({ userId: Number(userId) })

      router.replace('/users', {scroll: true})
    },
    [userId, router]
  )

  return (
    <form onSubmit={handleSubmit}>
      <Button variant="contained" color="error" type="submit">
        Delete User
      </Button>
    </form>
  );
}

export default DeleteUserForm;
