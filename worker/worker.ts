export default {


	async fetch(request: Request): Promise<Response> {
		try {
			const url = new URL(request.url);


			if (request.method === "POST" && url.pathname === "/auth") {
				const requestJson = await request.json() as any
				if (requestJson.email === undefined || requestJson.password === undefined) {
					throw 'Username or password not specified'
				}
				const authResponse = await fetch('https://report.bugs.mojang.com/jsd-login/v1/authentication/authenticate', {
					method: "POST",
					body: JSON.stringify({
						email: requestJson.email,
						password: requestJson.password
					})
				})

				if (authResponse.status !== 200) {
					throw 'Login failed'
				}

				const setCookie = authResponse.headers.getSetCookie()[0]
				if (!setCookie.startsWith('customer.account.session.token=')){
					if (authResponse.status !== 200) {
						throw 'No auth token'
					}
				}
				setCookie.replace('; Domain=report.bugs.mojang.com;', '; Domain=mojira-jsd.jacobsjo.worker.dev;')
				return new Response('OK', {
					headers: {
						'set-cookie': setCookie
					}
				})
			}

			throw "Unknown URL"			
		} catch (e) {
			return new Response(JSON.stringify({
				'error': e
			}), {
				headers: {
					"content-type": "application/json"
				}
			})
		}
	},
};
