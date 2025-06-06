import type { Config } from "tailwindcss";
import { colors } from "./app/utils/colors";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx,css}",
  ],
  darkMode: ["class", '[data-mode="dark"]'],
  theme: {
    extend: {
      screens: {
        "2xl": "1440px",
      },
      keyframes: {
        slide: {
          "0%": { opacity: "0", marginLeft: "-100px" },
          "100%": { opacity: "1" },
        },
        slideLeft: {
          "0%": { opacity: "0", marginRight: "-100%" },
          "100%": { opacity: "1" },
        },
        bottom: {
          "0%": { opacity: "0", bottom: "-100px" },
          "100%": { opacity: "1", bottom: "0" },
        },
      },

      animation: {
        slide: "slide 0.3s ease-out",
        slideLeft: "slideLeft 0.3s ease-out",
        bottom: "bottom 0.5s",
      },
      colors: colors,
      fill: {
        disabled: colors.gray["400"],
      },
      textColor: {
        primary: colors.gray["900"],
        secondary: colors.gray["600"],
        "secondary-hover": colors.gray["800"],
        tertiary: colors.gray["500"],
        "tertiary-hover": colors.gray["700"],
        quaternary: colors.gray["400"],
        "quaternary-brand": "var(--brand-300)",
        disabled: colors.gray["400"],
        placeholder: colors.gray["500"],
        "placeholder-subtle": colors.gray["300"],
        "brand-primary": "var(--brand-900)",
        "brand-secondary": "var(--brand-700)",
        "brand-tertiary": "var(--brand-600)",
        "error-primary": colors.error["600"],
        "warning-primary": colors.warning["600"],
        "warning-stars": colors.warning["400"],
        "success-primary": colors.success["600"],
        "btn-primary-fg": "#FFFFFF",
        "btn-primary-fg-hover": "#FFFFFF",
        "btn-secondary-fg": colors.gray["700"],
        "btn-secondary-fg-hover": colors.gray["800"],
        "btn-secondary-color-fg": "var(--brand-700)",
        "btn-secondary-color-fg-hover": "var(--brand-800)",
        "btn-tertiary-fg": colors.gray["600"],
        "btn-tertiary-fg-hover": colors.gray["700"],
        "btn-tertiary-color-fg": "var(--brand-700)",
        "btn-tertiary-color-fg-hover": "var(--brand-800)",
        "btn-primary-error-fg": "#FFFFFF",
        "btn-primary-error-fg-hover": "#FFFFFF",
        "btn-tertiary-error-fg": colors.error["700"],
        "btn-tertiary-error-fg-hover": colors.error["800"],
      },
      borderColor: {
        primary: colors.gray["300"],
        secondary: colors.gray["200"],
        tertiary: colors.gray["100"],
        disabled: colors.gray["300"],
        "disabled-subtle": colors.gray["200"],
        brand: "var(--brand-500)",
        "brand-secondary": "var(--brand-100)",
        "brand-tertiary": "var(--brand-600)",
        error: colors.error["500"],
        "error-subtle": colors.error["300"],
        "btn-secondary": colors.gray["300"],
        "btn-secondary-hover": colors.gray["300"],
        "btn-secondary-color": "var(--brand-400)",
        "btn-secondary-color-hover": "var(--brand-400)",
      },
      backgroundColor: {
        primary: "#FFFFFF",
        "primary-hover": colors.gray["50"],
        "primary-solid": colors.gray["950"],
        secondary: colors.gray["25"],
        "secondary-hover": colors.gray["50"],
        "secondary-solid": colors.gray["600"],
        tertiary: colors.gray["50"],
        quaternary: colors.gray["100"],
        active: colors.gray["50"],
        disabled: colors.gray["100"],
        "disabled-subtle": colors.gray["50"],
        overlay: colors.gray["950"],
        "brand-primary": "var(--brand-50)",
        "brand-secondary": "var(--brand-100)",
        "brand-solid": "var(--brand-600)",
        "brand-solid-hover": "var(--brand-700)",
        "error-primary": colors.error["50"],
        "error-secondary": colors.error["100"],
        "error-solid": colors.error["600"],
        "warning-primary": colors.warning["50"],
        "warning-secondary": colors.warning["100"],
        "warning-solid": colors.warning["600"],
        "success-primary": colors.success["50"],
        "success-secondary": colors.success["100"],
        "success-solid": colors.success["600"],
        "btn-primary": "var(--brand-600)",
        "btn-primary-hover": "var(--brand-700)",
        "btn-secondary": "#FFFFFF",
        "btn-secondary-hover": colors.gray["50"],
        "btn-secondary-color": "#FFFFFF",
        "btn-secondary-color-hover": "var(--brand-50)",
        "btn-tertiary-hover": colors.gray["50"],
        "btn-tertiary-color-hover": "var(--brand-50)",
        "btn-primary-error": colors.error["600"],
        "btn-primary-error-hover": colors.error["700"],
        "btn-tertiary-error-hover": colors.error["50"],
      },
      backgroundImage: {
        bannerOverlay:
          "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 110%)",
        grayBg: "linear-gradient(180deg, #F9FAFB 0%, #EDF0F3 100%)",
        dealsBg: "linear-gradient(100deg, #DA4606 0%, #DA4606 100%)",
        corporateOffersBg:
          "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 40%, #000 100%)",
        dealsOffersBanner:
          "linear-gradient(180deg, rgba(240, 249, 255, 0.00) 0%, #F0F9FF 100%)",
        redeemedBg: "linear-gradient(90deg, #000 0%, #666 100%);",
        redeemDetailsBg:
          "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 32.91%, #000 99.83%)",
        redeemCardHeader:
          "linear-gradient(90deg, var(--brand-50) 0.13%, rgba(224, 243, 254, 0.20) 99.99%)",
        eventsOverlay:
          "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 29.96%, #000 100%)",
        eventsSliderOverlay:
          "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 29.96%, rgba(0, 0, 0, 0.70) 100%)",
        eventChip:
          "linear-gradient(93deg, rgba(240, 249, 255, 0.10) 0%, rgba(240, 249, 255, 0.80) 100%)",
        parkingOverlay:
          "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 50.24%, #000 99.9%)",
        homeBannerOverlay:
          "linear-gradient(13deg, #000 9.65%, rgba(0, 0, 0, 0.00) 42.77%)",
      },
      boxShadow: {
        xs: "0px 1px 2px 0px #1018280D",
        sm: "0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A",
        md: "0px 2px 4px -2px #1018280F, 0px 4px 8px -2px #1018281A",
        lg: "0px 4px 6px -2px #10182808, 0px 12px 16px -4px #10182814",
        xl: "0px 8px 8px -4px #10182808, 0px 20px 24px -4px #10182814",
        "2xl": "0px 24px 48px -12px #1018282E",
        "3xl": "0px 32px 64px -12px #10182824",
        top: "0px -4px 10px 0px rgba(102, 102, 102, 0.10)",
        bottom: "0px 4px 10px 0px rgba(102, 102, 102, 0.10)",
        brand:
          "0px 167px 47px 0px rgba(0, 0, 0, 0.00), 0px 107px 43px 0px rgba(0, 0, 0, 0.00), 0px 60px 36px 0px rgba(0, 0, 0, 0.01), 0px 27px 27px 0px rgba(0, 0, 0, 0.02), 0px 7px 15px 0px rgba(0, 0, 0, 0.02), 0px 0px 0px 0px rgba(0, 0, 0, 0.02)",
        feedbackCard:
          "0px 139px 39px 0px rgba(0, 0, 0, 0.00), 0px 89px 36px 0px rgba(0, 0, 0, 0.00), 0px 50px 30px 0px rgba(0, 0, 0, 0.01), 0px 22px 22px 0px rgba(0, 0, 0, 0.02), 0px 6px 12px 0px rgba(0, 0, 0, 0.02)",
      },
      fontFamily: {
        sora: ["var(--font-inter)"],
      },
    },
  },
  plugins: [],
};
export default config;

export const tw: any = config.theme?.extend;
