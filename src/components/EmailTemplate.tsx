import { DOMAIN } from "@/utils/constants";
import routes from "@/utils/routes";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type EmailTemplateProps = {
  fullName: string;
  amount: number;
  orderId: string;
};

export const EmailTemplate = ({ body }: { body: EmailTemplateProps }) => (
  <Html>
    <Head />
    <Preview>
      Thank you for your pizza order! Your delicious meal is on its way 🍕
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src="https://res.cloudinary.com/djhoc0ys4/image/upload/v1747412649/categories_image/pizza.png.png"
          alt="Pizza Logo"
          width="200"
          height="200"
          style={logo}
        />

        <Text style={paragraph}>Hi {body.fullName},</Text>

        <Text style={paragraph}>
          Thank you for ordering from <strong>Elasy Pizza</strong>! 🍕
        </Text>

        <Text style={paragraph}>
          We’ve received your order totaling
          <strong>${body.amount.toFixed(2)}</strong>.
        </Text>

        <Text style={paragraph}>
          Your delicious pizza is being prepared with love and care. You can
          view your receipt or track your order below.
        </Text>

        <Section style={btnContainer}>
          <Button
            style={buttonStyle}
            href={`${DOMAIN}/order-details/${body.orderId}`}
          >
            View Order Details
          </Button>
        </Section>

        <Text style={paragraph}>
          Bon Appétit!
          <br />
          🍕 The Elasy Pizza Team
        </Text>

        <Hr style={hr} />

        <Text style={footer}>
          Need help? Visit our
          <a href={`${DOMAIN}${routes.about}`}>Support Center</a>.
        </Text>
      </Container>
    </Body>
  </Html>
);

// === Styles ===

const main = {
  backgroundColor: "#fff8f0",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
  borderRadius: "20%",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#333",
};

const btnContainer: React.CSSProperties = {
  textAlign: "center",
  marginTop: "20px",
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: "#e63946",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center",
  display: "inline-block",
  padding: "12px 24px",
};

const hr = {
  borderColor: "#eeeeee",
  margin: "30px 0",
};

const footer = {
  color: "#888",
  fontSize: "12px",
  textAlign: "center" as const,
};
