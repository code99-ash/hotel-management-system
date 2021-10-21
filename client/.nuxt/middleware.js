const middleware = {}

middleware['adminAuth'] = require('..\\middleware\\adminAuth.js')
middleware['adminAuth'] = middleware['adminAuth'].default || middleware['adminAuth']

middleware['adminLogout'] = require('..\\middleware\\adminLogout.js')
middleware['adminLogout'] = middleware['adminLogout'].default || middleware['adminLogout']

middleware['refreshToken'] = require('..\\middleware\\refreshToken.js')
middleware['refreshToken'] = middleware['refreshToken'].default || middleware['refreshToken']

middleware['userAuth'] = require('..\\middleware\\userAuth.js')
middleware['userAuth'] = middleware['userAuth'].default || middleware['userAuth']

export default middleware
