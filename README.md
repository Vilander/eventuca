# Eventuca

Aplicativo mobile para descobrir, cadastrar e salvar eventos de tecnologia e comunidades. O projeto foi desenvolvido com Expo, React Native e TypeScript, com dados persistidos em um banco Turso (SQLite/libSQL) e sessão mantida localmente no dispositivo.

## Funcionalidades

- Listagem de eventos em destaque e recomendações.
- Busca por título ou descrição.
- Filtro por mês nos próximos 12 meses.
- Filtro por categoria.
- Visualização dos detalhes de um evento.
- Cadastro de eventos com descrição, data, categorias, modalidade, certificado, preço, links e imagem da galeria.
- Autenticação por nome ou e-mail e senha.
- Salvamento e remoção de eventos favoritos.
- Perfil com dados do usuário e métricas de eventos criados e salvos.
- Navegação inferior entre Início, Add Evento, Salvos e Perfil.

## Tecnologias

- Expo SDK 54 e React Native 0.81.
- React 19 e TypeScript 5.9.
- Expo Router para navegação baseada em arquivos.
- Turso/libSQL para usuários, eventos e favoritos.
- AsyncStorage para manter o ID da sessão no dispositivo.
- Expo Image Picker para selecionar banners.
- React Native DateTimePicker para selecionar datas.
- Expo Vector Icons para os ícones da interface.

## Pré-requisitos

Antes de começar, instale:

- Node.js LTS e npm.
- Git.
- Expo Go em um dispositivo físico ou emulador Android/iOS, ou um ambiente nativo configurado para executar builds locais.
- Para Android local: Android Studio, SDK Android e um emulador ou dispositivo com depuração USB.
- Para iOS local: macOS com Xcode. O comando `npm run ios` não pode ser executado nativamente no Windows.

## Como clonar

```bash
git clone https://github.com/Vilander/eventuca.git
cd eventuca
```

Instale as dependências do projeto:

```bash
npm install
```

## Configuração do Turso

O aplicativo usa as variáveis públicas do Expo para conectar ao banco remoto. Crie um arquivo `.env` na raiz do projeto, sem versioná-lo:

```env
EXPO_PUBLIC_TURSO_URL=LINK_DO_BANCO_NO_TURSO
EXPO_PUBLIC_TURSO_TOKEN=TOKEN_GERADO_NO_TURSO
```

O arquivo [`env-modelo.txt`](env-modelo.txt) contém um exemplo dessas variáveis. Arquivos `.env` são ignorados pelo Git.

### Criar as tabelas

Antes do primeiro uso, crie as tabelas no banco Turso executando o SQL abaixo no SQL Console do banco:

```sql
CREATE TABLE IF NOT EXISTS usuarios (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	nome TEXT NOT NULL,
	email TEXT UNIQUE NOT NULL,
	endereco TEXT,
	numero TEXT,
	complemento TEXT,
	estado TEXT,
	cidade TEXT,
	senha TEXT NOT NULL,
	receberNotificacoes INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS eventos (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	titulo TEXT NOT NULL,
	descricao TEXT,
	data TEXT NOT NULL,
	categorias TEXT NOT NULL,
	presencial INTEGER DEFAULT 0,
	online INTEGER DEFAULT 0,
	certificado INTEGER DEFAULT 0,
	gratuito INTEGER DEFAULT 0,
	preco TEXT,
	linkOficial TEXT,
	facebook TEXT,
	instagram TEXT,
	linkedin TEXT,
	imagemUri TEXT,
	usuario_id INTEGER,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS favoritos (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	usuario_id INTEGER NOT NULL,
	evento_id INTEGER NOT NULL,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
	FOREIGN KEY (evento_id) REFERENCES eventos(id)
);

CREATE TABLE IF NOT EXISTS sessao (
	id INTEGER PRIMARY KEY CHECK (id = 1),
	usuario_id INTEGER,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
```

O esquema também está definido em [`src/database/iniciarBancoDados.ts`](src/database/iniciarBancoDados.ts). A função de inicialização existe, mas não é chamada automaticamente durante a abertura do aplicativo; por isso, o procedimento acima é necessário para preparar um banco novo.

## Como executar

Inicie o servidor de desenvolvimento:

```bash
npx expo start
```

