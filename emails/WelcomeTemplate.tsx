import React from 'react'
import {Body,Html,Text ,Link,Preview, Container } from '@react-email/components'

const WelcomeTemplate = ({name}: {name:string}) => {
  return (
    <Html>
        <Preview>Welcome Aboard!</Preview>
        <Body>
            <Container>
                <Text>Hello {name}</Text>
                <Link href='https://google.com'>Google</Link>
            </Container>
        </Body>
    </Html>
  )
}

export default WelcomeTemplate
