import * as jwt from 'jsonwebtoken';
const KEY_TOKEN = process.env.JSONWEBTOKEN_KEY_TOKEN;

function middelwareVerify(req, res, next) {
	const token = req.headers.authorization.split(' ')[1];
	try {
		const data = jwt.verify(token, KEY_TOKEN);
		req._user = data;
		next();
	} catch (err) {
		res.status(401).json({ error: true });
	}
}
export { middelwareVerify };
