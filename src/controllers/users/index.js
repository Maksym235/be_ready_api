const { controlWrapper } = require('../../helpers')
const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const current = require('./current')
const updateLang = require('./updateLang')
const updateTheme = require('./updateTheme')
const ChangePassword = require('./changePassword')
const ResetPassword = require('./ResetPassword')
const newPassword = require('./newPassword')
const getUserRequests = require('./getUserRequests')
const editUserRequests = require('./editRequest')
const getUsersById = require('./getById')
const googleAuth = require('./googleLogin')
const updateData = require('./updateData')
const sendFriendRequest = require('./sendFriendRequest')
const editFriendRequest = require('./editFriendRequest')
const deleteFriend = require('./deleteFriend')
const changeAvatar = require('./changeAvatar')
const resetToDefaultAvatar = require('./resetToDefaultAvatar')
const getFriendsTripRequests = require('./getFriendsTripRequests')
module.exports = {
	register: controlWrapper(register),
	login: controlWrapper(login),
	logout: controlWrapper(logout),
	current: controlWrapper(current),
	updateLang: controlWrapper(updateLang),
	updateTheme: controlWrapper(updateTheme),
	resetPassword: controlWrapper(ResetPassword),
	changePassword: controlWrapper(ChangePassword),
	newPassword: controlWrapper(newPassword),
	getRequests: controlWrapper(getUserRequests),
	editRequests: controlWrapper(editUserRequests),
	getUsersById: controlWrapper(getUsersById),
	googleLogin: controlWrapper(googleAuth),
	updateData: controlWrapper(updateData),
	sendFriendRequest: controlWrapper(sendFriendRequest),
	editFriendRequest: controlWrapper(editFriendRequest),
	deleteFriend: controlWrapper(deleteFriend),
	changeAvatar: controlWrapper(changeAvatar),
	resetToDefaultAvatar: controlWrapper(resetToDefaultAvatar),
	getFriendsTripRequests: controlWrapper(getFriendsTripRequests)
}
