
# 🗄️ Estrutura do projeto

A maior parte do código reside na pasta `src` e tem a seguinte aparência:

```
src
|
+-- assets            # a pasta de assets pode conter todos os arquivos estáticos, como imagens, fontes, etc.
|
+-- components        # componentes compartilhados usados em todo a aplicação.
|
+-- config            # todas as configurações globais, variáveis de ambiente etc. São exportadas a partir daqui e usadas na aplicação.
|
+-- features          # módulos baseados em features.
|
+-- hooks             # hooks compartilhados, usados em toda a aplicação.
|
+-- lib               # reexportar diferentes bibliotecas pré-configuradas para o aplicativo.
|
+-- providers         # todos os providers da aplicação.
|
+-- routes            # configuração das rotas.
|
+-- stores            # armazenamento de estados globais.
|
+-- test              # utilitários de test e servidor mock.
|
+-- types             # types compartilhados usados em toda a aplicação.
|
+-- utils             # funções compartilhadas usadas em toda a apliacação.
```

Para escalar o aplicativo da maneira mais fácil e sustentável, mantenha a maior parte do código dentro da pasta `features`, que deve conter diferentes itens baseados nesses recursos. Cada pasta `feature` deve conter um código específico de domínio para um determinado recurso. Isso permitirá que você mantenha o escopo de funcionalidades para um recurso e não misture suas declarações com coisas compartilhadas. Isso é muito mais fácil de manter do que uma estrutura de pastas simples com muitos arquivos.

Uma `feature` pode ter a seguinte estrutura:

```
src/features/users-feature
|
+-- api         # exportação de declarações de request de API e hooks de API relacionados a um recurso específico.
|
+-- assets      # pasta de assets pode conter todos os arquivos estáticos para um recurso específico.
|
+-- components  # componentes com escopo para uma feature específica.
|
+-- hooks       # hooks com escopo para uma feature específica.
|
+-- routes      # componentes de rota para páginas de um recurso específico.
|
+-- stores      # states para um recurso específico.
|
+-- types       # types específicos para a feature.
|
+-- utils       # funções utilitárias para um recurso específico.
|
+-- index.ts    # ponto de entrada para o recurso, ele deve servir como a API pública da feature fornecida e exportar tudo o que deve ser usado fora da feature.
```

Uma pasta de recursos também pode conter outros recursos (se usados apenas dentro do recurso pai) ou ser mantida separada, é uma questão de preferência.

Tudo de uma feature deve ser exportado do arquivo `index.ts`, que se comporta como a API pública da feature.

Você deve importar coisas de outras features apenas usando:
`import {SomeComponent} from "@/features/users-feature" `{.js/.ts}

e não

`import {AwesomeComponent} from "@/features/awesome-feature/components/AwesomeComponent`

Isso também pode ser configurado na configuração ESLint para impedir a importação posterior pela seguinte regra:

```
{
    rules: {
        'no-restricted-imports': [
            'error',
            {
                patterns: ['@/features/*/*'],
            },
        ],

    ...resto da configuração
}
```

Isso foi inspirado em como [NX] (https://nx.dev/) lida com bibliotecas que estão isoladas, mas disponíveis para serem usadas por outros módulos. Pense em uma feature como uma biblioteca ou um módulo que é independente, mas pode expor diferentes partes a outras features por meio de seu ponto de entrada.