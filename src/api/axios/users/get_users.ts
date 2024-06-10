import API from '@/api/api';
import { UserData } from '@/api/interface/users';

const getUsers = async () => {
    try {
        const response = await API.get('/users');
        if (response.data.success) {
            return response.data.data as UserData[];
        } else {
            throw new Error(response.data.message || 'Error fetching users');
        }
    } catch (error) {
        throw new Error('Failed to fetch users');
    }
};

export default getUsers;