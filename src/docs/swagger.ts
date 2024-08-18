import swaggerJSDoc, {OAS3Definition, OAS3Options} from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
    openapi: "3.0.0",
    info: {
        title: "Swapi Challenge: Documentación de API",
        version: "1.0.0",
    },
    servers: [
        {
            url: process.env.API_URL!,
            description: "Serverless Dev Deploy",
        },
    ],
    components: {
        schemas: {
            //Entidades
            Character: {
                type: "object",
                properties: {
                    nombre: {
                        type: "string",
                        example: "Luke Skywalker"
                    },
                    estatura: {
                        type: "number",
                        example: 172
                    },
                    peso: {
                        type: "number",
                        example: 77
                    },
                    color_cabello: {
                        type: "string",
                        example: "blond"
                    },
                    color_piel: {
                        type: "string",
                        example: "fair"
                    },
                    color_ojos: {
                        type: "string",
                        example: "blue"
                    },
                    fecha_nacimiento: {
                        type: "string",
                        example: "19BBY"
                    },
                    genero: {
                        type: "string",
                        example: "male"
                    },
                    vehiculos: {
                        type: "array",
                        example: [
                            process.env.API_URL!+"/api/v1/vehicles/14/",
                            process.env.API_URL!+"/api/v1/vehicles/30/"
                        ],
                        items: {type: "string"}
                    },
                    fuente_datos: {
                        type: "string",
                        example: "swapi"
                    }
                }
            },
            Vehicle: {
                type: "object",
                properties: {
                    nombre: {
                        type: "string",
                        example: "Sand Crawler"
                    },
                    modelo: {
                        type: "string",
                        example: "Digger Crawler"
                    },
                    fabricante: {
                        type: "string",
                        example: "Corellia Mining Corporation"
                    },
                    costo_en_creditos: {
                        type: "number",
                        example: 150000
                    },
                    longitud: {
                        type: "number",
                        example: 36.8
                    },
                    velocidad_maxima: {
                        type: "number",
                        example: 30
                    },
                    tripulacion: {
                        type: "number",
                        example: 46
                    },
                    pasajeros: {
                        type: "number",
                        example: 30
                    },
                    capacidad_carga: {
                        type: "number",
                        example: 50000
                    },
                    consumibles: {
                        type: "string",
                        example: "2 months"
                    },
                    clase_vehiculo: {
                        type: "string",
                        example: "wheeled"
                    }
                }
            },
            //Respuestas Base
            RequestValidationError: {
                type: "object",
                properties: {
                    message: {
                        type: "string",
                        example: "an error occurred by some property"
                    },
                    errors: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/PropertyError"
                        }
                    }
                }
            },
            PropertyError: {
                type: "object",
                properties: {
                    location: {type: "string", example: "query.for.error"},
                    msg: {type: "string", example: "Some Error value"},
                    path: {type: "string", example: "query.for.error"},
                    type: {type: "string", example: "field|param|etc"}
                }
            },
            ErrorMessage: {
                type: "object",
                properties: {
                    message: {type: "string", example: "Mensaje de error"},
                    context: {type: "object", properties: { key: {type: "string", example: "value"} }}
                }
            },
            ErrorResponse: {
                type: "object",
                properties: {
                    errors: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/ErrorMessage"
                        }
                    }
                }
            },
            BaseResponse: {
                type: "object",
                properties: {
                    res: {type: "boolean", example: true},
                    message: {type: "string", example: "Operación exitosa"},
                }
            },
            //API Resquest & Response
            CharacterListResponse: {
                type: "object",
                properties: {
                    res: {type: "boolean", example: true},
                    message: {type: "string", example: "Operación exitosa"},
                    data: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/Character"
                        }
                    }
                }
            },
            CharacterCreateRequest: {
                type: "object",
                properties: {
                    nombre: { type: "string", example: "Luke Skywalker" },
                    estatura: { type: "number", example: 172 },
                    peso: { type: "number", example: 77 },
                    color_cabello: { type: "string", example: "blond" },
                    color_piel: { type: "string", example: "fair" },
                    color_ojos: { type: "string", example: "blue" },
                    fecha_nacimiento: { type: "string", example: "19BBY" },
                    genero: { type: "string", example: "male" },
                }
            },
            CharacterCreateResponse: {
                type: "object",
                properties: {
                    res: {type: "boolean", example: true},
                    message: {type: "string", example: "Operación exitosa"},
                    data: {
                        type: "object",
                        $ref: "#/components/schemas/Character"
                    }
                }
            },
            VehicleResponse: {
                type: "object",
                properties: {
                    res: {type: "boolean", example: true},
                    message: {type: "string", example: "Operación exitosa"},
                    data: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/Vehicle"
                        }
                    }
                }
            }
        }
    }
};

const swaggerOptions: OAS3Options = {
    swaggerDefinition,
    apis: [
        "src/modules/**/routes/*.js",
    ]
}

export default swaggerJSDoc(swaggerOptions);