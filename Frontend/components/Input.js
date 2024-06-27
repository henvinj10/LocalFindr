import React, { useCallback, useState } from "react";
import {
  Image,
  TextInput,
  View,
  Text,
  StyleSheet,
  Platform,
} from "react-native";

const InputNext = ({
  id = "Input",
  style,
  color,
  primary,
  secondary,
  tertiary,
  black,
  white,
  gray,
  danger,
  warning,
  success,
  info,
  search,
  disabled,
  label,
  icon,
  marginBottom,
  marginTop,
  marginHorizontal,
  marginVertical,
  marginRight,
  marginLeft,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setFocused] = useState(false);

  const handleFocus = useCallback(
    (event, focus) => {
      setFocused(focus);
      focus && onFocus?.(event);
      !focus && onBlur?.(event);
    },
    [onFocus, onBlur]
  );

  const colors = {
    primary: "#primaryColor",
    secondary: "#secondaryColor",
    tertiary: "#tertiaryColor",
    black: "#000000",
    white: "#FFFFFF",
    gray: "#808080",
    danger: "#FF0000",
    warning: "#FFA500",
    success: "#008000",
    info: "#0000FF",
    input: "#000000",
    icon: "#808080",
    focus: "#0000FF",
  };

  const sizes = {
    inputHeight: 40,
    inputRadius: 4,
    inputBorder: 1,
    inputPadding: 10,
    p: 14,
    s: 8,
  };

  const colorIndex = primary
    ? "primary"
    : secondary
    ? "secondary"
    : tertiary
    ? "tertiary"
    : black
    ? "black"
    : white
    ? "white"
    : gray
    ? "gray"
    : danger
    ? "danger"
    : warning
    ? "warning"
    : success
    ? "success"
    : info
    ? "info"
    : null;
  const inputColor = color
    ? color
    : colorIndex
    ? colors[colorIndex]
    : colors.gray;

  const inputBoxStyles = StyleSheet.flatten([
    style,
    {
      minHeight: sizes.inputHeight,
      ...(marginBottom && { marginBottom }),
      ...(marginTop && { marginTop }),
      ...(marginHorizontal && { marginHorizontal }),
      ...(marginVertical && { marginVertical }),
      ...(marginRight && { marginRight }),
      ...(marginLeft && { marginLeft }),
    },
  ]);

  const inputContainerStyles = StyleSheet.flatten([
    {
      minHeight: sizes.inputHeight,
      borderRadius: sizes.inputRadius,
      borderWidth: isFocused ? 2 : sizes.inputBorder,
      borderColor: isFocused ? colors.focus : inputColor,
    },
  ]);

  const inputStyles = StyleSheet.flatten([
    {
      flex: 1,
      zIndex: 2,
      height: "100%",
      fontSize: sizes.p,
      color: colors.input,
      paddingHorizontal: sizes.inputPadding,
    },
  ]);

  const inputID =
    Platform.OS === "android" ? { accessibilityLabel: id } : { testID: id };

  return (
    <View style={inputBoxStyles}>
      {label && (
        <Text style={{ fontWeight: "bold", marginBottom: sizes.s }}>
          {label}
        </Text>
      )}
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          },
          inputContainerStyles,
        ]}
      >
        {search && (
          <Image
            source={{ uri: "search_icon" }}
            style={{ marginLeft: sizes.inputPadding, tintColor: colors.icon }}
          />
        )}
        {icon && (
          <Image
            source={{ uri: icon }}
            style={{ marginLeft: sizes.inputPadding, tintColor: colors.icon }}
          />
        )}
        <TextInput
          {...inputID}
          {...props}
          style={inputStyles}
          editable={!disabled}
          placeholderTextColor={inputColor}
          onFocus={(event) => handleFocus(event, true)}
          onBlur={(event) => handleFocus(event, false)}
        />
        {danger && (
          <Image
            source={{ uri: "warning_icon" }}
            style={{ marginRight: sizes.s, tintColor: colors.danger }}
          />
        )}
        {success && (
          <Image
            source={{ uri: "check_icon" }}
            style={{
              width: 12,
              height: 9,
              marginRight: sizes.s,
              tintColor: colors.success,
            }}
          />
        )}
      </View>
    </View>
  );
};

export default InputNext;
