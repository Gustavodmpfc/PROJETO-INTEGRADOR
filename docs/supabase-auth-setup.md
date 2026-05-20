# Configuracao recomendada para cadastro no Supabase

No app, o usuario e criado com Supabase Auth. Para garantir que a tabela `usuarios` seja preenchida mesmo quando a confirmacao de e-mail estiver ligada, use um trigger no Supabase.

Abra **SQL Editor** no Supabase e rode:

```sql
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.usuarios (id, nome, email, tipo_usuario)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'nome', 'Novo usuario'),
    new.email,
    coalesce(new.raw_user_meta_data->>'tipo_usuario', 'aluno')
  )
  on conflict (id) do update
  set
    nome = excluded.nome,
    email = excluded.email,
    tipo_usuario = excluded.tipo_usuario;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
```

## RLS minima para desenvolvimento

Se Row Level Security estiver ativa em `usuarios`, crie politicas para o usuario ler e editar apenas o proprio perfil:

```sql
alter table public.usuarios enable row level security;

drop policy if exists "usuarios_select_proprio" on public.usuarios;
create policy "usuarios_select_proprio"
on public.usuarios
for select
using (auth.uid() = id);

drop policy if exists "usuarios_update_proprio" on public.usuarios;
create policy "usuarios_update_proprio"
on public.usuarios
for update
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "usuarios_insert_proprio" on public.usuarios;
create policy "usuarios_insert_proprio"
on public.usuarios
for insert
with check (auth.uid() = id);
```

Para validar codigo da paroquia, o app precisa ler a tabela `paroquias`:

```sql
alter table public.paroquias enable row level security;

drop policy if exists "paroquias_select_autenticado" on public.paroquias;
create policy "paroquias_select_autenticado"
on public.paroquias
for select
to authenticated
using (status = 'ativa');
```
