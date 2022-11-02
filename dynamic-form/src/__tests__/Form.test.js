import { render as rtlRender, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import { fireEvent } from "@testing-library/react";
import { act } from "react-test-renderer";
import userEvent from "@testing-library/user-event";
import { ToastContainer } from "react-toastify"
import { Form } from "../components/Form";

const render = component => rtlRender(
    <BrowserRouter>
    <ToastContainer />
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

    it('checkbox of driving license', async () => {
        const { getByTestId } = render(<Form />)
        expect(getByTestId('driving_license')).toHaveAttribute("type", "checkbox")
        expect(getByTestId('driving_license')).not.toBeChecked()
        expect(() => getByTestId('license_expiry')).toThrow()
        expect(() => getByTestId('identity')).toThrow()
        fireEvent.click(getByTestId('driving_license'))
        expect(getByTestId('driving_license')).toBeChecked()
        expect(getByTestId('license_expiry')).toBeInTheDocument()
        expect(getByTestId('identity')).toBeInTheDocument()
    })

    it('license expiry - conditional field check', async () => {
        const { getByTestId } = render(<Form />)
        fireEvent.click(getByTestId('driving_license'))
        expect(getByTestId('license_expiry')).toBeInTheDocument()
        await act(async () => {
            fireEvent.change(getByTestId("license_expiry"), { target: { value: new Date('01/11/2022') } })
            fireEvent.blur(getByTestId("license_expiry"))
        })
        const spanElement = getByTestId('license_expiry_Error')
        expect(spanElement).toBeInTheDocument()
    })

    it('license number - conditional field check', async () => {
        const { getByTestId } = render(<Form />)
        fireEvent.click(getByTestId('driving_license'))
        expect(getByTestId('identity')).toBeInTheDocument()
        await act(async () => {
            fireEvent.change(getByTestId("identity"), { target: { value: "12378954" } })
            fireEvent.blur(getByTestId("identity"))
        })
        const spanElement = getByTestId('identity_Error')
        expect(spanElement).toBeInTheDocument()
    })

    it('address verification', async () => {
        const { getByTestId } = render(<Form />)
        expect(getByTestId('address')).toHaveAttribute("type", "textarea")
    })

    it('agreement - switch type verification', async () => {
        const { getByTestId, getByText } = render(<Form />)
        await act(async () => {
            expect(getByTestId('agreement')).not.toBeChecked()
            // fireEvent.click(getByTestId('agreement'))
            const submit = getByText('Submit')
            fireEvent.click(submit)
        })
        const spanElement = getByTestId('agreement_Error')
        expect(spanElement).toBeInTheDocument()
    })

    it("already existing email", async () => {
        const { getByTestId, getByText } = render(<Form />)
        await act(async() => {
        const btn = getByText('Submit')
        fireEvent.change(getByTestId("name"), { target: { value: "Rahul"}})
        fireEvent.change(getByTestId("email"), { target: { value: "priiya303@gmail.com" } })
        fireEvent.change(getByTestId("contact"), { target: { value: "9845765673" } })
        fireEvent.click(getByTestId('Male'))
        fireEvent.change(getByTestId("employment"), { target: { value: "Part-Time" } })
        fireEvent.click(getByTestId('agreement'))
        expect(btn).toBeInTheDocument()
        userEvent.click(btn)
    })
        const success = await screen.findByText("Already applied with this email.")
        expect(success).toBeInTheDocument()
    })

    // it("submit success with correct inputs", async () => {
    //     const { getByTestId, getByText } = render(<Form />)
    //     await act(async() => {
    //     const btn = getByText('Submit')
    //     fireEvent.change(getByTestId("name"), { target: { value: "Ravi"}})
    //     fireEvent.change(getByTestId("email"), { target: { value: "ravi@gmail.com" } })
    //     fireEvent.change(getByTestId("contact"), { target: { value: "9845765673" } })
    //     fireEvent.click(getByTestId('Male'))
    //     fireEvent.change(getByTestId("employment"), { target: { value: "Part-Time" } })
    //     fireEvent.click(getByTestId('agreement'))
    //     expect(btn).toBeInTheDocument()
    //     userEvent.click(btn)
    // })
    //     const success = await screen.findByText("Successfully applied")
    //     expect(success).toBeInTheDocument()
    // })

})