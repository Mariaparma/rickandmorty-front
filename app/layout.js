import "./globals.css";
			export const metadata = {
				title: "Rick and Morty App",
        description: "Meu primeiro consumo com API gratis",
			};
			export default function RootLayout({ children }) {
				return (
				  <html>
					<head>
					  <link rel="icon" href="./icons8-rick-e-morty-32.png" />
					</head>
					<body>{children}</body>
				  </html>
			  );
			  }