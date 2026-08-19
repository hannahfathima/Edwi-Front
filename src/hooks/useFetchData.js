import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/dataSlice';

const useFetchData = () => {
    const dispatch = useDispatch();
    const { status, products } = useSelector((state) => state.data);

    useEffect(() => {
        // Fetch data if idle
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [dispatch, status]);
};

export default useFetchData;
