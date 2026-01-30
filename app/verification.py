import base64
import requests
import os
import json
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_IMAGE_MODEL = "gemini-1.5-flash" # More recent and cheaper
GEMINI_VIDEO_MODEL = "gemini-1.5-flash"
GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models"

MAX_IMAGE_MB = 10
MAX_VIDEO_MB = 30

async def verify_flood_media(media_bytes: bytes, content_type: str):
    """
    Verifies if the uploaded media shows a flood incident using Gemini AI.
    """
    if not GEMINI_API_KEY:
        print("Warning: GEMINI_API_KEY not set. Verification skipped.")
        return {"verified": True, "status": "no_key", "reason": "API Key missing"}

    is_image = content_type in ["image/jpeg", "image/png", "image/jpg"]
    is_video = content_type in ["video/mp4", "video/webm", "video/quicktime"]

    if not (is_image or is_video):
        return {"verified": False, "status": "rejected", "reason": "Unsupported media type"}

    size_mb = len(media_bytes) / (1024 * 1024)
    if is_image and size_mb > MAX_IMAGE_MB:
        return {"verified": False, "status": "rejected", "reason": "Image too large"}
    if is_video and size_mb > MAX_VIDEO_MB:
        return {"verified": False, "status": "rejected", "reason": "Video too large"}

    encoded_media = base64.b64encode(media_bytes).decode("utf-8")
    model = GEMINI_IMAGE_MODEL if is_image else GEMINI_VIDEO_MODEL

    prompt = """
    You are a flood incident verification system.
    Analyze the media carefully and respond STRICTLY in JSON:
    1. Does this media depict REAL flooding? (A flood incident includes overflowing rivers, submerged streets, flooded houses, etc.)
    2. Is the flooding caused by natural or environmental factors?
    3. Does the media appear staged, reused, edited, or AI-generated?
    4. Give a confidence score from 0 to 100.

    Respond ONLY in this JSON format:
    {
      "is_flood": true/false,
      "is_real": true/false,
      "confidence": number,
      "reason": "short explanation"
    }

    Be conservative. If unsure, lower the confidence.
    """

    payload = {
        "contents": [{
            "parts": [
                {"text": prompt},
                {
                    "inlineData": {
                        "mimeType": content_type,
                        "data": encoded_media
                    }
                }
            ]
        }]
    }

    try:
        response = requests.post(
            f"{GEMINI_BASE_URL}/{model}:generateContent?key={GEMINI_API_KEY}",
            json=payload,
            timeout=60
        )
        
        if response.status_code != 200:
            print(f"Gemini error: {response.text}")
            return {"verified": False, "status": "error", "reason": "Gemini analysis failed"}

        ai_response = response.json()
        ai_text = ai_response["candidates"][0]["content"]["parts"][0]["text"]
        
        # Strip potential markdown code blocks
        if ai_text.startswith("```json"):
            ai_text = ai_text[7:-3].strip()
        elif ai_text.startswith("```"):
            ai_text = ai_text[3:-3].strip()
            
        ai_result = json.loads(ai_text)
        
        confidence = ai_result.get("confidence", 0)
        is_flood = ai_result.get("is_flood", False)
        is_real = ai_result.get("is_real", False)

        # HARD GATE
        if is_flood and is_real and confidence >= 70:
            return {
                "verified": True,
                "status": "approved",
                "media_type": "image" if is_image else "video",
                "confidence": confidence,
                "reason": ai_result.get("reason")
            }

        return {
            "verified": False,
            "status": "rejected",
            "media_type": "image" if is_image else "video",
            "confidence": confidence,
            "reason": ai_result.get("reason")
        }
    except Exception as e:
        print(f"Verification Error: {e}")
        return {"verified": False, "status": "error", "reason": str(e)}
