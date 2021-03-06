
/**
 * root模块
 * 框架主要页面
 */
import Main from '@/components/main'
export default [
	{
		path: '/login',
		name: 'login',
		meta: {
			title: 'Login - 登录',
			hideInMenu: true
		},
		component: () => import('@/view/login/login.vue')
	},
	{
		path: '/',
		name: '_home',
		redirect: '/home',
		component: Main,
		meta: {
			hideInMenu: false,
			notCache: true
		},
		children: [
			{
				path: '/home',
				name: 'home',
				meta: {
					hideInMenu: false,
					title: '首页',
					notCache: true,
					icon: 'md-home'
				},
				component: () => import('@/view/home')
			}
		]
	},
	{
		path: '/401',
		name: 'error_401',
		meta: {
			hideInMenu: true
		},
		component: () => import('@/view/error-page/401.vue')
	},
	{
		path: '/500',
		name: 'error_500',
		meta: {
			hideInMenu: true
		},
		component: () => import('@/view/error-page/500.vue')
	},
	{
		path: '*',
		name: 'error_404',
		meta: {
			hideInMenu: true
		},
		component: () => import('@/view/error-page/404.vue')
	}
]
