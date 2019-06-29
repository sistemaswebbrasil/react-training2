import React from 'react'
import { Grid, Header } from "semantic-ui-react";

function CrudForm({title,children}) {
    return (
        <Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
            <Grid.Column >
                <Header as="h2" color="teal" textAlign="center">
                    {title}
                </Header>   
                {children}
            </Grid.Column>
        </Grid>
    )
}

export default CrudForm



