import Profile from '@/components/sideMenuPages/Profile'
import Loans from '@/components/sideMenuPages/Loans'
import Instruments from '@/components/sideMenuPages/instruments/Instruments'
import Address from '@/components/sideMenuPages/address/Address'
import Notifications from '@/components/sideMenuPages/Notifications'
import Promotions from '@/components/sideMenuPages/Promotions'

export const routes = [
  {
    path: '/profile',
    name: 'Профиль',
    component: Profile
  },{
    path: '/loans',
    name: 'Займы',
    component: Loans
  },{
    path: '/instruments',
    name: 'Инструменты',
    component: Instruments
  },{
    path: '/address',
    name: 'Адрес',
    component: Address
  },{
    path: '/notifications',
    name: 'Уведомления',
    component: Notifications
  },{
    path: '/promotions',
    name: 'Акции и Бонусы',
    component: Promotions
  },
]
