import { ThemeConfig } from 'antd'

import { colors } from '../styles/colors'

export const APP_THEME: ThemeConfig = {
  token: {
    colorPrimary: colors.brand[400],
    fontFamily: 'Poppins',
    linkDecoration: 'none',
  },
  components: {
    Button: {
      primaryColor: colors.neutral[200],
    },
  },
}
