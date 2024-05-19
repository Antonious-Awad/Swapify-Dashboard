import { ThemeConfig } from 'antd'

import { colors } from './colors'

export const APP_THEME: ThemeConfig = {
  token: {
    colorPrimary: colors.brand[400],
  },
  components: {
    Button: {
      primaryColor: colors.neutral[200],
    },
  },
}
