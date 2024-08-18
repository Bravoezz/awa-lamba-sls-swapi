### Proyecto StarWars API

#### Tecnologías Utilizadas

Este proyecto ha sido desarrollado con las siguientes tecnologías y herramientas:

- **Serverless Framework:** Marco de trabajo que permite desarrollar, desplegar y escalar aplicaciones sin preocuparse por la infraestructura.
- **TypeScript:** Lenguaje de programación tipado que mejora la calidad y mantenimiento del código con bases en Javascript.
- **Express:** Marco de aplicación web para Node.js, proporcionando una base robusta para construir servicios RESTful.
- **Express Validator:** Middleware para validación de datos de entrada en las solicitudes HTTP.
- **Tsyringe:** Paquete para el manejo de inyección de dependencias en la implementación de arquitectura en capas.

#### Persistencia de Datos

La app usa DynamoDb para guardar los nuevos datos que se ingresan

#### Swagger

La documentación de la API está implementada con Swagger y se puede acceder a ella mediante la ruta `/api/v1/docs/`

#### Testing

Para ejecutar los test unitarios correr el comando `npm run test`

#### Instrucciones para Levantar el Proyecto

Para levantar el proyecto en AWS, sigue estos pasos:

1. **Configura AWS CLI:** Asegúrate de tener configurada la AWS CLI en tu máquina con las credenciales adecuadas.

2. **Instala Dependencias:** Ejecuta `npm install` en la terminal para instalar todas las dependencias necesarias.

3. **Deploy con Serverless:** Utiliza el comando `npm run deploy` este comando ejecutara el comando `serverless deploy --verbose` de serverless framework para desplegar el proyecto en aws.
