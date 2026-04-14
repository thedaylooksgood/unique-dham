import { Playfair_Display, Plus_Jakarta_Sans, Tiro_Devanagari_Hindi } from 'next/font/google';

export const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const tiroDevanagari = Tiro_Devanagari_Hindi({
  subsets: ['latin', 'devanagari'],
  weight: ['400'],
  variable: '--font-sacred',
  display: 'swap',
});

export const fonts = {
  display: playfairDisplay.variable,
  body: plusJakartaSans.variable,
  sacred: tiroDevanagari.variable,
};