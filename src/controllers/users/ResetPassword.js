// const { HttpError } = require("../../helpers");
const sendEmail = require('../../helpers/sendEmail')
// const { UserModel } = require("../../models/users");
// const bcrypt = require("bcrypt");
const CryptoJS = require('crypto-js')
const ResetPassword = async (req, res) => {
	const { email } = req.body
	const encryptedEmail = CryptoJS.AES.encrypt(email, '123').toString()
	const verificationData = {
		to: email,
		subject: `Verify Email`,
		html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  dir="ltr"
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <meta charset="UTF-8" />
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta content="telephone=no" name="format-detection" />
    <title></title>
    <!--[if (mso 16)]>
      <style type="text/css">
        a {
          text-decoration: none;
        }
      </style>
    <![endif]-->
    <!--[if gte mso 9
      ]><style>
        sup {
          font-size: 100% !important;
        }
      </style><!
    [endif]-->
    <!--[if gte mso 9]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG></o:AllowPNG>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
  </head>

  <body>
    <div dir="ltr" class="es-wrapper-color">
      <!--[if gte mso 9]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
          <v:fill type="tile" color="#fafafa"></v:fill>
        </v:background>
      <![endif]-->
      <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
        <tbody>
          <tr>
            <td class="esd-email-paddings" valign="top">
              <table
                class="es-content esd-footer-popover"
                cellspacing="0"
                cellpadding="0"
                align="center"
              >
                <tbody>
                  <tr>
                    <td
                      class="esd-stripe"
                      style="background-color: #fafafa"
                      bgcolor="#fafafa"
                      align="center"
                    >
                      <table
                        class="es-content-body"
                        style="background-color: #ffffff"
                        width="600"
                        cellspacing="0"
                        cellpadding="0"
                        bgcolor="#ffffff"
                        align="center"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="esd-structure es-p40t es-p20r es-p20l"
                              style="
                                background-color: transparent;
                                background-position: left top;
                              "
                              bgcolor="transparent"
                              align="left"
                            >
                              <table
                                width="100%"
                                cellspacing="0"
                                cellpadding="0"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      class="esd-container-frame"
                                      width="560"
                                      valign="top"
                                      align="center"
                                    >
                                      <table
                                        style="background-position: left top"
                                        width="100%"
                                        cellspacing="0"
                                        cellpadding="0"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              class="esd-block-image es-p5t es-p5b"
                                              align="center"
                                              style="font-size: 0"
                                            >
                                              <a target="_blank"
                                                ><img
                                                  src="https://tlr.stripocdn.email/content/guids/CABINET_dd354a98a803b60e2f0411e893c82f56/images/23891556799905703.png"
                                                  alt
                                                  style="display: block"
                                                  width="175"
                                              /></a>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              class="esd-block-text es-p15t es-p15b"
                                              align="center"
                                            >
                                              <h1
                                                style="
                                                  color: #333333;
                                                  font-size: 20px;
                                                "
                                              >
                                                <strong>FORGOT YOUR </strong>
                                              </h1>
                                              <h1
                                                style="
                                                  color: #333333;
                                                  font-size: 20px;
                                                "
                                              >
                                                <strong>&nbsp;PASSWORD?</strong>
                                              </h1>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              class="esd-block-text es-p40r es-p40l"
                                              align="left"
                                            >
                                              <p style="text-align: center">
                                                HI,&nbsp;${email}
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              class="esd-block-text es-p35r es-p40l"
                                              align="left"
                                            >
                                              <p style="text-align: center">
                                                There was a request to change
                                                your password!
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              class="esd-block-text es-p25t es-p40r es-p40l"
                                              align="center"
                                            >
                                              <p>
                                                If did not make this request,
                                                just ignore this email.
                                                Otherwise, please click the
                                                button below to change your
                                                password:
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              class="esd-block-button es-p40t es-p40b es-p10r es-p10l"
                                              align="center"
                                            >
                                              <span class="es-button-border"
                                                ><a
                                                  href='https://be-ready-sigma.vercel.app/resetPassword/:${encryptedEmail}'
                                                  class="es-button"
                                                  target="_blank"
                                                  >RESET PASSWORD</a
                                                ></span
                                              >
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>`
	}
	//https://beready-api-gilt.vercel.app

	//   console.log(user);
	//   const currentPassword = await bcrypt.compare(password, user.password);
	//   console.log(currentPassword);
	//   if (currentPassword) {
	//     throw HttpError(400, "You entered the current password");
	//   }
	//   const hashPassword = await bcrypt.hash(password, 10);
	//   const result = await UserModel.findByIdAndUpdate(
	//     user._id,
	//     {
	//       password: hashPassword,
	//     },
	//     { new: true }
	//   );

	//   if (!result) {
	//     throw HttpError(404, "Not Found");
	//   }

	res.setHeader('Access-Control-Allow-Credentials', '*')
	// another common pattern
	res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*') //NOTE: I also tried res.setHeader("Access-Control-Allow-Origin", "*"); and didnt work
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET,OPTIONS,PATCH,DELETE,POST,PUT'
	)
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
	)
	if (req.method === 'OPTIONS') {
		res.status(200).end()
		return
	}

	await sendEmail(verificationData)
	res.json({
		code: 200,
		message: 'email sent successfully'
	})
	//   const result = await bcrypt.compare(password, user.password);
}

module.exports = ResetPassword
