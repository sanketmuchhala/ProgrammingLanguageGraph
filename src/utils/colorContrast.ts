// WCAG 2.1 compliant color contrast utilities for logo backgrounds

// Calculate relative luminance per WCAG 2.1 specification
// https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
export function calculateLuminance(hexColor: string): number {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;

  const rLinear = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const gLinear = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const bLinear = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

// Get logo background color - use the logo's own color for seamless blend
// For logos with built-in backgrounds (like JS yellow square), this prevents
// the "nested square" effect by matching the node background to the logo background
export function getAdaptiveLogoBackground(
  logoColor: string | null,
  isDarkMode: boolean
): string {
  if (!logoColor) {
    // No logo color defined - use theme-appropriate background
    return isDarkMode ? '#1c2128' : '#ffffff';
  }

  // Use the logo's own dominant color as the node background
  // This creates a seamless blend between logo and node
  return logoColor;
}

// Get border color that creates subtle contrast with logo background
// Light logos get darker borders, dark logos get lighter borders
export function getLogoBorderColor(
  logoColor: string | null,
  isDarkMode: boolean
): string {
  if (!logoColor) {
    // Match theme border colors
    return isDarkMode ? '#30363d' : '#e2e5e9';
  }

  const luminance = calculateLuminance(logoColor);

  // Create subtle contrast: light logos get dark borders, dark logos get light borders
  return luminance > 0.5 ? '#00000030' : '#ffffff30';
}
