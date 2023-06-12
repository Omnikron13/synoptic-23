import '../styles/main.scss';

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <head>
         </head>
         <body>{children}</body>
      </html>
   );
}
