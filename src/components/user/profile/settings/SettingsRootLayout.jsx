import React from 'react';
import { Outlet } from 'react-router-dom';
import Settings from './Settings';
import Footer from '../../../layout/footer/Footer';

const SettingsRootLayout = () => {
    return (
        <div className="flex min-h-screen">
            <Settings />
            <main className="flex-1 p-6 ml-[580px] overflow-y-auto" style={{ maxHeight: '100vh' }}>
                <Outlet />
                <Footer />
            </main>
        </div>
    );
};

export default SettingsRootLayout;