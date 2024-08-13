'use client'

import { useState } from 'react'
import Image from 'next/image'

const CarIdentifier = () => {
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.size > 5 * 1024 * 1024) { // Limit file size to 5MB
        setError('File size exceeds 5MB')
        return
      }
      setImage(file)
      setPreview(URL.createObjectURL(file))
      setError(null)
    }
  }

  const identifyCar = async () => {
    if (!image) return

    setLoading(true)
    setResult(null)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('image', image)

      const response = await fetch('/api/identify-car', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to identify car')
      }

      setResult(data.result)
    } catch (error) {
      console.error('Error identifying car:', error)
      setError(`Error identifying car: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Identify Your Car</h2>
        <div className="mb-4">
          <label htmlFor="car-image" className="block text-sm font-medium text-gray-700 mb-2">
            Upload a car image
          </label>
          <input
            type="file"
            id="car-image"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {preview && (
          <div className="mb-4">
            <Image src={preview} alt="Car preview" width={300} height={200} className="rounded-lg" />
          </div>
        )}
        <button
          onClick={identifyCar}
          disabled={!image || loading}
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold
            disabled:bg-gray-300 disabled:cursor-not-allowed
            hover:bg-blue-700 transition-colors"
        >
          {loading ? 'Identifying...' : 'Identify Car'}
        </button>
      </div>
      {result && (
        <div className="p-6 bg-gray-50 border-t">
          <h3 className="text-xl font-semibold mb-2">Result:</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{result}</p>
        </div>
      )}
    </div>
  )
}

export default CarIdentifier