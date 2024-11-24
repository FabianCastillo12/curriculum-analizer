import requests
import json
from dotenv import load_dotenv
import os

load_dotenv()

api_key_grok = os.getenv("API_KEY_GROK")

class CVAnalysisService:
    def __init__(self, api_key=api_key_grok, api_url="https://api.x.ai/v1/chat/completions"):
        self.api_key = api_key  # Tu clave API de Grok.ai
        self.api_url = api_url

    def get_recommendations(self, cv_text, job_description):
        # Crear el prompt
        prompt = (
            f"El siguiente es un CV:\n{cv_text}\n\n"
            f"Y esta es la descripción del trabajo:\n{job_description}\n\n"
            f"Proporciona recomendaciones **detalladas** y **específicas** para mejorar este CV y hacerlo más adecuado para el trabajo descrito. **DEBEN SER BIEN ESPECIFICAS**\n\n"
            f"Tu respuesta debe cumplir estrictamente con los siguientes requisitos:\n\n"
            f"1. Comparar las habilidades del CV con las habilidades requeridas en la oferta de trabajo. Identifica habilidades presentes en el CV que coinciden y habilidades faltantes.\n"
            f"2. Identificar cualquier experiencia relevante que falta en el CV con respecto a la oferta de trabajo.\n"
            f"3. Sugerir cómo mejorar la presentación del CV, como la claridad, la estructura o el diseño.\n"
            f"4. Dar sugerencias sobre cómo personalizar el CV para resaltar mejor los puntos que coinciden con la oferta.\n\n"
            f"5. Dar un porcentaje al final de la evaluación de la adecuación del CV al trabajo.\n\n"
            f"Tu respuesta **debe estar en formato JSON** y seguir estrictamente esta estructura:\n\n"
            f"{{\n"
            f'  "skills_comparison": {{\n'
            f'    "matching_skills": ["..."],\n'
            f'    "missing_skills": ["..."]\n'
            f'  }},\n'
            f'  "missing_experience": ["..."],\n'
            f'  "presentation_improvements": ["..."],\n'
            f'  "customization_suggestions": ["..."]\n'
            f'  "match_percentage": "xx"\n'
            f"}}\n\n"
            f"Si algún apartado no aplica, incluye una lista vacía (por ejemplo, \"missing_experience\": []). "
            f"No proporciones ningún texto fuera del formato JSON especificado."
            f"EL CONTENIDO DEBE SER BIEN ESPECIFICO Y DETALLADO Y EN ESPAÑOL."
        )
        
        # Crear el cuerpo de la solicitud
        data = {
            "messages": [
                {"role": "system", "content": "You are a helpful assistant specialized in CV analysis."},
                {"role": "user", "content": prompt}
            ],
            "model": "grok-beta",  # Especifica el modelo Grok que deseas usar
            "temperature": 0.3
        }

        # Configurar los encabezados para la autenticación y tipo de contenido
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.api_key}"
        }

        # Realizar la solicitud POST a la API de Grok.ai
        response = requests.post(self.api_url, headers=headers, data=json.dumps(data))

        # Verificar que la respuesta sea exitosa
        if response.status_code == 200:
            # Obtener la respuesta del modelo
            response_data = response.json()
            content = response_data.get("choices", [])[0].get("message", {}).get("content", "No recommendations found.")
            
            # Parsear la respuesta en JSON
            recommendations_json = self.parse_recommendations(content)
            return recommendations_json
        else:
            # Manejo de errores en caso de fallos en la API
            return {"error": f"Error: {response.status_code}, {response.text}"}

    def parse_recommendations(self, content):
        # Eliminar los caracteres de formato adicionales
        content = content.strip("```json\n").strip("\n```")
        
        # Convertir el contenido en un objeto JSON
        recommendations_json = json.loads(content)
        return recommendations_json