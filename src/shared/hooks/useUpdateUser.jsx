import { useState } from "react";
import { updateUserRequest } from "../../services/api";
import toast from "react-hot-toast";

export const useUpdateUser = () => {
    const [updatedUser, setUpdatedUser] = useState();

    const updateUser = async (token, userData) => {
        try {
            const response = await updateUserRequest(token, userData);
            if (response.error) {
                toast.error(
                    response?.err?.response?.data?.message ||
                    'Error al actualizar su información'
                );
            } else {
                setUpdatedUser(response.data);
                toast.success('Información actualizada correctamente');
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return {
        updatedUser,
        isFetching: !updateUser,
        updateUser
    };
};