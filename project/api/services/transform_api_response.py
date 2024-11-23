import json

def transform_api_response(api_response):
    try:
        # Obtener el contenido de "recommendations" como string
        recommendations_raw = api_response["recommendations"]

        # Verificar si es un string antes de procesar
        if isinstance(recommendations_raw, str):
            # Limpiar el formato Markdown (```json ... ```)
            recommendations_clean = recommendations_raw.strip("```json").strip("```").strip()

            # Parsear el JSON desde el string limpio
            response_content = json.loads(recommendations_clean)
        else:
            # Si no es un string, usarlo directamente como JSON
            response_content = recommendations_raw

        # Transformar los datos en el formato esperado
        transformed_response = {
            "skillsComparison": {
                "matchingSkills": response_content.get("skills_comparison", {}).get("matching_skills", []),
                "missingSkills": response_content.get("skills_comparison", {}).get("missing_skills", [])
            },
            "missingExperience": response_content.get("missing_experience", []),
            "presentationImprovements": response_content.get("presentation_improvements", []),
            "customizationSuggestions": response_content.get("customization_suggestions", [])
        }

        return {"recommendations": transformed_response}

    except Exception as e:
        # Retornar un mensaje de error detallado
        return {"recommendations": {"error": f"Error processing the response: {str(e)}"}}
