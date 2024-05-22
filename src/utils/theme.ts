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
    Layout: {
      siderBg: '#fff',
      headerBg: '#fff',
    },
    Menu: {
      groupTitleColor: colors.neutral[300],
      groupTitleFontSize: 12,
      itemColor: colors.neutral[300],
      itemSelectedBg: colors.brand[300],
      itemSelectedColor: '#fff',
    },
    Table: {
      headerBg: '#fff',
      headerColor: colors.neutral[300],
    },
  },
}
