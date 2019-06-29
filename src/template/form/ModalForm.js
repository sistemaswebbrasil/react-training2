import React from 'react'
import { Form } from 'semantic-ui-react'

function ModalForm({ children,handleSubmit,loading }) {
    return (
        <Form size="large" onSubmit={handleSubmit} loading={loading} error>
            {children}
        </Form>
    )
}

export default ModalForm
