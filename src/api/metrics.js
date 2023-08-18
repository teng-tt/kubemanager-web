import request from '@/utils/request'

export function getDashboardData() {
	let url = "/metrics/dashboard"
	return request({
		url: url,
		method: "get",
	})
}