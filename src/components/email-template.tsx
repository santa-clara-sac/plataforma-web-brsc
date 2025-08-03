interface EmailTemplateProps {
    firstName: string
    message: string
    email: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    firstName,
    message,
    email,
}) => (
    <div>
        <h3>Nombre: {firstName}</h3>
        <h4>Correo Electrónico: {email}</h4>
        <p>{message}</p>
    </div>
)
