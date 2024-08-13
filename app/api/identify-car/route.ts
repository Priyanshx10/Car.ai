import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  console.log('API route called');
  try {
    const formData = await req.formData();
    const image = formData.get('image') as File;

    if (!image) {
      console.log('No image provided');
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    console.log('Image received:', image.name, image.type, image.size);

    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY!);
    console.log('API key used:', process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY?.slice(0, 5) + '...');

    // Update the model to gemini-1.5-flash
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const imageData = await fileToGenerativePart(image);
    console.log('Image data prepared');

    const result = await model.generateContent([
      'Identify the car in this image and provide details about it.',
      imageData,
    ]);

    console.log('Content generated');

    const response = await result.response;
    const text = response.text();

    console.log('Response text:', text.slice(0, 100) + '...');

    return NextResponse.json({ result: text });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: 'Error identifying car: ' + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}

async function fileToGenerativePart(file: File): Promise<{ inlineData: { data: string; mimeType: string } }> {
  const arrayBuffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);
  const base64String = btoa(String.fromCharCode.apply(null, Array.from(uint8Array)));

  return {
    inlineData: { data: base64String, mimeType: file.type },
  };
}