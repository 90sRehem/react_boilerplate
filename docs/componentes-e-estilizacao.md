# 🧱 Componentes e estilização

## Práticas recomendadas para componentes

#### Coloque as coisas o mais próximo possível de onde estão sendo usadas

Mantenha componentes, funções, estilos, estado, etc. o mais próximo possível do componente onde está sendo usado. Isso não apenas tornará sua base de código mais legível e fácil de entender, mas também melhorará o desempenho do seu aplicativo, pois reduzirá a renderização redundante em atualizações de estado.

#### Evite grandes componentes com funções de renderização aninhadas

Não adicione várias funções de renderização dentro de seu aplicativo, isso sai do controle muito rapidamente. Em vez disso, o que você deve fazer é extraí-lo em um componente separado, se houver uma parte da UI que pode ser considerada uma unidade.

```javascript
// isso é muito difícil de manter assim que o componente começa a crescer
function Component() {
  function renderItems() {
    return <ul>...</ul>;
  }
  return <div>{renderItems()}</div>;
}

// extrai-o em um componente separado
function Items() {
  return <ul>...</ul>;
}

function Component() {
  return (
    <div>
      <Items />
    </div>
  );
}
```

#### Seja consistente

Mantenha o estilo do seu código consistente, por exemplo, se você nomear seus componentes usando maiúsculas e minúsculas, faça isso em qualquer lugar. Mais sobre isso pode ser encontrado [aqui] (./ style-guide.md)

#### Limitar o número de adereços que um componente aceita como entrada

Se o seu componente está aceitando muitas props, você pode considerar dividi-lo em vários componentes ou usar a técnica de composição por meio de filhos ou slots.

[Código de exemplo de composição](../src/components/Elements/ConfirmationDialog/ConfirmationDialog.tsx)

#### Resumo de componentes compartilhados em uma biblioteca de componentes

Para projetos maiores, é uma boa ideia construir abstrações em torno de todos os componentes compartilhados. Isso torna o aplicativo mais consistente e fácil de manter. Identifique as repetições antes de criar os componentes para evitar abstrações erradas.

[Código de exemplo de biblioteca de componentes](../src/components/Elements/Button/Button.tsx)

É uma boa ideia envolver os componentes de terceiros também para adaptá-los às necessidades do aplicativo. Pode ser mais fácil fazer as alterações subjacentes no futuro sem afetar a funcionalidade do aplicativo.

[Código de exemplo de componente de terceiros](../src/components/Elements/Link/Link.tsx)

## Bibliotecas de componentes

Cada projeto requer alguns componentes de IU, como modais, guias, barras laterais, menus, etc. Em vez de construí-los do zero, você pode querer usar algumas das bibliotecas de componentes existentes e testadas em batalha.

#### Bibliotecas de componentes com todos os recursos:

Essas bibliotecas de componentes vêm com seus componentes totalmente estilizados.

- [ChakraUI] (https://chakra-ui.com/) - ótima biblioteca com provavelmente a melhor experiência do desenvolvedor, permite uma prototipagem muito rápida com padrões de design decentes. Muitos componentes que são muito personalizáveis e flexíveis com acessibilidade já configurada fora da caixa.

- [MUI] (https://mui.com/) - a biblioteca de componentes mais popular do React. Tem muitos componentes diferentes. Pode ser mais adequado para a construção de painéis de administração, pois não seria fácil alterar os componentes para se parecerem com algo diferente do design de material.

#### Bibliotecas de componentes Headless:

Essas bibliotecas de componentes vêm com seus componentes sem estilo. Se você tiver um sistema de design específico para implementar, pode ser a solução mais fácil e melhor ir com componentes headless que vêm sem estilo do que adaptar uma biblioteca de componentes estilizados, como Material UI, às suas necessidades. Algumas boas opções são:

- [Reakit] (https://reakit.io/)
- [HeadlessUI] (https://headlessui.dev/)
- [RadixUI] (https://www.radix-ui.com/)
- [react-aria] (https://react-spectrum.adobe.com/react-aria/)

## Soluções de estilo

Existem várias maneiras de definir o estilo de um aplicativo React. Algumas boas opções são:

- [tailwind](https://tailwindcss.com/)
- [styled-components](https://styled-components.com/)
- [emotion](https://emotion.sh/docs/introduction)
- [stitches](https://stitches.dev/)
- [vanilla-extract](https://github.com/seek-oss/vanilla-extract)
- [CSS modules](https://github.com/css-modules/css-modules)
- [linaria](https://github.com/callstack/linaria)

## Boas combinações

Algumas boas combinações de biblioteca de componentes + estilo

- [Chakra UI](https://chakra-ui.com/) + [emotion](https://emotion.sh/docs/introduction) - A melhor escolha para a maioria dos aplicativos
- [Headless UI](https://headlessui.dev/) + [tailwind](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/) + [stitches](https://stitches.dev/)

## Storybook

[Storybook] (https://storybook.js.org/) é uma ótima ferramenta para desenvolver e testar componentes isoladamente. Pense nisso como um catálogo de todos os componentes que seu aplicativo está usando. Muito útil para o desenvolvimento e descoberta de componentes.
