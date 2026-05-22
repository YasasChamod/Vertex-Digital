import { useState, useEffect } from 'react';

const usePersist = () => {
    const [persist, setPersist] = useState(() => {
        const storedPersist = localStorage.getItem('persist');
        return storedPersist ? JSON.parse(storedPersist) : false;
    });

    useEffect(() => {
        localStorage.setItem('persist', JSON.stringify(persist));
    }, [persist]);

    return [persist, setPersist];
}

export default usePersist;