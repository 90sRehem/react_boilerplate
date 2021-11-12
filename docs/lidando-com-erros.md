# ⚠️ Lidando com erros

### Erros de API

Configure um interceptor para lidar com erros. Você pode usá-lo para disparar um toast de notificação para notificar os usuários de que algo deu errado, desconectar usuários não autorizados ou enviar novas solicitações de tokens de atualização.

[API Errors Notification Example Code](../src/lib/axios.ts)

### Erros no aplicativo

Use error boundaries para lidar com erros que acontecem na árvore React. É muito comum definir apenas um único error boundary para todo o aplicativo, o que interromperia todo o aplicativo quando ocorrer um erro. É por isso que você deve ter mais error boundaries em partes mais específicas do aplicativo. Dessa forma, se ocorrer um erro, o aplicativo ainda funcionará sem a necessidade de reiniciá-lo.

[Error Boundary Example Code](../src/providers/app.tsx)

### Rastreamento de Erro

Você deve rastrear quaisquer erros que ocorram na produção. Embora seja possível implementar sua própria solução, é uma ideia melhor usar ferramentas como [Sentry] (https://sentry.io/). Ele relatará qualquer problema que interrompa o aplicativo. Você também poderá ver em qual plataforma, navegador, etc. isso ocorreu. Certifique-se de carregar os mapas de origem para o sentry para ver onde em seu código-fonte o erro aconteceu.
