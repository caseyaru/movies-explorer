import { useState, useCallback } from 'react';

const useForm = () => {
  // обработчики инпутов и ошибок
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const [isValidInput, setIsValidInput] = useState(false);
  // валидность формы, по умолчанию невалидна
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    setValues({
      ...values,
      [evt.target.name]: evt.target.value,
    });
    setErrors({
      ...errors,
      [evt.target.name]: evt.target.validationMessage,
    });
    setIsValidInput(evt.target.checkValidity());
    // проверка по встроенному методу, форма ближашая к evt
    setIsValid(evt.target.closest('form').checkValidity());
  };

  return {
    values,
    setValues,
    handleChange,
    errors,
    setErrors,
    isValid,
    isValidInput,
  };
};

export default useForm;