No menu do Expo, escolha o destino desejado. Também existem os comandos diretos:

```bash
npm run android  # build e execução Android local
npm run ios      # build e execução iOS local; requer macOS e Xcode
npm run web      # execução no navegador
```

Para usar um dispositivo físico, ele e o computador precisam estar acessíveis pela mesma rede quando o projeto for executado via QR Code. A execução com `npm run android` exige o ambiente Android nativo configurado.

## Estrutura do projeto

```text
eventuca/
├── assets/                    # Ícones, splash screen e imagens do aplicativo
├── src/
│   ├── app/                   # Rotas e telas do Expo Router
│   │   ├── index.tsx          # Tela inicial, busca e filtros
│   │   ├── adicionar-evento.tsx
│   │   ├── salvos.tsx         # Eventos favoritos
│   │   ├── perfil.tsx         # Perfil, login, cadastro e logout
│   │   ├── login.tsx          # Tela de login disponível como rota
│   │   └── evento/[id].tsx    # Detalhes de um evento
│   ├── components/            # Componentes reutilizáveis da interface
│   │   ├── Header/
│   │   ├── Botao/
│   │   ├── BannerPadrao/
│   │   ├── CartaoEvento/
│   │   ├── CartaoEventoPrincipal/
│   │   ├── CartaoRecomendado/
│   │   ├── EtiquetaCategoria/
│   │   └── FiltroMeses/
│   ├── constants/              # Categorias disponíveis
│   ├── database/               # Cliente Turso, sessão e operações CRUD
│   └── styles/                 # Cores e estilos compartilhados
├── app.json                   # Configuração do Expo
├── eas.json                   # Perfis de build e distribuição EAS
├── package.json               # Dependências e scripts
├── tsconfig.json              # TypeScript e alias `@/*`
└── env-modelo.txt             # Modelo das variáveis de ambiente
```

### Organização das responsabilidades

- [`src/app/_layout.tsx`](src/app/_layout.tsx) define a navegação por abas e oculta as rotas de login e detalhes da barra inferior.
- [`src/database/useEventoDatabase.ts`](src/database/useEventoDatabase.ts) concentra as operações de eventos, usuários, autenticação e favoritos.
- [`src/database/tursoCliente.ts`](src/database/tursoCliente.ts) cria o cliente HTTP do Turso a partir das variáveis de ambiente.
- [`src/database/sessaoStorage.ts`](src/database/sessaoStorage.ts) salva apenas o ID do usuário autenticado no `AsyncStorage`.
- [`src/constants/categorias.ts`](src/constants/categorias.ts) centraliza as categorias usadas nos formulários e filtros.
- Os arquivos de estilo ficam separados por responsabilidade em `src/styles` e dentro de cada componente.

## Fluxo de dados

1. A tela inicial consulta os eventos no Turso e aplica busca, mês e categoria localmente.
2. O cadastro envia o evento para a tabela `eventos`; imagens escolhidas na galeria são armazenadas como strings Base64 no campo `imagemUri`.
3. O login consulta `usuarios` e salva o ID retornado no `AsyncStorage`.
4. Favoritos são relacionados ao usuário pela tabela `favoritos`.
5. Ao sair, o ID local da sessão é removido.

## Builds com EAS

Os perfis de build estão em [`eas.json`](eas.json):

```bash
npx eas build --profile development
npx eas build --profile preview
npx eas build --profile production
```

O perfil `preview` gera um APK Android para distribuição interna. O perfil `production` usa incremento automático de versão. Para executar builds EAS, é necessário estar autenticado no EAS CLI.

## Estado atual e cuidados

- Não existem scripts de testes, lint ou typecheck no `package.json` neste momento.
- As senhas são comparadas e armazenadas diretamente no banco. Esse mecanismo deve ser substituído por hash de senha antes de um uso em produção.
- As variáveis `EXPO_PUBLIC_*` podem ser incorporadas ao bundle do aplicativo. O token Turso não deve ser considerado um segredo absoluto em um cliente mobile; para produção, avalie intermediar o acesso por uma API segura.
- O arquivo `src/database/dadosEventos.ts` contém dados estáticos de exemplo e não é usado pelas telas atuais.
- A pasta `android/` pode ser gerada pelo Expo e está ignorada pelo Git neste projeto; a execução nativa pode recriá-la quando necessário.

