# Caminho da Fe

Prototipo inicial em React Native com Expo SDK 54 para o aplicativo mobile do catequizando.

## Recursos atuais

- Autenticacao real com Supabase Auth
- Cadastro de aluno na tabela `usuarios`
- Login com `supabase.auth.signInWithPassword`
- Sessao persistida com AsyncStorage
- Validacao de codigo da paroquia pela tabela `paroquias`
- Navegacao protegida por sessao e vinculo com paroquia
- Dados mockados mantidos para aulas, progresso, comunicados e alunos
- Estrutura preparada para video do YouTube com `react-native-youtube-iframe`

## Como instalar

```bash
npm install
```

As dependencias principais para Supabase no React Native sao:

```bash
npx expo install @react-native-async-storage/async-storage react-native-url-polyfill
npm install @supabase/supabase-js
```

## Como rodar

```bash
npx expo start
```

Para testar pelo celular:

1. Instale o Expo Go.
2. Deixe celular e computador na mesma rede Wi-Fi.
3. Escaneie o QR Code mostrado pelo Expo.

Para testar no emulador Android:

1. Abra o emulador pelo Android Studio.
2. Rode `npx expo start`.
3. Pressione `a` no terminal.

## Configurar Supabase

Edite o arquivo:

```text
src/services/supabase.js
```

Coloque a URL e a anon public key do seu projeto:

```js
const supabaseUrl = 'SUA_URL_DO_SUPABASE';
const supabaseAnonKey = 'SUA_ANON_PUBLIC_KEY';
```

Importante: nunca coloque `service_role key` no aplicativo. Use apenas a `anon public key`.

Se o cadastro criar o usuario no Auth, mas nao criar o perfil em `usuarios`, rode o SQL recomendado em:

```text
docs/supabase-auth-setup.md
```

## Tabelas esperadas

O app espera que estas tabelas existam no Supabase:

- `usuarios`
- `paroquias`
- `turmas`
- `aulas`
- `atividades`
- `comunicados`
- `pagamentos`
- `progresso`
- `respostas_atividades`

Para o fluxo atual, as tabelas mais importantes sao:

- `usuarios`: recebe `id`, `nome`, `email`, `tipo_usuario`, `paroquia_id`
- `paroquias`: precisa ter `id`, `nome`, `cidade`, `codigo_acesso`, `status`

## Regras de navegacao

- Usuario sem login ve apenas boas-vindas, login e cadastro.
- Usuario logado como aluno sem `paroquia_id` vai para `ParishCodeScreen`.
- Usuario logado como aluno com `paroquia_id` vai para `StudentDashboardScreen`.
- Este app mobile e focado no aluno/catequizando. O painel do catequista deve ficar em uma aplicacao web separada.

## Login temporario de desenvolvimento

Para apresentacao local, existe um acesso temporario de aluno que nao usa Supabase:

```text
usuario: admin
senha: admin
```

Esse login abre direto o painel do aluno com uma paroquia demo vinculada. Remova esse atalho antes de publicar o app.

## Onde editar

- Cores e estilo: `src/styles/theme.js`
- Navegacao: `src/navigation/AppNavigator.js`
- Supabase: `src/services/supabase.js`
- Contexto de autenticacao: `src/context/AuthContext.js`
- Dados mockados: `src/data/mockData.js`
- Telas: `src/screens`

## Video do YouTube nas aulas

O app usa a biblioteca:

```bash
npm install react-native-youtube-iframe
```

Ela usa WebView por baixo. No Expo, mantenha tambem:

```bash
npx expo install react-native-webview
```

O componente reutilizavel fica em:

```text
src/components/YoutubePlayerComponent.js
```

Para trocar o video de uma aula, edite apenas o ID no campo `video_youtube_id`.

Exemplo em `src/data/mockData.js` ou futuramente na tabela `aulas` do Supabase:

```js
video_youtube_id: '2PuFyjAs7JA'
```

Use somente o ID do YouTube, nao o link completo. Para este link:

```text
https://www.youtube.com/watch?v=2PuFyjAs7JA
```

O ID correto e:

```text
2PuFyjAs7JA
```

Se `video_youtube_id` estiver vazio, a aula mostra o placeholder "Video em breve".
