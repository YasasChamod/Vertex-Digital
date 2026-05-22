import { Link, Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useRefreshMutation } from "./authApiSlice";
import { selectCurrentToken } from "./authSlice";
import usePersist from "../../hooks/usePersist";

const PersistLogin = () => {
    const [persist] = usePersist();
    const token = useSelector(selectCurrentToken);
    const effectRan = useRef(false);
    
    const [trueSuccess, setTrueSuccess] = useState(false);
    
    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation();

    useEffect(() => {
        if (effectRan.current === true || import.meta.env.MODE !== 'development') {
            const verifyRefreshToken = async () => {
                console.log('verifying refresh token');
                try {
                    await refresh();
                    setTrueSuccess(true);
                } catch (err) {
                    console.error('Failed to refresh token:', err);
                }
            };
            if (!token && persist) verifyRefreshToken();
        }

        return () => {
            effectRan.current = true;
        };
    }, [token, persist, refresh]);

    let content
    if (!persist) {
        console.log('no persist')
        content = <Outlet />
    } else if (isLoading) {
        console.log('Loading')
        content = <p>Loading...</p>
    }else if (isError) {
        console.log('Error')
        content = (
            <p className="errmsg">
                {error?.data?.message || 'Error refreshing token'}
                <Link to="/login">Please login again</Link>
            </p>
        )
    } else if (isSuccess && trueSuccess) {
        console.log('Success')
        content = <Outlet />
    }else if (token && isUninitialized) {
        console.log('token and uninit')
        content = <Outlet />
     }

    return content
}

export default PersistLogin