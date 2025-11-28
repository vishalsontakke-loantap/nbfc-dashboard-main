// App.tsx (or AuthInitializer.tsx)
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLazyGetCurrentUserQuery } from '@/redux/features/auth/authApi';
import { clearCredentials, setCredentials } from '@/redux/features/auth/authSlice';

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();
    const [trigger, { data, isSuccess, isError }] = useLazyGetCurrentUserQuery();
    useEffect(() => {
        // call backend to confirm cookie/session and get user
        console.log('1')
        trigger();
    }, [trigger]);

    useEffect(() => {
        console.log('data',data)
        if (isSuccess && data && data?.success) {
            console.log('2',isSuccess, data)
            dispatch(setCredentials({
                user: data?.data || null,
            }));
        }

        if (isError) {
            console.log('err',isError, data)
            dispatch(clearCredentials());  // important
        }
    }, [isSuccess, isError, data, dispatch]);


    // show children immediately; if you need to block render until check finishes,
    // you can conditionally render a loader while !isSuccess && !isError && loading
    return <>{children}</>;
}
