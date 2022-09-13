import * as sendgrid from '@sendgrid/mail';

const api_key = process.env.SENDGRID_API_KEY;
sendgrid.setApiKey(api_key);

export { sendgrid };
