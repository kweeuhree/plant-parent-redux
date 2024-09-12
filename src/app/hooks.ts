// This file serves as a central hub for re-exporting pre-typed Redux hooks.
// These imports are restricted elsewhere to ensure consistent
// usage of typed hooks throughout the application.
// We disable the ESLint rule here because this is the designated place
// for importing and re-exporting the typed versions of hooks.
/* eslint-disable @typescript-eslint/no-restricted-imports */
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "./store"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export const useFormData = <T,>(initialState: T, callback: (data: T) => void) => {
    const [formData, setFormData] = useState<T>(initialState);

    const handleChange = useCallback(
        ({ target }: React.ChangeEvent<HTMLInputElement>) => {
            setFormData((prev) => ({
                ...prev, 
                [target.name]: target.value,
            }));
        }, [setFormData]
    );

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        callback(formData);
        setFormData(initialState);
    };

    return { formData, handleChange, handleSubmit };
};