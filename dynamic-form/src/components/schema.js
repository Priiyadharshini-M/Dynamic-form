import * as yup from "yup"

const nameRegex = /^[a-zA-Z ]+$/
const phoneRegex = /^[6-9]{1}[0-9]{9}$/
const identityRegex = /^[0-9 ]{9}$/

export const schema = yup.object().shape({
    name: yup.string().required("**This field is required").min(3, "**Minimum 3 characters needed").max(20, "**Only maximum of 20 characters allowed").matches(nameRegex, { message: "**Only alphabets allowed" }),
    email: yup.string().email("**Please enter a valid email").required("**This field is required"),
    gender: yup.string().oneOf(['Male', 'Female', 'Others']).required("**This field is required"),
    employment: yup.string().oneOf(['Full-Time', 'Part-Time']).required("**This field is required"),
    contact: yup.string().required("**This field is required").matches(phoneRegex, { message: "**Contact should contain 10 digits and start with 6/7/8/9" }),
    driving_license: yup.string(),
    license_expiry: yup.date().when("driving_license", {
        is: "true",
        then: yup.date().required("**This field is required").min(new Date(Date.now()), "**Expiry date should be in future")
    }),
    identity: yup.string().when("driving_license", {
        is: "true",
        then: yup.string().required("**This field is required").matches(identityRegex, { message: "Only 9 numbers allowed" })
    }),
    agreement: yup.string().required("**Please accept the agreement to continue.")
})