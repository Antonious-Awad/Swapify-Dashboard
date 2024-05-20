import { ThemeConfig } from 'antd'

import { colors } from '../styles/colors'

export const APP_THEME: ThemeConfig = {
  token: {
    colorPrimary: colors.brand[300],
    fontFamily: 'Poppins',
    linkDecoration: 'none',
  },
  components: {
    Button: {
      primaryColor: colors.neutral[200],
      colorBorder: '#fff',
      defaultShadow: '#fff',
    },
    Input: {
      colorIcon: colors.brand[300],
      colorIconHover: colors.brand[400],
      colorBgBase: colors.neutral[200],
      colorBgBlur: colors.neutral[200],
    },
  },
}
