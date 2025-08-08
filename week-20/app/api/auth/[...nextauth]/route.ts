import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";


const handler = NextAuth({
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: "Login with email",
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				username: {
					label: "Username",
					type: "text",
					placeholder: "akash",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				const username = credentials?.username;
				const password = credentials?.password;

				const user = {
					name: "akash",
					id: "1",
					username: "lmao",
				};

				if (user) {
					return user;
				} else {
					return null;
				}
			},
		}),
        GoogleProvider({
            clientId:"lmao",
            clientSecret:"xd"
        })
	],
});

export { handler as GET, handler as POST };
