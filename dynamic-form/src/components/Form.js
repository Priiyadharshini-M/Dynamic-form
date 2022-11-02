import { useState, useEffect } from "react"
import { useFormik } from "formik"
import { toast } from 'react-toastify';
import { formElement } from '../formElement'
import { schema } from "./schema"
import styles from '../components/Form.module.css'

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
    const onSubmit = async () => {
        await fetch(`http://localhost:8000/user/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) })
            .then((response) => {
                if (response.ok) {
                    toast.success("Successfully applied")
                    return response.json()
                }
                return Promise.reject(response)
            })
            .catch(err => {
                err.json().then((error) => {
                    toast.warning(error.err)
                })
            })
    }

    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: newObj,
        validationSchema: schema,
        onSubmit
    })

    useEffect(() => {
        setElement(formElement[0])
    }, [])

    const { fields, page_label } = element ?? {}

    return (
        <div className="container justify-content-center text-align-center" id={styles.container}>
            <h3 className="ml-4">{page_label}</h3><hr />
            <form onSubmit={handleSubmit}>
                {fields && fields.map((field, i) => {
                    const fieldError = field.name
                    const testingError = field.name + "_Error"
                    switch (field.type) {
                        case 'text':
                            return (
                                <div key={i}>
                                    <Condition when={field.condition ? field.condition : null} is={true} value={values}>
                                        <div className="mb-3" key={i}>
                                            <label className="form-label text-align-center">{field.label} <sup className="text-danger">{field.star}</sup></label>
                                            <div id={styles.iconsContainer}>
                                                {field.icon && <i className={field.icon} id={styles.icons}></i>}
                                                <input className="form-control" {...field} value={field.val} data-testid={field.id} onChange={handleChange} onBlur={handleBlur}></input>
                                            </div>
                                            {errors[fieldError] && touched[fieldError] && <p className="text-danger" data-testid={testingError}>{errors[fieldError]}</p>}
                                        </div>
                                    </Condition>
                                </div>
                            )

                        case 'select':
                            return (
                                <div key={i}>
                                    <Condition when={field.condition ? field.condition : null} is={true} value={values}>
                                        <label className="form-label">{field.label} <sup className="text-danger">{field.star}</sup></label>
                                        <select className="form-select" {...field} value={field.val} data-testid={field.id} onChange={handleChange} onBlur={handleBlur}>
                                            <option defaultValue>Select menu</option>
                                            {field.field_options.length > 0 && field.field_options.map((option, i) => {
                                                return (
                                                    <option value={option.option_label} key={i}>{option.option_label}</option>
                                                )
                                            })}
                                        </select>
                                        {errors[fieldError] && touched[fieldError] && <p className="text-danger" data-testid={testingError}>{errors[fieldError]}</p>}
                                        <br />
                                    </Condition>
                                </div>
                            )

                        case 'radio':
                            return (
                                <div key={i}>
                                    <Condition when={field.condition ? field.condition : null} is={true} value={values}>
                                        <label className="form-label">{field.label} <sup className="text-danger">{field.star}</sup></label>
                                        <div className="form-check radioGroup" {...field} value={field.val} data-testid={field.id} onChange={handleChange} onBlur={handleBlur}>
                                            {field.field_options.length > 0 && field.field_options.map((option, i) => {
                                                return (
                                                    <div key={i}>
                                                        <input className="form-check-input" {...field} value={option.option_label} data-testid={option.option_label} onChange={handleChange} onBlur={handleBlur}/>
                                                        <label className="form-check-label">{option.option_label}</label>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        {errors[fieldError] && touched[fieldError] && <p className="text-danger" data-testid={testingError}>{errors[fieldError]}</p>}<br />
                                    </Condition>
                                </div>
                            )


                        case 'checkbox':
                            return (
                                <div key={i}>
                                    <Condition when={field.condition ? field.condition : null} is={true} value={values}>
                                        <div className="mb-3 form-check">
                                            <input className="form-check-input" {...field} checked={field.val} data-testid={field.id} onChange={handleChange} />
                                            <label className="form-check-label">{field.label}</label>
                                            {errors[fieldError] && touched[fieldError] && <p className="text-danger" data-testid={testingError}>{errors[fieldError]}</p>}
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
                                            <input className="form-control" {...field} value={field.val} data-testid={field.id} onChange={handleChange} onBlur={handleBlur} />
                                            {errors[fieldError] && touched[fieldError] && <p className="text-danger" data-testid={testingError}>{errors[fieldError]}</p>}
                                        </div>
                                    </Condition>
                                </div>
                            )

                        case 'switch':
                            return (
                                <div className="form-check form-switch" key={i}>
                                    <input className="form-check-input"  {...field} type="checkbox" data-testid={field.id} onChange={handleChange} onBlur={handleBlur} />
                                    <label className="form-check-label" >{field.label}</label>
                                    {errors[fieldError] && touched[fieldError] && <p className="text-danger" data-testid={testingError}>{errors[fieldError]}</p>}
                                </div>
                            )

                        case 'textarea':
                            return (
                                <div key={i}>
                                    <Condition when={field.condition ? field.condition : null} is={true} value={values}>
                                        <div className="form-floating">
                                            <textarea className="form-control" {...field} value={field.val} data-testid={field.id} onChange={handleChange} onBlur={handleBlur}></textarea>
                                            <label>{field.label}</label>
                                            {errors[fieldError] && touched[fieldError] && <p className="text-danger" data-testid={testingError}>{errors[fieldError]}</p>}
                                        </div><br />
                                    </Condition>
                                </div>
                            )

                        default:
                            return null
                    }
                })}

                <br /><button type="submit" className="btn btn-success" id={styles.submit}>Submit</button>
            </form>
        </div>
    )
}