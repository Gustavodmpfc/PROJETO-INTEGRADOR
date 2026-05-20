export function getFriendlyAuthError(error) {
  const message = String(error?.message || error || '').toLowerCase();

  if (!message) return 'Nao foi possivel concluir a acao. Tente novamente.';
  if (message.includes('invalid login') || message.includes('invalid credentials')) {
    return 'E-mail ou senha incorretos.';
  }
  if (message.includes('email') && message.includes('invalid')) {
    return 'Informe um e-mail valido.';
  }
  if (message.includes('password') || message.includes('senha')) {
    return 'A senha precisa ter pelo menos 6 caracteres.';
  }
  if (message.includes('user already registered')) {
    return 'Este e-mail ja esta cadastrado. Tente fazer login.';
  }
  if (message.includes('already') || message.includes('duplicate') || message.includes('unique')) {
    return 'Este e-mail ja esta cadastrado.';
  }
  if (message.includes('failed to fetch') || message.includes('network')) {
    return 'Falha de conexao. Verifique sua internet e tente novamente.';
  }
  if (message.includes('row-level security') || message.includes('permission')) {
    return 'Cadastro criado no Auth, mas o perfil foi bloqueado pelas politicas RLS da tabela usuarios.';
  }

  return error?.message || 'Algo deu errado. Verifique os dados e tente novamente.';
}
