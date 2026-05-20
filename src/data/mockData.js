export const currentUser = {
  id: 'user-1',
  nome: 'Ana Clara Santos',
  email: 'ana@email.com',
  tipo_usuario: 'aluno',
  paroquia: 'Paroquia Sao Jose',
  turma: 'Catequese 2026 - Crisma',
  acesso: 'ativo',
};

export const parish = {
  id: 'paroquia-1',
  nome: 'Paroquia Sao Jose',
  cidade: 'Sao Paulo',
  codigo_acesso: 'FE2026',
  status: 'ativa',
};

export const lessons = [
  {
    id: 'aula-1',
    titulo: 'O chamado de Deus',
    descricao: 'Entenda como Deus chama cada pessoa para caminhar com Ele.',
    video_youtube_id: '2PuFyjAs7JA',
    ordem: 1,
    modulo: 'Introducao a fe',
    ativo: true,
    percentual: 100,
    concluida: true,
    duracao: '12 min',
  },
  {
    id: 'aula-2',
    titulo: 'Jesus, nosso mestre',
    descricao: 'Uma aula sobre a vida de Jesus e seus ensinamentos centrais.',
    video_youtube_id: '',
    ordem: 2,
    modulo: 'Jesus Cristo',
    ativo: true,
    percentual: 65,
    concluida: false,
    duracao: '18 min',
  },
  {
    id: 'aula-3',
    titulo: 'A comunidade cristã',
    descricao: 'Como viver a fe na familia, na paroquia e na sociedade.',
    video_youtube_id: '',
    ordem: 3,
    modulo: 'Igreja e comunidade',
    ativo: true,
    percentual: 20,
    concluida: false,
    duracao: '15 min',
  },
];

export const activities = [
  {
    id: 'atividade-1',
    aula_id: 'aula-1',
    pergunta: 'O que significa responder ao chamado de Deus?',
    alternativas: [
      'Ignorar a vida em comunidade',
      'Caminhar com fe, amor e responsabilidade',
      'Estudar apenas quando houver prova',
      'Fazer tudo sozinho',
    ],
    resposta_correta: 1,
  },
  {
    id: 'atividade-2',
    aula_id: 'aula-2',
    pergunta: 'Qual atitude aparece com frequencia nos ensinamentos de Jesus?',
    alternativas: ['Indiferenca', 'Competicao', 'Misericordia', 'Orgulho'],
    resposta_correta: 2,
  },
];

export const students = [
  { id: 's1', nome: 'Ana Clara Santos', progresso: 72, ultimoAcesso: 'Hoje', status: 'ativo' },
  { id: 's2', nome: 'Pedro Henrique', progresso: 48, ultimoAcesso: 'Ontem', status: 'ativo' },
  { id: 's3', nome: 'Mariana Costa', progresso: 91, ultimoAcesso: 'Hoje', status: 'ativo' },
  { id: 's4', nome: 'Lucas Martins', progresso: 18, ultimoAcesso: '7 dias', status: 'pendente' },
];

export const announcements = [
  {
    id: 'c1',
    titulo: 'Encontro presencial',
    mensagem: 'Nosso proximo encontro sera sabado, as 15h, no salao paroquial.',
    data: '18/05/2026',
  },
  {
    id: 'c2',
    titulo: 'Material da semana',
    mensagem: 'Leia o resumo da aula 2 antes de responder o quiz.',
    data: '16/05/2026',
  },
];
