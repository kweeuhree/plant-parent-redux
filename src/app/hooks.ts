// This file serves as a central hub for re-exporting pre-typed Redux hooks.
// These imports are restricted elsewhere to ensure consistent
// usage of typed hooks throughout the application.
// We disable the ESLint rule here because this is the designated place
// for importing and re-exporting the typed versions of hooks.
/* eslint-disable @typescript-eslint/no-restricted-imports */
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "./store"
import { useNavigate } from 'react-router-dom';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export const useInputData = <T,>(initialState: T, callback: (data: T) => void) => {
    const [inputData, setInputData] = useState<T>(initialState);
    const [file, setFile] = useState<File | string>('');

    const handleChange = useCallback(
        ({ target }: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value, files } = target;
            setInputData((prev) => ({
                ...prev, 
                [name]: files ? files[0] : value,
            }));

            if(files) {
                setFile(URL.createObjectURL(files[0]));
            } 
        }, []
    );

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        callback(inputData);
        setInputData(initialState);
        setFile('');
    };

    return { inputData, file, handleChange, handleSubmit };
};


export const useNavigateToPath = (basePath: string) => {
    const navigate = useNavigate();

    const navigateToPath = (path: string) => {
        navigate(`${basePath}${path}`)
    }

    const handleNavigateToPath = (path: string, timeout?: number) => {
        timeout ? (
            setTimeout(() => {
                navigateToPath(path);
            })
        ) : (
            navigateToPath(path)
        )
        
    }

  return handleNavigateToPath;
}