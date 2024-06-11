'use client'

import React from 'react';
import { getToken, removeToken } from '@/api/axios/users/token';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import signout from '@/api/axios/users/signout';
import { useLoading } from '@rest-hooks/hooks';
import { SignoutResponse } from '@/api/interfaces/users/signout';
import Spinner from 'react-bootstrap/Spinner';

export default function HeaderComponent() {
    const router = useRouter();

    const [handleSignOut, isLoadingSignOut] = useLoading(async () => {
        const token: string = await getToken()
        const result: SignoutResponse = await signout(token);

        if (result && result.success) {
            removeToken()
            router.push('/');
        } else {
            console.error(result.msg)
        }
    });

    return (
        <div className='w-full h-full px-10 py-4'>
            <header className="bg-fiord-800 text-fiord-100 rounded-lg shadow-md flex flex-row px-10 py-4 justify-between items-center">
                <h1 className="text-xl font-bold">To-Do App</h1>
                <div className="flex flex-row items-center gap-4">
                    <p>{localStorage.getItem('user_name')}</p>
                    <Button onClick={handleSignOut} variant="destructive">
                        {isLoadingSignOut ? 
                        <Spinner animation="border" variant="light" /> : 
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>}
                    </Button>
                </div>
            </header>
        </div>
  )
}