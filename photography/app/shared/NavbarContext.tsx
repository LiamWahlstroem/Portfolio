'use client';

import React, {createContext, ReactNode, useContext, useState} from 'react';

type NavbarContextType = {
	value: string;
	setValue: (value: string) => void;
};
const NavbarContext = createContext<NavbarContextType | undefined>(undefined);
export const NavbarProvider = ({ children }: { children: ReactNode }) => {
	const [value, setValue] = useState('');
	return (
		<NavbarContext.Provider value={{ value, setValue }}>
			{children}
		</NavbarContext.Provider>
	);
};
export const useNavbar = () => {
	const context = useContext(NavbarContext);
	if (!context) {
		throw new Error('useNavbar must be used within a NavbarProvider');
	}
	return context;
};
