# 🧪 Teste

Este [tweet] (https://twitter.com/rauchg/status/807626710350839808) explica de forma concisa como pensar sobre o teste. Você obterá o máximo de benefícios com os testes de integração e e2e. Os testes de unidade são bons, mas não darão a você tanta confiança de que seu aplicativo está funcionando quanto os testes de integração.

## Tipos de testes:

### Testes de Unidade

O teste de unidade, como a nomenclatura já revela, é um tipo de teste em que as unidades de um aplicativo são testadas isoladamente.
Você deve escrever testes de unidade para componentes e funções compartilhados que são usados ​​em todo o aplicativo, pois podem ser usados ​​em diferentes cenários que podem ser difíceis de reproduzir em testes de integração.

### Testes de Integração

O teste de integração é um método de testar várias partes de um aplicativo de uma vez.
A maioria dos seus testes deve ser de integração, pois eles lhe darão os maiores benefícios e confiança para o seu esforço investido. Os testes de unidade por si só não garantem que seu aplicativo funcionará mesmo se esses testes passarem, porque a relação entre as unidades pode estar errada. Você deve testar diferentes recursos com testes de integração.

### E2E

Teste de ponta a ponta é um método de teste em que um aplicativo é testado como uma entidade completa.
Normalmente esses testes consistem em rodar toda a aplicação com o front-end e o back-end de forma automatizada e verificar se todo o sistema funciona. Geralmente é escrito da maneira como o aplicativo deve ser usado pelo usuário.

## Ferramentas:

#### [Jest] (https://jestjs.io/)

Jest é uma estrutura de teste com recursos completos e é o padrão de fato quando se trata de testar aplicativos JavaScript. É muito flexível e configurável para testar front-ends e back-ends.

#### [Testing Library] (https://testing-library.com/)

A Testing Library é um conjunto de bibliotecas e ferramentas que tornam o teste mais fácil do que nunca. Sua filosofia é testar seu aplicativo de uma forma que esteja sendo usado por um usuário do mundo real, em vez de testar os detalhes de implementação. Por exemplo, não teste qual é o valor do estado atual em um componente, mas teste o que aquele componente renderiza na tela para o usuário. Se você refatorar seu aplicativo para usar uma solução de gerenciamento de estado diferente, os testes ainda serão relevantes, pois a saída do componente real para o usuário não mudou.

#### [Cypress] (https://www.cypress.io/)

Cypress é uma ferramenta para executar testes e2e de forma automatizada.
Você define todos os comandos que um usuário do mundo real executaria ao usar o aplicativo e, em seguida, inicia o teste. Pode ser iniciado em 2 modos:

- Modo de navegador - abrirá um navegador dedicado e executará seu aplicativo do início ao fim. Você obtém um bom conjunto de ferramentas para visualizar e inspecionar seu aplicativo em cada etapa. Como essa é uma opção mais cara, você deseja executá-la apenas localmente ao desenvolver o aplicativo.
- Modo sem cabeça - iniciará um navegador sem cabeça e executará seu aplicativo. Muito útil para integração com CI / CD para executá-lo em cada implantação.

É muito configurável com plugins e comandos. Você pode até emparelhá-lo com a [Biblioteca de teste] (https://testing-library.com/docs/cypress-testing-library/intro/), o que torna seus testes ainda mais fáceis de escrever.

Você também pode escrever comandos personalizados para abstrair algumas tarefas comuns.

#### [MSW] (https://mswjs.io)

Para fazer o protótipo da API, use o msw, que é uma ótima ferramenta para criar front-ends rapidamente sem se preocupar com servidores. Não é um back-end real, mas um servidor simulado dentro de um service worker que intercepta todas as solicitações HTTP e retorna as respostas desejadas com base nos manipuladores que você definir. Isso é especialmente útil se você só tiver acesso ao front-end e estiver bloqueado por alguns recursos não implementados no back-end. Dessa forma, você não será forçado a esperar a conclusão do recurso ou os dados de resposta do código fixo, mas usar chamadas HTTP reais para construir recursos de front-end.

Ele pode ser usado para projetar terminais de API. A lógica de negócios da API simulada pode ser criada em seus manipuladores.

Tendo um servidor de API simulado totalmente funcional também útil quando se trata de testes, você não precisa fazer uma busca simulada, mas fazer solicitações ao servidor simulado com os dados que seu aplicativo espera.
