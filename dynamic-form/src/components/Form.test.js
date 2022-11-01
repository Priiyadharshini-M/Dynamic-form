import { render as rtlRender, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import { Form } from "./Form";
import { fireEvent } from "@testing-library/react";
import { act } from "react-test-renderer";
import userEvent from "@testing-library/user-event";

const render = component => rtlRender(
    <BrowserRouter>
        {component}
    </BrowserRouter>
)

describe('Dynamic Form', () => {
    it('name verification', async () => {
        const { getByTestId } = render(<Form />)
        await act(async () => {
            fireEvent.change(getByTestId("name"), { target: { value: "E#6F"}})
            fireEvent.blur(getByTestId("name"))
        })
        const spanElement = getByTestId('name_Error')
        expect(spanElement).toBeInTheDocument()
    })

    it('email verification', async () => {
        const { getByTestId } = render(<Form />)
        await act(async () => {
            fireEvent.change(getByTestId("email"), { target: { value: "^%ghijkyhgmail.com" } })
            fireEvent.blur(getByTestId("email"))
        })
        const spanElement = getByTestId('email_Error')
        expect(spanElement).toBeInTheDocument()
    })

    it('phone number verification', async () => {
        const { getByTestId } = render(<Form />)
        await act(async () => {
            fireEvent.change(getByTestId("contact"), { target: { value: "2845765673" } })
            fireEvent.blur(getByTestId("contact"))
        })
        const spanElement = getByTestId('contact_Error')
        expect(spanElement).toBeInTheDocument()
    })

    it('gender verification', async () => {
        const { getByTestId, getByText } = render(<Form />)
        expect(getByTestId('gender')).toHaveAttribute("type", "radio")
        await act(async () => {
            const male = getByTestId('Male')
            const female = getByTestId('Female')
            //fireEvent.click(male)
            const submit = getByText('Submit')
            fireEvent.click(submit)
        })
        const spanElement = getByTestId('gender_Error')
        expect(spanElement).toBeInTheDocument()
    })

    it('employment', async () => {
        const { getByTestId } = render(<Form />)
        expect(getByTestId('employment')).toHaveAttribute("type", "select")
        await act(async () => {
            fireEvent.change(getByTestId("employment"), { target: { value: "Part-Tim" } })
            fireEvent.blur(getByTestId("employment"))
        })
        const spanElement = getByTestId('employment_Error')
        expect(spanElement).toBeInTheDocument()
    })

    
})