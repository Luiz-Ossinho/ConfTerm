import React from 'react'

export default function useValidations(initialValue, schema) {
    const [formValue, setFormValue] = React.useState(initialValue);
    const [isValueValid, setValueValid] = React.useState(true);

    function handleChange(event) {
        setValueValid(schema.isValidSync(event.target.value));

        setFormValue(event.target.value);
    }


    return { formValue, setFormValue, handleChange, isValueValid };
}