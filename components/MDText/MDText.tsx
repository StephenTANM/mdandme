import React from "react"
import { Text, StyleSheet, TextProps, TextStyle } from "react-native"

// Define an interface for your custom props
interface MDTextProps extends TextProps {
  size?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body" | "caption" // Define standard sizes
  color?: string // Define a color prop
  bold?: boolean // Define a bold prop
}

const MDText: React.FC<MDTextProps> = ({
  size = "body", // Default to 'body' if size is not provided
  color = "black",
  bold = false, // Default to non-bold
  style,
  children,
  ...props
}) => {
  // Define font sizes for each text style
  const fontSizes: { [key in NonNullable<MDTextProps["size"]>]: number } = {
    h1: 32,
    h2: 28,
    h3: 24,
    h4: 20,
    h5: 18,
    h6: 16,
    body: 14,
    caption: 12,
  }
  const fontWeight = bold ? "bold" : "normal" // Set font weight based on the 'bold' prop

  const fontSize = fontSizes[size] // Get font size based on the 'size' prop

  return (
    <Text
      style={[styles.text, { fontSize, color, fontWeight }, style]}
      {...props}
    >
      {children}
    </Text>
  )
}

// Default styles
const styles = StyleSheet.create({
  text: {
    color: "black", // Default color, you can change this or make it customizable
    // Add other default styles like fontFamily if needed
  },
})

export default MDText
