import { Location } from '../../common/types'

export type GetAdminInfoRes = {
  success: boolean
  data: {
    username: string
    email: string
    phone: string
    password: string
    location: Location
    image: string
  }
}
