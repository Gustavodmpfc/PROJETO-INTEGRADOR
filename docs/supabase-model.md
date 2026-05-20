# Modelo sugerido para Supabase

Este arquivo documenta as tabelas planejadas para a integracao futura do Caminho da Fe.

## usuarios

| campo | tipo sugerido | observacao |
| --- | --- | --- |
| id | uuid | chave primaria, pode referenciar `auth.users.id` |
| nome | text | nome completo |
| email | text | e-mail do usuario |
| tipo_usuario | text | admin_geral, admin_pedagogico, catequista, aluno |
| paroquia_id | uuid | referencia `paroquias.id` |
| criado_em | timestamptz | data de criacao |

## paroquias

| campo | tipo sugerido |
| --- | --- |
| id | uuid |
| nome | text |
| cidade | text |
| codigo_acesso | text |
| status | text |

## turmas

| campo | tipo sugerido |
| --- | --- |
| id | uuid |
| nome | text |
| paroquia_id | uuid |
| catequista_id | uuid |
| ano | int |

## aulas

| campo | tipo sugerido |
| --- | --- |
| id | uuid |
| titulo | text |
| descricao | text |
| video_youtube_id | text |
| ordem | int |
| modulo | text |
| ativo | boolean |

## atividades

| campo | tipo sugerido |
| --- | --- |
| id | uuid |
| aula_id | uuid |
| pergunta | text |
| alternativa_a | text |
| alternativa_b | text |
| alternativa_c | text |
| alternativa_d | text |
| resposta_correta | text |

## respostas_atividades

| campo | tipo sugerido |
| --- | --- |
| id | uuid |
| usuario_id | uuid |
| atividade_id | uuid |
| resposta | text |
| acertou | boolean |
| criado_em | timestamptz |

## progresso

| campo | tipo sugerido |
| --- | --- |
| id | uuid |
| usuario_id | uuid |
| aula_id | uuid |
| concluida | boolean |
| percentual | numeric |
| atualizado_em | timestamptz |

## comunicados

| campo | tipo sugerido |
| --- | --- |
| id | uuid |
| paroquia_id | uuid |
| titulo | text |
| mensagem | text |
| criado_por | uuid |
| criado_em | timestamptz |

## pagamentos

| campo | tipo sugerido |
| --- | --- |
| id | uuid |
| usuario_id | uuid |
| status | text |
| valor | numeric |
| data_pagamento | timestamptz |
| data_expiracao | timestamptz |

## Observacoes para seguranca

- Ative Row Level Security em todas as tabelas.
- Alunos devem ler apenas seus proprios dados e comunicados da sua paroquia.
- Catequistas devem ler alunos, progresso e comunicados apenas da sua paroquia ou turma.
- Admin pedagogico pode gerenciar aulas-base e atividades.
- Admin geral pode gerenciar paroquias, usuarios e configuracoes da plataforma.
