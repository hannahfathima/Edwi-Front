import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/dataSlice';
import { fetchAddresses } from '../redux/slices/addressSlice';

const useFetchData = () => {
    const dispatch = useDispatch();
    const { status } = useSelector((state) => state.data);
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        // Fetch products if idle
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [dispatch, status]);

    useEffect(() => {
        // Pre-fetch addresses if user is logged in
        if (token) {
            dispatch(fetchAddresses());
        }
    }, [dispatch, token]);
};

export default useFetchData;
