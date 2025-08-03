import { EmailTemplate } from '@/components/email-template'
import { Resend } from 'resend'

//const resend = new Resend('re_XLi5i5uC_LNzZ5gfKzr8pc8tFhbjNpvs6')
const resend = new Resend(process.env.RESEND)

export async function POST(req: Request) {
    try {
        const { username, email, subject, message } = await req.json()

        const { data, error } = await resend.emails.send({
            from: "BRSC <onboarding@resend.dev>",
            //from: 'Acme <onboarding@resend.dev>',
            to: ['temporal98x@gmail.com'],
            subject: subject,
            react: EmailTemplate({ firstName: username, message, email }),
        })

        if (error) {
            console.log(error)
            return Response.json({ error }, { status: 500 })
        }

        return Response.json(data)
    } catch (error) {
        return Response.json({ error }, { status: 500 })
    }
}
