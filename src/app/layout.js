import Header from "@components/header";
import "./globals.css";
import MyApp from "./app";
import MenuLateral from "@components/menu-lateral";

export const metadata = {
    title: "Liga ROOT CE",
    description: "Liga ROOT",
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt">
            <body>
                <div className='body-div'>
                    <MenuLateral />
                    <div className='main' >
                        <Header />
                        <div className='container-root'>
                            <MyApp>
                                {children}
                            </MyApp>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}
