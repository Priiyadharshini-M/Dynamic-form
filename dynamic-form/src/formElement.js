export const formElement=[
    {
        page_label: "Job Application Form",
        fields: [
            {
                id: "name",
                name:"name",
                label: "Name",
                star:"*",
                required: true,
                placeholder: "Enter name",
                type: "text",
                value: "",
                icon:"bi bi-person-fill"
            },
            {
                id: "email",
                name: "email",
                label: "Email",
                required: true,
                star:"*",
                placeholder: "Enter email",
                type: "text",
                value:"",
                icon:"bi bi-envelope-fill"
            },
            {
                id: "gender",
                name:"gender",
                label: "Gender",
                placeholder: "",
                star:"*",
                type: "radio",
                value:"",
                field_options: [
                    {
                        option_label: "Male"
                    },
                    {
                        option_label: "Female"
                    },
                    {
                        option_label: "Others"
                    }
                ]
                
            },
            {
                id: "employment",
                name: "employment",
                label: "Employment desired",
                value: "select",
                star: "*",
                required: true,
                field_options: [
                    {
                        option_label: "Full-Time"
                    },
                    {
                        option_label: "Part-Time"
                    }
                ],
                type: "select"
            },
            {
                id: "contact",
                name: "contact",
                label: "Contact No.",
                required: true,
                star:"*",
                placeholder: "Enter contact no",
                type: "text",
                icon:"bi bi-telephone-fill",
                value:""
            },
            {
                id: "driving_license",
                name: "driving_license",
                label: "I confirm to have driving license.",
                type: "checkbox",
                value:""
            },
            {
                id: "identity",
                name: "identity",
                condition: "driving_license",
                label: "Driving License No",
                required: true,
                star:"*",
                placeholder: "e.g. 012 345 678",
                type: "text",
                value:""
            },
            {
                id: "license_expiry",
                name: "license_expiry",
                condition: "driving_license",
                label:"License Expiry date",
                required:true,
                star:"*",
                placeholder:"sdfgh",
                type: "date",
                value:""
            },
            {
                id: "address",
                name: "address",
                label: "Address",
                placeholder: "Enter your address here...",
                type: "textarea",
                value:""
            },
            {
                id: "agreement",
                name:"agreement",
                label:"I agree to all the terms and conditions.",
                required:true,
                type: "switch",
                value: ""
            },
        ]
    }
]