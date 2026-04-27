import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PTC API",
      version: "1.0.0",
      description: "Documentacao da API do projeto PTC",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
    tags: [
      {
        name: "Calcados",
        description: "Operacoes CRUD de calcados",
      },
      {
        name: "Users",
        description: "Operacoes de usuarios",
      },
    ],
    components: {
      schemas: {
        Calcado: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            nome_produto: { type: "string", example: "Tenis Runner" },
            cor: { type: "string", example: "Preto" },
            marca: { type: "string", example: "CITi" },
            tamanho: { type: "integer", example: 40 },
            preco: { type: "integer", example: 299 },
            quantidade_em_estoque: { type: "integer", example: 10 },
          },
        },
        CalcadoInput: {
          type: "object",
          required: ["nome_produto", "cor", "marca", "tamanho", "preco", "quantidade_em_estoque"],
          properties: {
            nome_produto: { type: "string", example: "Tenis Runner" },
            cor: { type: "string", example: "Preto" },
            marca: { type: "string", example: "CITi" },
            tamanho: { type: "integer", example: 40 },
            preco: { type: "integer", example: 299 },
            quantidade_em_estoque: { type: "integer", example: 12 },
          },
        },
        CalcadoUpdate: {
          type: "object",
          properties: {
            nome_produto: { type: "string", example: "Tenis Runner 2" },
            cor: { type: "string", example: "Branco" },
            marca: { type: "string", example: "CITi" },
            tamanho: { type: "integer", example: 41 },
            preco: { type: "integer", example: 319 },
            quantidade_em_estoque: { type: "integer", example: 8 },
          },
        },
      },
    },
  },
  apis: ["./src/routes.ts", "./dist/routes.js"],
});
