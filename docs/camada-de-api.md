# 📡 Camada API

### Use uma única instância do cliente API

Não importa se seu aplicativo está consumindo RESTful ou GraphQL API, tenha uma única instância do cliente API que foi pré-configurada e reutilizada em todo o aplicativo. Por exemplo, ter um único cliente API ([axios](https://github.com/axios/axios) / [graphql-request](https://github.com/prisma-labs/graphql-request) / [apollo-client](https://www.apollographql.com/docs/react/)) instância com configuração predefinida.

[Código de exemplo de cliente API](../src/lib/axios.ts)

### Definir e exportar declarações de solicitação

Em vez de declarar solicitações de API toda vez, defina-as e exporte-as separadamente. Se for uma API restful, uma declaração seria uma função de busca que chama um endpoint. Por outro lado, as solicitações de APIs GraphQL são declaradas por meio de consultas e mutações que podem ser consumidas por bibliotecas de busca de dados, como [react-query](https://react-query.tanstack.com/), [apollo-client](https://www.apollographql.com/docs/react/), [urql](https://formidable.com/open-source/urql/), etc. Isso torna mais fácil rastrear quais terminais estão definidos e disponíveis no aplicativo. Você também pode digitar as respostas e inferir mais para uma boa segurança de tipo dos dados. Você também pode definir e exportar os hooks de API correspondentes a partir daí.

[Código de exemplo de declaração de solicitação de API](../src/features/discussions/api/getDiscussions.ts)
