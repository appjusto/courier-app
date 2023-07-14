export const DefaultErrorMessage =
  'Não foi possível acessar o servidor. Por favor, tente novamente.';

export const getFirebaseAuthErrorMessage = (error: object) => {
  if (!error || typeof error !== 'object') {
    return DefaultErrorMessage;
  }
  if ('code' in error && typeof error.code === 'string') {
    const code = error.code;
    if (code === 'auth/account-exists-with-different-credential')
      return 'Esse número de telefone já está associado à outra conta. Por favor, entre em contato com o suporte';
    else if (code === 'auth/invalid-credential')
      return 'Credencial expirada ou inválida. Faça login novamente e tente outra vez.';
    else if (code === 'auth/operation-not-allowed')
      return 'Operação não permitida para o seu usuário';
    else if (code === 'auth/user-disabled') return 'Este usuário foi desabilitado.';
    else if (code === 'auth/user-not-found') return 'Usuário não encontrado';
    else if (code === 'auth/wrong-password') return 'Senha incorreta. Tente novamente.';
    else if (code === 'auth/too-many-requests')
      return 'O acesso a esta conta, via senha, foi temporariamente desativado devido a muitas tentativas de login. Por favor, entre em contato com o suporte.';
    else if (code === 'auth/invalid-verification-code')
      return 'O código não é valido. Verifique o código e tente de novo.';
    else if (code === 'auth/invalid-verification-id')
      return 'Id de verificação incorreto. Operação não processada';
    else if (code === 'auth/provider-already-linked')
      return 'Esse número já está associado à uma outra conta. Edite seu perfil e tente novamente.';
    else if (code === 'auth/code-expired')
      return 'O código expirou. Clique em "Enviar novamente" e tente de novo.';
    else if (code === 'permission-denied') return 'Permissão negada';
    else if (code === 'deadline-exceeded') return 'Tempo de execução excedido';
  } else if ('message' in error && typeof error.message === 'string') {
    return error.message;
  }
  return DefaultErrorMessage;
};
