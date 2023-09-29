import * as React from 'react'

import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
  Img,
  Row,
  Link,
} from '@react-email/components'

interface OnboardingEmailTemplateProps {
  fullName: string
}

/**
 * Render email for verification email
 * and activate the user account
 *
 * @returns {FC}
 */
const OnboardingEmailTemplate: React.FC<OnboardingEmailTemplateProps> = ({
  fullName,
}) => {
  return (
    <Html>
      <Head>
        <title>Onboarding</title>
      </Head>
      <Preview>
        Welcome ${fullName}, Start exploring what you can do and work from home
        with special offers
      </Preview>
      <Tailwind>
        <Body className="bg-neutral-100 flex justify-center items-center py-20">
          <Container className="bg-white rounded-xl p-5 flex flex-col">
            <Section>
              <Img
                src="https://cooble.sonibble.com/images/logo.png"
                height={70}
                width={70}
              />
              <Heading as="h2" className="mt-10">
                Setup your workspace from home
              </Heading>
              <Hr />
              <Text className="font-medium">Hi {fullName}.</Text>
              <Text>
                Thanks to join big apart of Cooble. You can start rent and setup
                your workspace in few step.
              </Text>

              {/* steps */}
              <Section className="flex flex-col gap-2">
                <Row>1. Explore what setup do you need</Row>
                <Row>2. Start booking and pay for your setup</Row>
                <Row>3. We will delivery all of your stuff</Row>
                <Row>4. Enjoy everthing from your home</Row>
              </Section>
              <Hr />
              <Text>
                <Link href="https://cooble.sonibble.com/explore">
                  Explore the goodies
                </Link>
              </Text>
              <Hr />
              <Text className="font-medium">Happy Growing!</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export { OnboardingEmailTemplate }
