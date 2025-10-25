import React from "react";

import Header from '../Header';
import Routes from "../../Routes";
import Footer from '../Footer';

export default function Layout({ onToggleTheme, selectedTheme }) {
    return (
        <>
            <Header 
                onToggleTheme={onToggleTheme}
                selectedTheme={selectedTheme}
            />
            <Routes />
            <Footer 
                onToggleTheme={onToggleTheme}
                selectedTheme={selectedTheme}
            />
        </>
    );
}
