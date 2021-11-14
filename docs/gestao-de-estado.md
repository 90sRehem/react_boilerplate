# 🗃️ Gestão do Estado

Não há necessidade de manter todo o seu estado em um único armazenamento centralizado. Existem diferentes necessidades para diferentes tipos de estado que podem ser divididos em vários tipos:

## Component State

Este é o estado de que apenas um componente precisa e não deve ser compartilhado em nenhum outro lugar. Mas você pode passá-lo como suporte para componentes filhos, se necessário. Na maioria das vezes, você deseja começar daqui e elevar o estado, se necessário, em outro lugar. Para este tipo de estado, você geralmente precisará de:

- [useState](https://reactjs.org/docs/hooks-reference.html#usestate) - para estados mais simples que são independentes
- [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer) - para estados mais complexos onde em uma única ação você deseja atualizar várias partes do estado

[Código de exemplo de estado de componente](../src/components/Layout/MainLayout.tsx)

## Estado da Aplicação

Este é o estado que controla as partes interativas de um aplicativo. Abrindo modais, notificações, mudando o modo de cor, etc. Para melhor desempenho e facilidade de manutenção, mantenha o estado o mais próximo possível dos componentes que o estão usando. Não torne tudo global fora da caixa.

Boas soluções de estado de aplicativo:

- [context](https://reactjs.org/docs/context.html) + [hooks](https://reactjs.org/docs/hooks-intro.html)
- [redux](https://redux.js.org/) + [redux toolkit](https://redux-toolkit.js.org/)
- [mobx](https://mobx.js.org)
- [zustand](https://github.com/pmndrs/zustand)
- [constate](https://github.com/diegohaz/constate)
- [jotai](https://github.com/pmndrs/jotai)
- [recoil](https://recoiljs.org/)

[Código de exemplo de estado da UI](../src/stores/notifications.ts)

## Estado do Cache do Servidor

Este é o estado que vem do servidor que está sendo armazenado em cache no cliente para uso posterior. É possível armazenar dados remotos dentro de um armazenamento de gerenciamento de estado, como redux, mas existem soluções melhores para isso.

Boas bibliotecas de cache de servidor:

- [react-query](https://react-query.tanstack.com/) - REST + GraphQL
- [swr](https://swr.vercel.app/) - REST + GraphQL
- [apollo client](https://www.apollographql.com/) - GraphQL
- [urql](https://formidable.com/open-source/urql/) - GraphQl

[Código de exemplo do estado do servidor](../src/features/discussions/api/getDiscussions.ts)

## Form State

Este é um estado que rastreia as entradas dos usuários em um formulário.

Os formulários no React podem ser [controlados] (https://reactjs.org/docs/forms.html#controlled-components) e [não controlados] (https://reactjs.org/docs/uncontrolled-components.html).

Dependendo das necessidades do aplicativo, eles podem ser bastante complexos, com muitos campos diferentes que requerem validação.

Embora seja possível construir qualquer formulário usando apenas React, existem soluções muito boas que ajudam a lidar com formulários como:

- [React Hook Form](https://react-hook-form.com/)
- [Formik](https://formik.org/)
- [React Final Form](https://github.com/final-form/react-final-form)

Crie o componente `Form` abstrato e todos os componentes do campo de entrada que envolvem a funcionalidade da biblioteca e são adaptados às necessidades da aplicação. Você pode reutilizá-lo em todo o aplicativo.

[Código de exemplo de formulário](../src/components/Form/Form.tsx)

[Código de exemplo de campo de entrada](../src/components/Form/InputField.tsx)

Você também pode integrar bibliotecas de validação com as soluções mencionadas para validar entradas no cliente. Algumas boas opções são:

- [zod](https://github.com/colinhacks/zod)
- [yup](https://github.com/jquense/yup)

[Código de exemplo de validação](../src/features/auth/components/RegisterForm.tsx)

## URL State

Estado que está sendo mantido na barra de endereço do navegador. Geralmente é rastreado por meio de parâmetros de url (`/ app / $ {dynamicParam}`) ou parâmetros de consulta (`/ app? DynamicParam = 1`). Ele pode ser acessado e controlado por meio de sua solução de roteamento, como `react-router-dom`.
