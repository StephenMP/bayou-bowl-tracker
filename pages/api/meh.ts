import Paypal from 'paypal-nvp-api'

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      const config = {
        mode: process.env.PAYPAL_API_MODE, // or 'live'
        username: process.env.PAYPAL_API_USERNAME,
        password: process.env.PAYPAL_API_PASSWORD,
        signature: process.env.PAYPAL_API_SIGNATURE,
      }

      const paypal = Paypal(config)

      try {
        const result = await paypal.request('GetBalance', {})

        res.status(200).json(result)
      } catch (e) {
        console.log(e)
      }

      res.status(500).end()
      break

    default:
      res.status(405).end()
      break
  }
}
