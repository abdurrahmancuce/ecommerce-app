import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react'
import React from 'react'

export default function Error404() {
    return (
        <Alert status='error'>
            <AlertIcon />
            <AlertTitle>Error 404</AlertTitle>
            <AlertDescription>This page was not found</AlertDescription>
        </Alert>
    )
}
