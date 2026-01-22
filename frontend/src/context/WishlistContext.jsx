import { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../utils/axios';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within WishlistProvider');
    }
    return context;
};

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated, loading: authLoading } = useAuth();

    useEffect(() => {
        if (authLoading) return; // Wait for auth to finish loading
        
        if (isAuthenticated) {
            fetchWishlist();
        } else {
            setWishlist([]);
        }
    }, [isAuthenticated, authLoading]);

    const fetchWishlist = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get('/wishlist');
            if (response.data.success) {
                setWishlist(response.data.data.products || []);
            }
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        } finally {
            setLoading(false);
        }
    };

    const addToWishlist = async (productId) => {
        try {
            const response = await apiClient.post(
                '/wishlist/add',
                { productId }
            );
            if (response.data.success) {
                setWishlist(response.data.data.products || []);
                toast.success('Added to wishlist');
                return true;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add to wishlist');
            return false;
        }
    };

    const removeFromWishlist = async (productId) => {
        try {
            const response = await apiClient.delete(
                `/wishlist/remove/${productId}`
            );
            if (response.data.success) {
                setWishlist(response.data.data.products || []);
                toast.success('Removed from wishlist');
                return true;
            }
        } catch (error) {
            toast.error('Failed to remove from wishlist');
            return false;
        }
    };

    const isInWishlist = (productId) => {
        return wishlist?.some(product => product._id === productId) || false;
    };

    const value = {
        wishlist,
        loading,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        fetchWishlist
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};
