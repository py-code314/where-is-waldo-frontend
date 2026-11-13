/* Function to check for empty inputs on form submission */
export function validateForm(formData, setValidFormData, setErrorMessages) {
  let isValid = true

  // Update state if input fields are empty
  if (!formData.name.trim()) {
    setValidFormData((prevValid) => ({
      ...prevValid,
      name: false,
    }))
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      name: 'Please enter your name',
    }))

    isValid = false
  } else {
    setValidFormData((prevValid) => ({ ...prevValid, name: true }))
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      name: '',
    }))
  }

  return isValid
}
