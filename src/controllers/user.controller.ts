import _ from 'lodash'
import httpStatus from 'http-status'

import ApiError from '@utils/ApiError'
import catchAsync from '@utils/catchAsync'

import { userService } from '@/services'
import { TQueryUsers } from '@/validations/user.validation'

const createUser = catchAsync(async (req, res) => {
  const { email, password, name, role } = req.body
  const user = await userService.createUser(email, password, name, role)
  res.status(httpStatus.CREATED).send(user)
})

const getUsers = catchAsync(async (req, res) => {
  const query: TQueryUsers = req.query
  const filter = _.pick(query, ['name', 'role'])
  const options = _.pick(query, ['sortBy', 'limit', 'page'])
  const result = await userService.queryUsers(filter, options)
  res.send(result)
})

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
  res.send(user)
})

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body)
  res.send(user)
})

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId)
  res.status(httpStatus.NO_CONTENT).send()
})

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
}
