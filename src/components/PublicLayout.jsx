import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppFloat from './WhatsAppFloat';

const PublicLayout = () => {
    return (
        <>
            <Navbar />
            <div className="pt-[64px] sm:pt-[80px]">
                <Outlet />
            </div>
            <Footer />
            <WhatsAppFloat />
        </>
    );
};

export default PublicLayout;
