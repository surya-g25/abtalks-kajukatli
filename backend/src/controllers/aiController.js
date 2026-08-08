import asyncHandler from '../middlewares/asyncHandler.js'
import ApiResponse from '../utils/apiResponse.js'
import * as aiService from '../services/aiService.js'

export const generateContent = asyncHandler(async (req, res) => {
  const { type, options } = req.body

  if (!type) {
    return res.status(400).json(new ApiResponse(400, null, 'Generation type parameter is required'))
  }

  const generatedText = await aiService.generateAIContent(type, options || {})

  return res.status(200).json(
    new ApiResponse(
      200,
      { text: generatedText },
      `AI content for ${type} generated successfully`
    )
  )
})
