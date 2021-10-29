import nodemailer, { SendMailOptions } from 'nodemailer'
import { logger } from '../../../lib/logtail'

const gmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mondaynighthunts@gmail.com',
    pass: process.env.GMAIL_PASSWORD,
  },
})

type PartnerRequest = {
  name: string
  company?: string
  email: string
}

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      console.log(req.body)
      const { name, company, email }: PartnerRequest = JSON.parse(req.body)

      if (name && email) {
        const text = `Name: ${name}\nCompany: ${company}\nEmail: ${email}`
        const mailOpts: SendMailOptions = {
          from: email,
          to: 'mondaynighthunts@gmail.com',
          subject: 'New Partner Inquiry',
          text,
        }

        const result = await new Promise((res, rej) => {
          gmail.sendMail(mailOpts, function (error, info) {
            if (error) {
              const err = error as Error
              logger.error(err.message)
              rej(err.message)
            } else {
              logger.info('Partner inquiry sent', { text })
              res(true)
            }
          })
        })

        if (result) {
          res.status(200).json({ success: true })
        } else {
          res.status(500).end()
        }
      } else {
        res.status(500).json({ success: false, nameMissing: !!name, emailMissing: !!email })
      }

      break

    default:
      res.status(405).end()
      break
  }
}
