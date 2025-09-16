import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';


interface UseFormProps<T> {
    initialValues: T;
    validations?: { [key in keyof T]?: (value: T[key]) => string };
    onSubmit: (values: T) => void;
}

interface UseFormResult<T> {
    values: T;
    errors: { [key in keyof T]?: string };
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
    resetForm: () => void;
}

function useForm<T>({ initialValues, validations, onSubmit }: UseFormProps<T>): UseFormResult<T> {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<{ [key in keyof T]?: string }>({});

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const validate = () => {
        if (!validations) return true;
        const newErrors: { [key in keyof T]?: string } = {};
        let isValid = true;

        for (const key in validations) {
            const validation = validations[key];
            if (validation) {
                const error = validation(values[key]);
                if (error) {
                    newErrors[key] = error;
                    isValid = false;
                }
            }
        }
        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const isValid = validate();
        if (isValid) {
            onSubmit(values);
        }
    };

    const resetForm = () => {
        setValues(initialValues);
        setErrors({});
    };

    return { values, errors, handleChange, handleSubmit, resetForm };
}

export default useForm;