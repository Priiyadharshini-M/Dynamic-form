import { useState, useEffect } from "react"
import { formElement } from '../formElement'
import styles from '../components/Form.module.css'
import { useFormik } from "formik"
import { schema } from "./schema"

const Condition = ({ when, is, value, children }) => {
    var array = []
    if (when !== null) {
        formElement[0].fields.map((item) => {
            when === item.name ? (is === value[when] ? array.push(children) : array.push(null)) : array.push(null)
            return 0
        })
        return array
    }
    else
        return children
}

export const Form = () => {
    const [element, setElement] = useState(null)
    let newObj = {}
    for (let item of formElement[0].fields) {
        newObj = {
            ...newObj,
            [item.name]: item.value
        }
    }
    const onSubmit = () => {
        console.log("before submit", element)
    }

    const { values, errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting } = useFormik({
        initialValues: newObj,
        validationSchema: schema,
        onSubmit
    })

    console.log("errors", values)
    console.log("er", errors)

    useEffect(() => {
        setElement(formElement[0])
    }, [])

    const { fields, page_label } = element ?? {}

    return (
        <div className="container justify-content-center text-align-center" id={styles.container}>
            <h3>{page_label}</h3>
            <form onSubmit={handleSubmit}>
                {fields && fields.map((field, i) => {
                    const fieldError = field.name
                    switch (field.type) {
                        case 'text':
                            return (
                                <div key={i}>
                                    <Condition when={field.condition ? field.condition : null} is={true} value={values}>
                                        {console.log("val", fieldError)}
                                        <div className="mb-3" key={i}>
                                            <label className="form-label text-align-center">{field.label} <sup className="text-danger">{field.star}</sup></label>
                                            <div id={styles.iconsContainer}>
                                                {field.icon && <i className={field.icon} id={styles.icons}></i>}
                                                <input className="form-control" {...field} value={field.val} onChange={handleChange} onBlur={handleBlur}></input>
                                            </div>
                                            {errors[fieldError] && touched[fieldError] && <p className="text-danger">{errors[fieldError]}</p>}
                                        </div>
                                    </Condition>
                                </div>
                            )

                        case 'select':
                            return (
                                <div key={i}>
                                    <Condition when={field.condition ? field.condition : null} is={true} value={values}>
                                        <label className="form-label">{field.label} <sup className="text-danger">{field.star}</sup></label>
                                        <select className="form-select" {...field} value={field.val} onChange={handleChange} onBlur={handleBlur}>
                                            <option defaultValue>Select menu</option>
                                            {field.field_options.length > 0 && field.field_options.map((option, i) => {
                                                return (
                                                    <option value={option.option_label} key={i}>{option.option_label}</option>
                                                )
                                            })}
                                        </select>
                                        {errors[fieldError] && touched[fieldError] && <p className="text-danger">{errors[fieldError]}</p>}
                                        <br />
                                    </Condition>
                                </div>
                            )

                        case 'radio':
                            return (
                                <div key={i}>
                                    <Condition when={field.condition ? field.condition : null} is={true} value={values}>
                                        <label className="form-label">{field.label} <sup className="text-danger">{field.star}</sup></label>
                                        <div className="form-check radioGroup" {...field} value={field.val} onChange={handleChange} onBlur={handleBlur}>
                                            {field.field_options.length > 0 && field.field_options.map((option, i) => {
                                                return (
                                                    <div key={i}>
                                                        <input className="form-check-input" {...field} value={option.option_label} />
                                                        <label className="form-check-label">{option.option_label}</label>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        {errors[fieldError] && touched[fieldError] && <p className="text-danger">{errors[fieldError]}</p>}<br />
                                    </Condition>
                                </div>
                            )


                        case 'checkbox':
                            return (
                                <div key={i}>
                                    <Condition when={field.condition ? field.condition : null} is={true} value={values}>
                                        <div className="mb-3 form-check">
                                            <input className="form-check-input" {...field} checked={field.val} onChange={handleChange} />
                                            <label className="form-check-label">{field.label}</label>
                                            {errors[fieldError] && touched[fieldError] && <p className="text-danger">{errors[fieldError]}</p>}
                                        </div>
                                    </Condition>
                                </div>
                            )

                        case 'date':
                            return (
                                <div key={i}>
                                    <Condition when={field.condition ? field.condition : null} is={true} value={values}>
                                        <div className="mb-3">
                                            <label className="form-label">{field.label} <sup className="text-danger">{field.star}</sup></label>
                                            <input className="form-control" {...field} value={field.val} onChange={handleChange} onBlur={handleBlur} />
                                            {errors[fieldError] && touched[fieldError] && <p className="text-danger">{errors[fieldError]}</p>}
                                        </div>
                                    </Condition>
                                </div>
                            )

                        case 'switch':
                            return (
                                <div className="form-check form-switch" key={i}>
                                    <input className="form-check-input"  {...field} type="checkbox" onChange={handleChange} onBlur={handleBlur}/>
                                    <label className="form-check-label" >{field.label}</label>
                                    {errors[fieldError] && touched[fieldError] && <p className="text-danger">{errors[fieldError]}</p>}
                                </div>
                            )

                        case 'textarea':
                            return (
                                <div key={i}>
                                    <Condition when={field.condition ? field.condition : null} is={true} value={values}>
                                        <div className="form-floating">
                                            <textarea className="form-control" {...field} value={field.val} onChange={handleChange} onBlur={handleBlur}></textarea>
                                            <label>{field.label}</label>
                                            {errors[fieldError] && touched[fieldError] && <p className="text-danger">{errors[fieldError]}</p>}
                                        </div><br />
                                    </Condition>
                                </div>
                            )

                        default:
                            return null
                    }
                })}

                <button disabled={isSubmitting} type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    )
}