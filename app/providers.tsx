"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from "next-auth/react";

export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
	session?:any;
}

export function Providers({ children, themeProps,session }: ProvidersProps) {
	const [queryClient] = React.useState(() => new QueryClient())
  const router = useRouter();

	return (
		<NextUIProvider navigate={router.push}>
			<NextThemesProvider {...themeProps}>
				<QueryClientProvider client={queryClient}>
					<SessionProvider session={session}>
						{children}
					</SessionProvider>
					<ReactQueryDevtools />
				</QueryClientProvider>
			</NextThemesProvider>
		</NextUIProvider>
	);
}
