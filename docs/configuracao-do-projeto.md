# ⚙️ Configuração do projeto

O aplicativo foi inicializado usando `Create React App` por razões de simplicidade. Ele nos permite criar aplicativos rapidamente sem lidar com uma configuração de ferramentas complexa, como agrupamento, transpilação, etc.

Você deve sempre configurar e usar as seguintes ferramentas:

#### ESLint

ESLint é uma ferramenta linting para JavaScript. Ao fornecer uma configuração específica definida no arquivo`.eslintrc.js`, evita que os desenvolvedores cometam erros bobos em seu código e reforça a consistência na base de código.

[ESLint Configuration Example Code](../.eslintrc.js)

#### Prettier

Esta é uma ótima ferramenta para formatar código. Ele impõe um estilo de código consistente em toda a sua base de código. Ao utilizar o recurso "formatar ao salvar" em seu IDE, você pode formatar automaticamente o código com base na configuração fornecida no arquivo `.prettierrc`. Ele também fornecerá um bom feedback quando algo estiver errado com o código. Se a formatação automática não funcionar, algo está errado com o código.

[Prettier Configuration Example Code](../.prettierrc)

#### TypeScript

ESLint é ótimo para detectar alguns dos bugs relacionados à linguagem, mas como o JavaScript é uma linguagem dinâmica, o ESLint não pode verificar os dados que são executados nos aplicativos, o que pode levar a bugs, especialmente em projetos maiores. É por isso que o TypeScript deve ser usado. É muito útil durante grandes refatores porque relata quaisquer problemas que você possa perder de outra forma. Ao refatorar, altere a declaração de tipo primeiro e, a seguir, corrija todos os erros do TypeScript em todo o projeto e pronto. Uma coisa que você deve ter em mente é que o TypeScript não protege seu aplicativo contra falhas durante o tempo de execução, ele apenas faz a verificação de tipo durante o tempo de compilação, mas aumenta drasticamente a confiança no desenvolvimento de qualquer maneira. Aqui está um [ótimo recurso sobre como usar o TypeScript com React](https://react-typescript-cheatsheet.netlify.app/).

<!-- #### Husky

Husky é uma ferramenta para executar ganchos git. Use o Husky para executar suas validações de código antes de cada commit, garantindo assim que o código esteja na melhor forma possível em qualquer ponto do tempo e nenhum commit com defeito entre no repo. Ele pode executar linting, formatação de código e verificação de tipo, etc. antes de permitir o envio do código. Você pode verificar como configurá-lo [aqui](https://typicode.github.io/husky/#/?id=usage). -->

#### Absolute imports

As importações absolutas devem sempre ser configuradas e usadas porque torna mais fácil mover arquivos e evitar caminhos de importação confusos, como `../../../ Component`. Para onde quer que você mova o arquivo, todas as importações permanecerão intactas. Aqui está como configurá-lo:

Para projetos JavaScript:

```
// jsconfig.json
"compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
```

Para projetos TypeScript:

```
// tsconfig.json
"compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
```

[Código de exemplo](../tsconfig.paths.json)

Neste projeto, temos que criar outro arquivo tsconfig `tsconfig.paths.json` onde configuramos os caminhos e o fundimos com a configuração base, porque o CRA irá sobrescrevê-lo de outra forma.

Também é possível definir vários caminhos para várias pastas (como `@ components`,` @ hooks`, etc.), mas usar `@ / *` funciona muito bem porque é curto o suficiente para que não haja necessidade de configurar caminhos múltiplos e difere de outros módulos de dependência, então não há confusão no que vem de `node_modules` e qual é a nossa pasta de origem. Isso significa que qualquer coisa na pasta `src` pode ser acessada via`@`, por exemplo, algum arquivo que reside em` src / components / MyComponent` pode ser acessado usando `@ / components / MyComponents`.
