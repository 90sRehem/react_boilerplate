# 🚄 Performance

### Code Splitting

Code splitting é uma técnica de dividir o JavaScript de produção em arquivos menores, permitindo que o aplicativo seja baixado apenas parcialmente. Qualquer código não utilizado não será baixado até que seja exigido pelo aplicativo.

Na maior parte do tempo, a divisão do código deve ser feita no nível das rotas, mas também pode ser usada para outras partes do aplicativo carregadas lentamente.

Não use code spliting em tudo, pois isso pode até piorar o desempenho de seu aplicativo.

[Código de exemplo de divisão de código](../src/routes/protected.tsx)

### Otimizações de componente e estado

- Não coloque tudo em um único estado. Isso pode disparar novas renderizações desnecessárias. Em vez disso, divida o estado global em vários armazenamentos de acordo com onde ele está sendo usado.

- Mantenha o estado o mais próximo possível de onde está sendo usado. Isso impedirá a renderização de componentes que não dependem do estado atualizado.

- Se você tiver uma parte do estado que é inicializada por um cálculo caro, use a função inicializadora de estado em vez de executá-la diretamente porque a função cara será executada apenas uma vez, como deveria. por exemplo:

```javascript
// em vez disso, que seria executado em cada nova renderização:
const [state, setState] = React.useState(myExpensiveFn());

// prefira este que é executado apenas uma vez:
const [state, setState] = React.useState(() => myExpensiveFn());
```

- Se você desenvolver um aplicativo que requer o estado para rastrear muitos elementos de uma vez, você pode considerar bibliotecas de gerenciamento de estado com atualizações atômicas, como [recoil](https://recoiljs.org/) ou [jotai](https://jotai.pmnd.rs/).

- Se espera-se que seu aplicativo tenha atualizações frequentes que podem afetar o desempenho, considere mudar de soluções de estilo de tempo de execução([Chakra UI](https://chakra-ui.com/), [emotion](https://emotion.sh/docs/introduction), [styled-components](https://styled-components.com/) que geram estilos durante o tempo de execução) para zero soluções de estilo de tempo de execução([tailwind](https://tailwindcss.com/), [linaria](https://github.com/callstack/linaria), [vanilla-extract](https://github.com/seek-oss/vanilla-extract), [CSS modules](https://github.com/css-modules/css-modules) que geram estilos durante o tempo de construção).

### Otimizações de imagem

Considere o carregamento lento de imagens que não estão na janela de visualização.

Use formatos de imagem modernos, como WEBP, para carregamento mais rápido de imagens.

Use `srcset` para carregar a imagem ideal para o tamanho da tela do cliente.

### Web vitals

Uma vez que o Google começou a considerar o web vitals ao indexar sites, você deve ficar de olho nas pontuações do web vitals do[Lighthouse](https://web.dev/measure/) e [Pagespeed Insights](https://developers.google.com/speed/pagespeed/insights/).
