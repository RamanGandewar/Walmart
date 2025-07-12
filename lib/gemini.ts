import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function extractInvoiceData(imageFile: File) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })
    
    // Convert file to base64
    const arrayBuffer = await imageFile.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')
    
    const prompt = `
    Extract invoice data from this image and return ONLY valid JSON with this exact structure:
    {
      "vendor_name": "string",
      "invoice_number": "string", 
      "total_amount": number,
      "invoice_date": "YYYY-MM-DD",
      "po_number": "string or null",
      "line_items": [
        {
          "description": "string",
          "quantity": number,
          "unit_price": number,
          "total": number
        }
      ],
      "vendor_address": "string",
      "confidence_score": number (0-100)
    }
    
    Rules:
    - Return ONLY the JSON object, no other text
    - Use null for missing fields
    - Ensure total_amount is a number
    - confidence_score should reflect extraction accuracy
    - If you can't extract data, return confidence_score: 0
    `

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64,
          mimeType: imageFile.type
        }
      }
    ])
    
    const response = await result.response
    const text = response.text()
    
    // Parse JSON response
    const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim()
    const extractedData = JSON.parse(cleanedText)
    
    return {
      success: true,
      data: extractedData,
      confidence: extractedData.confidence_score || 85
    }
    
  } catch (error) {
    console.error('Gemini extraction error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Extraction failed',
      confidence: 0
    }
  }
}

export async function analyzeVendorCommunication(emailContent: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })
    
    const prompt = `
    Analyze this vendor communication and return ONLY valid JSON:
    {
      "sentiment_score": number (-100 to 100, negative = concerning),
      "dispute_probability": number (0-100, likelihood of dispute),
      "intent": "complaint" | "inquiry" | "dispute" | "approval" | "information",
      "urgency": "low" | "medium" | "high",
      "key_concerns": ["string array of main issues"],
      "suggested_response": "brief professional response"
    }
    
    Email content: "${emailContent}"
    `
    
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim()
    return JSON.parse(cleanedText)
    
  } catch (error) {
    console.error('Communication analysis error:', error)
    return {
      sentiment_score: 0,
      dispute_probability: 50,
      intent: "inquiry",
      urgency: "medium",
      key_concerns: ["Analysis failed"],
      suggested_response: "Thank you for your message. We will review and respond shortly."
    }
  }
}