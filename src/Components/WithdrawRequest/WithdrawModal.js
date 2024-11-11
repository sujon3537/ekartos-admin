import { Form, Formik } from 'formik'
import ShowModal from '../../Elements/Alerts&Modals/Modal'
import SearchableSelectInput from '../InputFields/SearchableSelectInput'
import SimpleInputField from '../InputFields/SimpleInputField'
import Btn from '../../Elements/Buttons/Btn'
import { YupObject, nameSchema } from '../../Utils/Validation/ValidationSchemas'

const WithdrawModal = ({ setModal, modal }) => {
    return (
        <ShowModal open={modal} close={true} title={"Withdrawal"} setModal={setModal}>
            <Formik
                initialValues={{
                    amount: "",
                    payment_type: "",
                    message: "",
                }}
                validationSchema={YupObject({
                    amount: nameSchema,
                    message: nameSchema,
                    payment_type: nameSchema,
                })}
                onSubmit={(values) => {
                    // Put Your Login Here
                }}
            >
                {({ values }) => (
                    <Form>
                        <SimpleInputField nameList={[{ name: `amount`, title: "Amount", require: "true", type: 'number' }]} />
                        <SearchableSelectInput
                            nameList={[
                                {
                                    name: "payment_type",
                                    title: "PaymentType",
                                    require: "true",
                                    inputprops: {
                                        name: "payment_type",
                                        id: "payment_type",
                                        options: [
                                            { id: 'bank', name: "Bank" },
                                            { id: 'paypal', name: "Paypal" }
                                        ],
                                    },
                                },
                            ]}
                        />
                        <SimpleInputField nameList={[{ name: `message`, title: "Message", require: "true", type: "textarea" }]} />
                        <Btn className="btn btn-theme ms-auto mt-4" type="submit" title="Save" />
                    </Form>
                )}
            </Formik>
        </ShowModal>
    )
}

export default WithdrawModal