import '../styles/main.scss';

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <head>
            <link rel="stylesheet" href="/styles/main.scss" />
         </head>
         <body>{children}</body>
      </html>
   );
}
